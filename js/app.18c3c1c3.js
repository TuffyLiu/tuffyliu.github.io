(function(t){function e(e){for(var i,r,c=e[0],o=e[1],l=e[2],p=0,d=[];p<c.length;p++)r=c[p],n[r]&&d.push(n[r][0]),n[r]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i]);u&&u(e);while(d.length)d.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],i=!0,c=1;c<a.length;c++){var o=a[c];0!==n[o]&&(i=!1)}i&&(s.splice(e--,1),t=r(r.s=a[0]))}return t}var i={},n={app:0},s=[];function r(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=i,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(a,i,function(e){return t[e]}.bind(null,i));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=o;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"11ba":function(t,e,a){},1560:function(t,e,a){},"16b9":function(t,e,a){"use strict";var i=a("638e"),n=a.n(i);n.a},"190c":function(t,e,a){t.exports=a.p+"img/stock-photo-134067119.dc3fe510.jpg"},"1e90":function(t,e,a){},"25c9":function(t,e,a){},"2c73":function(t,e,a){"use strict";var i=a("40da"),n=a.n(i);n.a},"40da":function(t,e,a){},"4cb1":function(t,e,a){"use strict";var i=a("ee99"),n=a.n(i);n.a},"4d97":function(t,e,a){},"5c0b":function(t,e,a){"use strict";var i=a("5e27"),n=a.n(i);n.a},"5e27":function(t,e,a){},"638e":function(t,e,a){},"64d9":function(t,e,a){"use strict";var i=a("1e90"),n=a.n(i);n.a},"65d8":function(t,e,a){"use strict";var i=a("1560"),n=a.n(i);n.a},"6d8d":function(t,e,a){},"6e0e":function(t,e,a){},"77d5":function(t,e,a){"use strict";var i=a("efad"),n=a.n(i);n.a},"79ab":function(t,e,a){},"79fa":function(t,e,a){"use strict";var i=a("25c9"),n=a.n(i);n.a},"806a":function(t,e,a){},"9fa4":function(t,e,a){"use strict";var i=a("6e0e"),n=a.n(i);n.a},a7a0:function(t,e,a){},ada9:function(t,e,a){"use strict";var i=a("a7a0"),n=a.n(i);n.a},af1c:function(t,e,a){"use strict";var i=a("806a"),n=a.n(i);n.a},ba04:function(t,e,a){"use strict";var i=a("e1a6"),n=a.n(i);n.a},cd49:function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var i=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("my-header"),a("main",{staticClass:"main"},[a("keep-alive",{attrs:{exclude:"BlogDetail"}},[a("router-view",{key:t.$route.path})],1)],1),a("my-footer")],1)},s=[],r=a("d225"),c=a("308d"),o=a("6bb5"),l=a("4e2b"),u=a("9ab4"),p=a("60a3"),d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("header",{staticClass:"header"},[i("router-link",{attrs:{to:{name:"Home"}}},[i("img",{staticClass:"logo",attrs:{alt:"tuffy logo",src:a("cf05")}})]),i("div",{staticClass:"nav"},[i("ul",{staticClass:"menu",class:[t.menuOpen?"oppen":"close"]},[i("router-link",{attrs:{tag:"li",to:{name:"Home"}}},[t._v("Home")]),i("router-link",{attrs:{tag:"li",to:{name:"Blog"}}},[t._v("Blog")]),i("router-link",{attrs:{tag:"li",to:{name:"Photo"}}},[t._v("Photo")]),i("router-link",{attrs:{tag:"li",to:{name:"Cook"}}},[t._v("Cook")]),i("router-link",{attrs:{tag:"li",to:{name:"About"}}},[t._v("About")])],1),i("button",{staticClass:"btn-menu",attrs:{type:"button",name:"button"},on:{click:t.clickMenu}},[i("span",{staticClass:"btn-svg"},[t.menuOpen?i("svg",{staticClass:"svg-menu",attrs:{viewBox:"0 0 18 17"}},[i("path",{attrs:{d:"M5.968 8.271L1.03 3.333c-.716-.716-.663-1.93.118-2.71.78-.782 1.994-.835 2.71-.119L9.044 5.69 14.663.976c.775-.65 1.98-.493 2.69.354.71.846.656 2.06-.12 2.71l-5.35 4.49 4.94 4.938c.715.716.662 1.93-.119 2.71-.78.782-1.994.834-2.71.118L8.808 11.11 3.19 15.825c-.776.65-1.98.492-2.69-.354s-.657-2.06.118-2.71l5.35-4.49z",fill:"#FFF"}})]):i("svg",{staticClass:"svg-menu",attrs:{viewBox:"0 0 20 17"}},[i("path",{attrs:{d:"M18.15 6.3c.911 0 1.65.806 1.65 1.8s-.739 1.8-1.65 1.8H1.65C.739 9.9 0 9.094 0 8.1s.739-1.8 1.65-1.8h16.5zM1.65 3.6C.739 3.6 0 2.794 0 1.8S.739 0 1.65 0h16.5c.911 0 1.65.806 1.65 1.8s-.739 1.8-1.65 1.8H1.65zm16.5 9c.911 0 1.65.806 1.65 1.8s-.739 1.8-1.65 1.8H1.65C.739 16.2 0 15.394 0 14.4s.739-1.8 1.65-1.8h16.5z",fill:"#FFF"}})])])])])],1)},f=[],b=a("b0b4"),h=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments)),t.menuOpen=!1,t}return Object(l["a"])(e,t),Object(b["a"])(e,[{key:"clickMenu",value:function(){this.menuOpen=!this.menuOpen}}]),e}(p["c"]);h=u["a"]([Object(p["a"])({filters:{},components:{}})],h);var v=h,g=v,m=(a("ba04"),a("2877")),k=Object(m["a"])(g,d,f,!1,null,"3594cc64",null),y=k.exports,O=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("footer",{staticClass:"footer"},[i("div",{staticClass:"footer-links"},[i("ul",{staticClass:"links"},[t._m(0),t._m(1),t._m(2),t._m(3),i("li",[i("router-link",{attrs:{tag:"a",to:{name:"About"}}},[t._v("Contact Me")])],1)]),i("router-link",{attrs:{to:{name:"Home"}}},[i("img",{staticClass:"logo",attrs:{alt:"tuffy logo",src:a("cf05")}})])],1),i("p",{staticClass:"copy-right"},[t._v("COPYRIGHT © 2019–2029 TUFFY-阿胐")])])},_=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("a",{attrs:{href:"https://github.com/TuffyLiu",target:"_blank",rel:"noopener noreferrer"}},[t._v("Github")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("a",{attrs:{href:"https://www.qdfuns.com/u/17942.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Qdfuns")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("a",{attrs:{href:"https://www.instagram.com/tuffy_liu/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Instagram")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("a",{attrs:{href:"https://weibo.com/u/1816255453?refer_flag=1005055010",target:"_blank",rel:"noopener noreferrer"}},[t._v("Weibo")])])}],j=function(t){function e(){return Object(r["a"])(this,e),Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments))}return Object(l["a"])(e,t),e}(p["c"]);j=u["a"]([p["a"]],j);var C=j,x=C,w=(a("77d5"),Object(m["a"])(x,O,_,!1,null,"58802d86",null)),P=w.exports,L=function(t){function e(){return Object(r["a"])(this,e),Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments))}return Object(l["a"])(e,t),e}(p["c"]);L=u["a"]([Object(p["a"])({filters:{},components:{MyHeader:y,MyFooter:P}})],L);var S=L,B=S,$=(a("5c0b"),Object(m["a"])(B,n,s,!1,null,null,null)),T=$.exports,A=(a("7f7f"),a("8c4f")),H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-container"},[a("heading",[t._v("Home")]),t._l(t.data,function(t,e){return a("banner-home",{key:t.id,attrs:{postion:0===e?"left":"right",imgUrl:t.banner,title:t.title,subTitle:t.subTitle,id:t.id,mark:t.mark}})})],2)},E=[],q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h2",{staticClass:"heading"},[t._t("default")],2)},F=[],D=function(t){function e(){return Object(r["a"])(this,e),Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments))}return Object(l["a"])(e,t),e}(p["c"]);D=u["a"]([p["a"]],D);var M=D,U=M,N=(a("79fa"),Object(m["a"])(U,q,F,!1,null,"6ca41b90",null)),W=N.exports,I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"banner",class:{right:"right"===t.postion}},["right"===t.postion?[a("div",{staticClass:"banner-detail"},[a("div",{staticClass:"detail-box"},[a("p",{staticClass:"title"},[t._v(t._s(t.title))]),a("p",{staticClass:"sub-title",domProps:{innerHTML:t._s(t.subTitleHtml)}})])]),a("figure",{staticClass:"banner-img"},[a("div",{staticClass:"img-box",style:t.imgUrlStyle}),a("router-link",{staticClass:"btn-more",attrs:{tag:"div",to:{name:"BlogDetail",params:{id:t.id}}}},[a("span",{staticClass:"btn-txt"},[t._v("LEARN MORE")]),a("span",{staticClass:"btn-ico"},[a("svg",{staticClass:"btn-svg",attrs:{viewBox:"0 0 14 19"}},[a("path",{attrs:{d:"M3.85 18l6.3-5.968L12.4 9.9l-2.25-2.132L3.85 1.8 1.6 3.932 7.9 9.9l-6.3 5.968z",fill:"#FFF",stroke:"#FFF","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round"}})])])])],1)]:[a("figure",{staticClass:"banner-img"},[a("div",{staticClass:"img-box",style:t.imgUrlStyle}),a("router-link",{staticClass:"btn-more",attrs:{tag:"div",to:{name:"BlogDetail",params:{id:t.id}}}},[a("span",{staticClass:"btn-txt"},[t._v("LEARN MORE")]),a("span",{staticClass:"btn-ico"},[a("svg",{staticClass:"btn-svg",attrs:{viewBox:"0 0 14 19"}},[a("path",{attrs:{d:"M3.85 18l6.3-5.968L12.4 9.9l-2.25-2.132L3.85 1.8 1.6 3.932 7.9 9.9l-6.3 5.968z",fill:"#FFF",stroke:"#FFF","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round"}})])])])],1),a("div",{staticClass:"banner-detail"},[a("div",{staticClass:"detail-box"},[a("p",{staticClass:"title"},[t._v(t._s(t.title))]),a("p",{staticClass:"sub-title",domProps:{innerHTML:t._s(t.subTitleHtml)}})])])]],2)},z=[],R=(a("3b2b"),a("a481"),function(t){function e(){return Object(r["a"])(this,e),Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments))}return Object(l["a"])(e,t),Object(b["a"])(e,[{key:"imgUrlStyle",get:function(){return"background-image: url(".concat(this.imgUrl,")")}},{key:"subTitleHtml",get:function(){return this.mark?this.subTitle.replace(new RegExp(this.mark,"g"),"<span>".concat(this.mark,"</span>")):this.subTitle}}]),e}(p["c"]));u["a"]([Object(p["b"])({required:!1})],R.prototype,"postion",void 0),u["a"]([Object(p["b"])({required:!0})],R.prototype,"title",void 0),u["a"]([Object(p["b"])({required:!0})],R.prototype,"subTitle",void 0),u["a"]([Object(p["b"])({required:!1})],R.prototype,"mark",void 0),u["a"]([Object(p["b"])({required:!0})],R.prototype,"imgUrl",void 0),u["a"]([Object(p["b"])({required:!0})],R.prototype,"id",void 0),R=u["a"]([p["a"]],R);var G=R,J=G,Y=(a("f280"),a("ea77"),Object(m["a"])(J,I,z,!1,null,"ee88a2ea",null)),Q=Y.exports,V=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments)),t.imgUrl=a("190c"),t.data=[],t}return Object(l["a"])(e,t),Object(b["a"])(e,[{key:"created",value:function(){this.getBlogData()}},{key:"getBlogData",value:function(){var t=this;this.$axios.get("/data/blog.json").then(function(e){t.data=e.data.slice(0,2)})}}]),e}(p["c"]);V=u["a"]([Object(p["a"])({components:{Heading:W,BannerHome:Q}})],V);var Z=V,K=Z,X=(a("4cb1"),Object(m["a"])(K,H,E,!1,null,"0372226a",null)),tt=X.exports,et=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"photo-container",class:{"view-full":t.showFull}},[a("div",{staticClass:"photo-bg"}),a("div",{staticClass:"stack-slider",style:{height:t.clientHeight},on:{click:t.clickSlider}},[a("div",{ref:"stacksWrapper",staticClass:"stacks-wrapper"},t._l(t.data,function(e,i){return a("div",{key:"stack"+i,staticClass:"stack"},[a("h2",{staticClass:"stack-title"},[a("span",{staticClass:"title-span"},[t._v(t._s(e.setName))])]),t._l(e.photos,function(e,i){return a("div",{key:"photo"+i,staticClass:"item"},[a("div",{staticClass:"content"},[a("img",{attrs:{src:e.url,alt:""}}),a("h3",[t._v(t._s(e.title)+" "),a("span",{staticClass:"item__date"},[t._v(t._s(e.date))])])])])})],2)}),0)])])},at=[],it=a("217b"),nt=a.n(it),st=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments)),t.imgUrl=a("190c"),t.showFull=!1,t.canOpen=!0,t.clientHeight="300px",t.data=[],t}return Object(l["a"])(e,t),Object(b["a"])(e,[{key:"created",value:function(){this.getPhotoData()}},{key:"createSlider",value:function(){var t=this;this.stacksWrapper=this.$refs.stacksWrapper,this.stacks=this.stacksWrapper.querySelectorAll(".stack"),this.stacks[1].classList.add("stack-next"),this.stacks[this.stacks.length-1].classList.add("stack-prev"),this.flky=new nt.a(this.stacksWrapper,{wrapAround:!0,imagesLoaded:!0,initialIndex:0,setGallerySize:!1,pageDots:!1,prevNextButtons:!1,lazyLoad:2}),this.flky.on("cellSelect",function(){var e=t.stacksWrapper.querySelector(".stack-prev"),a=t.stacksWrapper.querySelector(".stack-next"),i=t.flky.selectedIndex,n=t.flky.cells.length,s=i>0?i-1:n-1,r=i<n-1?i+1:0;e&&e.classList.remove("stack-prev"),a&&a.classList.remove("stack-next"),t.stacks[s].classList.add("stack-prev"),t.stacks[r].classList.add("stack-next"),t.showStack(t.stacks[i])}),this.flky.on("dragStart",function(){t.canOpen=!1}),this.flky.on("settle",function(){t.canOpen=!0})}},{key:"clickSlider",value:function(t){var e=t.target;if(!e.classList.contains("title-span")||!this.canOpen)return!1;var a=e.parentElement.parentElement;a.classList.contains("is-selected")?(this.showFull=!this.showFull,this.showStack(a)):a.classList.contains("stack-next")?this.nextStack():a.classList.contains("stack-prev")&&this.prevStack()}},{key:"showStack",value:function(t){this.showFull?this.clientHeight=t.clientHeight+"px":this.clientHeight="300px"}},{key:"nextStack",value:function(){this.flky.next(!0)}},{key:"prevStack",value:function(){this.flky.previous(!0)}},{key:"getPhotoData",value:function(){var t=this;this.$axios.get("/data/photo.json").then(function(e){t.data=e.data,t.$nextTick(function(){t.createSlider()})})}}]),e}(p["c"]);st=u["a"]([Object(p["a"])({components:{Heading:W,BannerHome:Q}})],st);var rt=st,ct=rt,ot=(a("9fa4"),Object(m["a"])(ct,et,at,!1,null,"4a5c0115",null)),lt=ot.exports,ut=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"about-container"},[a("heading",[t._v("About")]),t._m(0)],1)},pt=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("div",{staticClass:"box-img"},[i("img",{attrs:{src:a("de37"),alt:""}})]),i("div",{staticClass:"box-detail"},[i("h3",[t._v("Tuffy - 阿胐")]),i("p",[t._v("Front End Engineer  / ShenZhen.China")]),i("p",[t._v("361329912@qq.com  / +8618807800463")]),i("p",[t._v("霍山有兽焉，装如狸，而白尾有鬣，")]),i("p",[t._v("名曰胐胐，养之可以已忧。")])])])}],dt=function(t){function e(){return Object(r["a"])(this,e),Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments))}return Object(l["a"])(e,t),e}(p["c"]);dt=u["a"]([Object(p["a"])({components:{Heading:W}})],dt);var ft=dt,bt=ft,ht=(a("ada9"),Object(m["a"])(bt,ut,pt,!1,null,"731f9081",null)),vt=ht.exports,gt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"blog-container"},[a("heading",[t._v("Blog")]),a("transition-group",{attrs:{tag:"div",name:"list"}},t._l(t.showData,function(t,e){return a("blog-item",{key:"blog"+e,attrs:{id:t.id,title:t.title,subTitle:t.subTitle,imgUrl:t.banner,date:t.date}})}),1),a("pagination",{attrs:{itemsPerPage:t.itemsPerPage,totalItems:t.data.length},on:{change:t.pageChange}})],1)},mt=[],kt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("router-link",{staticClass:"blog-item",attrs:{tag:"div",to:{name:"BlogDetail",params:{id:t.id}}}},[a("div",{staticClass:"img-box",style:t.imgUrlStyle}),a("div",{staticClass:"detail"},[a("h3",{staticClass:"title"},[t._v(" "+t._s(t.title)),a("span",{staticClass:"date"},[t._v(t._s(t.date))])]),a("p",{staticClass:"sub-title"},[t._v(t._s(t.subTitle))])])])},yt=[],Ot=function(t){function e(){return Object(r["a"])(this,e),Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments))}return Object(l["a"])(e,t),Object(b["a"])(e,[{key:"imgUrlStyle",get:function(){return"background-image: url(".concat(this.imgUrl,")")}}]),e}(p["c"]);u["a"]([Object(p["b"])({required:!0})],Ot.prototype,"title",void 0),u["a"]([Object(p["b"])({required:!0})],Ot.prototype,"subTitle",void 0),u["a"]([Object(p["b"])({required:!0})],Ot.prototype,"imgUrl",void 0),u["a"]([Object(p["b"])({required:!0})],Ot.prototype,"date",void 0),u["a"]([Object(p["b"])({required:!0})],Ot.prototype,"id",void 0),Ot=u["a"]([p["a"]],Ot);var _t=Ot,jt=_t,Ct=(a("af1c"),Object(m["a"])(jt,kt,yt,!1,null,"2ff0bfa2",null)),xt=Ct.exports,wt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.count>1?a("ul",{staticClass:"pagination"},[a("li",{staticClass:"item",class:{disable:!t.canPrev},on:{click:t.onClickPrev}},[t._v(t._s(t.prevText))]),t._l(t.pages,function(e,i){return a("li",{staticClass:"item",class:{current:i+1===t.pageActive},on:{click:function(e){return t.onClickPage(i+1)}}},[t._v(t._s(i+1))])}),a("li",{staticClass:"item",class:{disable:!t.canNext},on:{click:t.onClickNext}},[t._v(t._s(t.nextText))])],2):t._e()},Pt=[],Lt=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments)),t.pageActive=1,t}return Object(l["a"])(e,t),Object(b["a"])(e,[{key:"onPageActiveChange",value:function(t){this.pageActive=t,this.$emit("change",t)}},{key:"onClickPrev",value:function(){this.canPrev&&this.pageActive--}},{key:"onClickNext",value:function(){this.canNext&&this.pageActive++}},{key:"onClickPage",value:function(t){this.pageActive=t}},{key:"canPrev",get:function(){return this.pageActive>1}},{key:"canNext",get:function(){return this.pageActive<this.count}},{key:"count",get:function(){return Math.max(1,Math.ceil(this.totalItems/this.itemsPerPage))}},{key:"pages",get:function(){return new Array(this.count)}}]),e}(p["c"]);u["a"]([Object(p["b"])({required:!1,default:1})],Lt.prototype,"value",void 0),u["a"]([Object(p["b"])({required:!1,default:5})],Lt.prototype,"itemsPerPage",void 0),u["a"]([Object(p["b"])({required:!0})],Lt.prototype,"totalItems",void 0),u["a"]([Object(p["b"])({required:!1,default:"Prev"})],Lt.prototype,"prevText",void 0),u["a"]([Object(p["b"])({required:!1,default:"Next"})],Lt.prototype,"nextText",void 0),u["a"]([Object(p["d"])("pageActive")],Lt.prototype,"onPageActiveChange",null),Lt=u["a"]([p["a"]],Lt);var St=Lt,Bt=St,$t=(a("ed26"),Object(m["a"])(Bt,wt,Pt,!1,null,"1430257b",null)),Tt=$t.exports,At=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments)),t.data=[],t.pageActive=1,t.itemsPerPage=10,t.title="week 的踩坑之旅",t.subTitle="week填不完的坑",t.date="05/05/2015",t.imgUrl="https://hbimg.huabanimg.com/d81cf602d4a9e477de3a5d5ae16ba4e2068a131f16921-smAmuV_fw658",t}return Object(l["a"])(e,t),Object(b["a"])(e,[{key:"created",value:function(){this.getBlogData()}},{key:"getBlogData",value:function(){var t=this;this.$axios.get("/data/blog.json").then(function(e){t.data=e.data})}},{key:"pageChange",value:function(t){this.pageActive=t}},{key:"showData",get:function(){var t=(this.pageActive-1)*this.itemsPerPage;return this.data.slice(t,t+this.itemsPerPage)}}]),e}(p["c"]);At=u["a"]([Object(p["a"])({components:{Heading:W,BlogItem:xt,Pagination:Tt}})],At);var Ht=At,Et=Ht,qt=(a("65d8"),a("fdcc"),Object(m["a"])(Et,gt,mt,!1,null,"7d22937d",null)),Ft=qt.exports,Dt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cook-container"},[a("heading",[t._v("Cook")]),a("div",{staticClass:"container"},[a("div",{ref:"stacksWrapper",staticClass:"stacks-wrapper"},t._l(t.data,function(e,i){return a("div",{key:"stack"+i,staticClass:"stack"},t._l(e,function(e,i){return a("figure",{key:"figure"+i,staticClass:"figure-layout",style:"grid-area:"+e.gridArea},[a("div",{staticClass:"img-box",style:"background-image: url("+e.picture+")"}),a("figcaption",[a("h3",{staticClass:"title"},[t._v(t._s(e.title))]),a("p",{staticClass:"sub-title"},[t._v(t._s(e.subTitle))])])])}),0)}),0),a("div",{staticClass:"btn next-btn",on:{click:t.clickNextBtn}}),a("div",{staticClass:"btn prev-btn disable",on:{click:t.clickPrevBtn}})])],1)},Mt=[],Ut=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments)),t.imgUrl=a("190c"),t.data=[],t.selectedIndex=0,t}return Object(l["a"])(e,t),Object(b["a"])(e,[{key:"created",value:function(){this.getCookData()}},{key:"createSlider",value:function(){var t=this;this.stacksWrapper=this.$refs.stacksWrapper,this.stacks=this.stacksWrapper.querySelectorAll(".stack"),this.stacks[1]&&(this.stacks[1].classList.add("stack-next"),this.stacks[this.stacks.length-1].classList.add("stack-prev")),this.flky=new nt.a(this.stacksWrapper,{wrapAround:!0,imagesLoaded:!0,initialIndex:0,setGallerySize:!1,pageDots:!1,prevNextButtons:!1,lazyLoad:2}),this.flky.on("cellSelect",function(){var e=t.stacksWrapper.querySelector(".stack-prev"),a=t.stacksWrapper.querySelector(".stack-next"),i=t.flky.selectedIndex,n=t.flky.cells.length,s=i>0?i-1:n-1,r=i<n-1?i+1:0;e&&e.classList.remove("stack-prev"),a&&a.classList.remove("stack-next"),t.stacks[s].classList.add("stack-prev"),t.stacks[r].classList.add("stack-next")})}},{key:"clickNextBtn",value:function(){this.flky.next(!0)}},{key:"clickPrevBtn",value:function(){this.flky.previous(!0)}},{key:"getCookData",value:function(){var t=this;this.$axios.get("/data/cook.json").then(function(e){t.data=e.data,t.$nextTick(function(){t.createSlider()})})}}]),e}(p["c"]);Ut=u["a"]([Object(p["a"])({components:{Heading:W}})],Ut);var Nt=Ut,Wt=Nt,It=(a("16b9"),Object(m["a"])(Wt,Dt,Mt,!1,null,"70890c86",null)),zt=It.exports,Rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"blog-detail"},[a("banner-blog",{attrs:{title:t.title,subTitle:t.tip,imgUrl:t.banner}}),a("article",{ref:"container",staticClass:"container",domProps:{innerHTML:t._s(t.blogDetail)}}),t._m(0),a("div",{staticClass:"row"},t._l(t.blogList,function(e){return a("router-link",{key:e.id,staticClass:"block",attrs:{tag:"div",to:{name:"BlogDetail",params:{id:e.id}}}},[a("img",{attrs:{src:e.banner,alt:""}}),a("p",[t._v(t._s(e.title))])])}),1)],1)},Gt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h3",{staticClass:"other"},[a("span",[t._v("Orthers")])])}],Jt=(a("20d6"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"banner-blog"},[a("h3",{staticClass:"title"},[t._v(t._s(t.title))]),a("div",{staticClass:"img-box",style:t.imgUrlStyle}),a("p",{staticClass:"sub-title"},[t._v(t._s(t.subTitle))])])}),Yt=[],Qt=function(t){function e(){return Object(r["a"])(this,e),Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments))}return Object(l["a"])(e,t),Object(b["a"])(e,[{key:"imgUrlStyle",get:function(){return"background-image: url(".concat(this.imgUrl,")")}}]),e}(p["c"]);u["a"]([Object(p["b"])({required:!0})],Qt.prototype,"title",void 0),u["a"]([Object(p["b"])({required:!0})],Qt.prototype,"subTitle",void 0),u["a"]([Object(p["b"])({required:!0})],Qt.prototype,"imgUrl",void 0),Qt=u["a"]([p["a"]],Qt);var Vt=Qt,Zt=Vt,Kt=(a("d5f7"),Object(m["a"])(Zt,Jt,Yt,!1,null,"5ba2d99e",null)),Xt=Kt.exports,te=a("c197"),ee=a.n(te),ae=(a("a878"),a("2c43"),function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments)),t.title="",t.tip="",t.banner="",t.id="",t.blogDetail="",t.blogList=[],t}return Object(l["a"])(e,t),Object(b["a"])(e,[{key:"created",value:function(){this.id=this.$route.params.id,this.getBlogData(),this.getBlogDetail()}},{key:"getBlogDetail",value:function(){var t=this;this.$axios.get("/data/blogs/".concat(this.id,".html")).then(function(e){t.blogDetail=e.data})}},{key:"getBlogData",value:function(){var t=this;this.$axios.get("/data/blog.json").then(function(e){var a=e.data.findIndex(function(e){return e.id===t.id});t.blogList=e.data.slice(a+1,a+4),t.blogList=t.blogList.concat(e.data.slice(0,Math.max(3-t.blogList.length,0)));var i=e.data[a];t.title=i.title,t.tip=i.tip,t.banner=i.banner,t.showHighCode()})}},{key:"showHighCode",value:function(){this.$nextTick(function(){setTimeout(function(){ee.a.highlightAll()},100)})}}]),e}(p["c"]));ae=u["a"]([Object(p["a"])({name:"BlogDetail",components:{BannerBlog:Xt}})],ae);var ie=ae,ne=ie,se=(a("64d9"),a("2c73"),Object(m["a"])(ne,Rt,Gt,!1,null,"f94ae206",null)),re=se.exports;i["a"].use(A["a"]);var ce=new A["a"]({routes:[{path:"/",name:"Home",component:tt},{path:"/photo",name:"Photo",component:lt},{path:"/about",name:"About",component:vt},{path:"/blog",name:"Blog",component:Ft},{path:"/cook",name:"Cook",component:zt},{path:"/blog-detail/:id",name:"BlogDetail",component:re},{path:"*",redirect:{name:"Home"}}],scrollBehavior:function(t,e,a){return console.log(e.name),a&&t.meta.keepAlive?new Promise(function(t){t(a)}):new Promise(function(t){t({x:0,y:0})})}}),oe=a("9483");Object(oe["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});var le=a("bc3a"),ue=a.n(le);i["a"].prototype.$axios=ue.a,i["a"].config.productionTip=!1,new i["a"]({router:ce,render:function(t){return t(T)}}).$mount("#app")},cf05:function(t,e,a){t.exports=a.p+"img/logo.f2f0a73a.png"},d5f7:function(t,e,a){"use strict";var i=a("6d8d"),n=a.n(i);n.a},de37:function(t,e,a){t.exports=a.p+"img/user.488e1f6e.jpg"},e1a6:function(t,e,a){},ea77:function(t,e,a){"use strict";var i=a("ebc7"),n=a.n(i);n.a},ebc7:function(t,e,a){},ed26:function(t,e,a){"use strict";var i=a("79ab"),n=a.n(i);n.a},ee99:function(t,e,a){},efad:function(t,e,a){},f280:function(t,e,a){"use strict";var i=a("4d97"),n=a.n(i);n.a},fdcc:function(t,e,a){"use strict";var i=a("11ba"),n=a.n(i);n.a}});
//# sourceMappingURL=app.18c3c1c3.js.map