(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  var console = window.console || { log: function () {} };

  function CropAvatar($element,config_cust) {
    this.$container = $element;

    this.$avatarView = this.$container.find('.avatar-view');
    this.$avatar = this.$avatarView.find('img');
  
    this.$avatarModal = this.$container.find('#avatar-modal');
    this.$loading = this.$container.find('.loading');

    this.$avatarForm = this.$avatarModal.find('.avatar-form');
    this.$avatarUpload = this.$avatarForm.find('.avatar-upload');
    this.$avatarSrc = this.$avatarForm.find('.avatar-src');
    this.$avatarData = this.$avatarForm.find('.avatar-Data');
    this.$avatarInput = this.$avatarForm.find('.avatar-input');
    //this.$avatarSave = this.$avatarForm.find('.avatar-save button:submit');
    this.$avatarSave = this.$avatarForm.find(':submit');
    this.$avatarBtns = this.$avatarForm.find('.avatar-btns');

    this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');
    this.$avatarPreview = this.$avatarModal.find('.avatar-preview');

    this.preview_rate = (typeof(config_cust)=='undefined' || typeof(config_cust.preview_rate)=='undefined') ? 1 : config_cust.preview_rate;
    this.back_image = (typeof(config_cust)=='undefined' || typeof(config_cust.back_image)=='undefined') ? false : config_cust.back_image;
    this.change_image = (typeof(config_cust)=='undefined' || typeof(config_cust.change_image)=='undefined') ? false : config_cust.change_image;
    this.oldimage=null;
    this.init();
  }

  CropAvatar.prototype = {
    constructor: CropAvatar,

    support: {
      fileList: !!$('<input type="file">').prop('files'),
      blobURLs: !!window.URL && URL.createObjectURL,
      formData: !!window.FormData
    },

    init: function () {
      this.support.datauri = this.support.fileList && this.support.blobURLs;

      if (!this.support.formData) {
        this.initIframe();
      }

      this.initTooltip();
      this.initModal();
      this.addListener();
    },
    /*按钮点击监听*/
    addListener: function () {
      this.$avatarView.on('click', $.proxy(this.click, this));
      this.$avatarInput.on('change', $.proxy(this.change, this));
    /*当input的值change得时候出发*/
      this.$avatarForm.on('submit', $.proxy(this.submit, this));
      this.$avatarBtns.on('click', $.proxy(this.rotate, this));
    },

    initTooltip: function () {
      this.$avatarView.tooltip({
        placement: 'bottom'
      });
    },
   //set modal show false   show: false
    initModal: function () {
      this.$avatarModal.modal({
        show:false
      });
    },
    //get imag url and set add avatarPreview  html 
  //bi active
    initPreview: function () {
      var url = this.$avatar.attr('src');
      this.$avatarPreview.empty().html('<img src="' + url + '">');
    },
    
  //do not known this far what?
    initIframe: function () {
      var target = 'upload-iframe-' + (new Date()).getTime(),
          $iframe = $('<iframe>').attr({
            name: target,
            src: ''
          }),
          _this = this;
     

      // Ready ifrmae
      $iframe.one('load', function () {

        // respond response
        $iframe.on('load', function () {
          var data;

          try {
            data = $(this).contents().find('body').text();
          } catch (e) {
            console.log(e.message);
          }

          if (data) {
            try {
              data = $.parseJSON(data);
            } catch (e) {
              console.log(e.message);
            }

            _this.submitDone(data);
          } else {
            _this.submitFail('Image upload failed!');
          }

          _this.submitEnd();

        });
      });

      this.$iframe = $iframe;
      this.$avatarForm.attr('target', target).after($iframe.hide());
    },
    //on click modal show no work
    click: function () {
      this.$avatarModal.modal('show');
      this.initPreview();
      var files = this.$avatarInput.prop('files');
      var  file = files[0];
      if (files.length > 0&&file.size<2097152) {
        this.$avatarSave.attr("disabled", false);
        this.$avatarPreview.empty().html('<img src="' + this.url + '">');
      }
      else
      {
        this.$avatarSave.attr("disabled", true);
      }
      //this.stopCropper();

    },
    //当input的值改变 no work
    change: function () {
      var files,
          file;
      if (this.support.datauri) {
        files = this.$avatarInput.prop('files');
        if (files.length > 0) {
          file = files[0];
          if (this.isImageFile(file)) {
            if (this.url) {
              URL.revokeObjectURL(this.url); // Revoke the old one
            }
            this.url = URL.createObjectURL(file);
            if(file.size>2097152)
            {
              alert("您上传的图片大小超过2M，请重新选择图片!");
              //this.$avatarSave.removeAttr("disabled");
              this.$avatarSave.attr("disabled", true);
              this.stopCropper();
              //this.initPreview();
            }
            else
            {
              this.oldimage=this.url;
              this.$avatarSave.removeAttr("disabled");
              this.startCropper();
            }
          }
      else{
         alert("请选择jpg/png等常用图片文件！");
      }
        }
      } else {
        file = this.$avatarInput.val();

        if (this.isImageFile(file)) {
          this.syncUpload();
        }
      }
    },

    submit: function () {
      if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
        return false;
      }

      if (this.support.formData) {
        this.ajaxUpload();
        return false;
      }
    },

    rotate: function (e) {
      var data;

      if (this.active) {
        data = $(e.target).data();

        if (data.method) {
          this.$img.cropper(data.method, data.option);
        }
      }
    },

    isImageFile: function (file) {
      if (file.type) {
        return /^image\/\w+$/.test(file.type);
      } else {
        return /\.(jpg|jpeg|png|gif)$/.test(file);
      }
    },

    startCropper: function () {
      var _this = this;
      if (this.active) {
        this.$img.cropper('replace', this.url);
      } else {
        this.$img = $('<img src="' + this.url + '">');
        this.$avatarWrapper.empty().html(this.$img);
        this.$img.cropper({
          aspectRatio: _this.preview_rate,
          preview: this.$avatarPreview.selector,
          strict: false,
          crop: function (data) {
            var json = [
                  '{"x":' + data.x,
                  '"y":' + data.y,
                  '"height":' + data.height,
                  '"width":' + data.width,
                  '"rotate":' + data.rotate + '}'
                ].join();

            _this.$avatarData.val(json);
          }
        });

        this.active = true;
      }
    },

    stopCropper: function () {
      if (this.active) {
        this.$avatarModal.val('');
        this.$img.cropper('destroy');
        this.$img.remove();
        this.active = false;
      }
    },

    ajaxUpload: function () {
      var url = this.$avatarForm.attr('action'),
          data = new FormData(this.$avatarForm[0]),
          _this = this;
      $.ajax(url, {
        type: 'post',
        data: data,
        dataType: 'json',
        processData: false,
        contentType: false,

        beforeSend: function () {
          _this.submitStart();
        },

        success: function (data) {
          _this.submitDone(data);
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
          _this.submitFail(textStatus || errorThrown);
        },

        complete: function () {
          _this.submitEnd();
        }
      });
    },

    syncUpload: function () {
      this.$avatarSave.click();
    },

    submitStart: function () {
      this.$loading.fadeIn();
    },

    submitDone: function (data) {
      $(".club_setting_logo").val(data.result);
    if ( this.$avatarView.find('.view_entity_submit').length > 0 ) this.$avatarView.find('.view_entity_submit').click();
      if ($.isPlainObject(data) && data.state === 200) {
        if (data.result) {
          this.url = data.result;

          if (this.support.datauri || this.uploaded) {
            this.uploaded = false;
            this.cropDone();
          } else {
            this.uploaded = true;
            this.$avatarSrc.val(this.url);
            this.startCropper();
          }

          this.$avatarInput.val('');
        } else if (data.message) {
          this.alert(data.message);
        }
      } else {
        this.alert('Failed to response');
      }
    },

    submitFail: function (msg) {
      this.alert(msg);
    },

    submitEnd: function () {
      this.$loading.fadeOut();
    },

    cropDone: function () {
      this.$avatarForm.get(0).reset();
      if(this.back_image==false)
      {
         this.$avatar.attr('src', this.url);
         //this.$avatarPreview.attr('src', this.url);
        this.$avatarPreview.empty().html('<img src="' + this.url + '">');
      }
      else
      {
       this.$avatar.attr('src', this.url);
       var show_imae = this.$container.find(this.back_image);
       show_imae.attr('style','background-image:url('+ this.url +')');
       show_imae.find('input').attr('value', this.url);
      }
      if(this.change_image!=false)
      {
        $(this.change_image).attr('src',this.url);
      }
      this.stopCropper();
      this.$avatarModal.modal('hide');
      this.$avatarSave.attr("disabled", true);
    },

    alert: function (msg) {
      /*var $alert = [
            '<div class="alert alert-danger avater-alert">',
              '<button type="button" class="close" Data-dismiss="alert">&times;</button>',
              msg,
            '</div>'
          ].join('');

      this.$avatarUpload.after($alert);*/
      alert(msg);
    }
  };

  $(function () {
    return new CropAvatar($('#crop-news'),{'preview_rate':5/2});
  });

});
