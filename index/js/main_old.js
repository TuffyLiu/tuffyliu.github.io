//获取浏览器信息
function get_browser_info() {
	var t, e = navigator.userAgent,
		i = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	return /trident/i.test(i[1]) ? (t = /\brv[ :]+(\d+)/g.exec(e) || [], {
		name: "IE",
		version: t[1] || ""
	}) : "Chrome" === i[1] && (t = e.match(/\bOPR\/(\d+)/), null != t) ? {
		name: "Opera",
		version: t[1]
	} : (i = i[2] ? [i[1], i[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (t = e.match(/version\/(\d+)/i)) && i.splice(1, 1, t[1]), {
		name: i[0],
		version: i[1]
	})
}
//contentWidth为#content的大小，posterWidthweo为blok-poster的大小
function positionPoster() {
	if (
		xPos = getRandomInt(50, contentWidth - posterWidth - 50), 
		yPos = getRandomInt(50, contentHeight - posterHeight - 50), 
		xPos > (contentWidth - vpW) / 2 - posterWidth - 50 && (contentWidth + vpW) / 2 > xPos && yPos > (contentHeight - vpH) / 2 - posterHeight - 50 && (contentHeight + vpH) / 2 > yPos)
		return positionPoster(), void 0;
	if (start)
		posterPos[posterCount] = new Array, posterPos[0][0] = xPos, posterPos[0][1] = yPos, start = !1;
	else {
		for (var t in posterPos) if (Math.abs(xPos - posterPos[t][0]) < posterWidth / 1.3 && 1e3 > throttle) return throttle++, positionPoster(), void 0;
		throttle = 0, posterCount++, posterPos[posterCount] = new Array, posterPos[posterCount][0] = xPos, posterPos[posterCount][1] = yPos
	}
}
function tooltipDragCursor() {
	return classie.add(tooltipPlay, "hide"), classie.add(tooltipSeek, "hide"), !1
}
function tooltipPlayCursor(t) {
	return classie.remove(tooltipPlay, "hide"), tooltipPlay.style.top = t.pageY + 70 + "px", tooltipPlay.style.left = t.pageX - 45 + "px", !1
}
function seekPosition(t) {
	return seekPositionValue = t.pageX / vpW, classie.remove(tooltipSeek, "hide"), tooltipSeek.style.top = t.pageY + 70 + "px", tooltipSeek.style.left = t.pageX - 30 + "px", tooltipSeek.innerHTML = Math.round(seekPositionValue * (thisSongDuration / 60 || 0)) + " min", !1
}
function goToPosition(t) {
	return classie.add(progressBarValue, "seek"), seekPositionValue = t.pageX / vpW, player.audio.currentTime = seekPositionValue * (thisSongDuration || 0), setTimeout(function() {
		classie.remove(progressBarValue, "seek")
	}, 1e3), !1
}
function draggablePoster() {
	dragPoster = Draggable.create(".blok-poster", {
		bounds: {
			top: boundTop,
			left: boundLeft,
			width: boundWidth,
			height: boundHeight
		},
		edgeResistance: .65,
		type: "x,y",
		throwProps: !0,
		onDrag: function() {
			classie.add(this.target, "dragging")
		},
		onDragEnd: function() {
			classie.remove(this.target, "dragging")
		},
		onClick: function() {
			var t = this.target;
			if (player.playing) pausePlayer();
			else {
				var e = document.querySelector(".blok-poster.play");
				if (t == e) return !1;
				if (e) {
					setTimeout(function() {
						e.style.height = posterHeight + "px", e.style.top = parseInt(e.style.top, 10) - newTopValuePoster + "px"
					}, 280);
					for (var i = 0, n = allPosters.length; n > i; i++) classie.remove(allPosters[i], "play")
				} else for (var i = 0, n = allPosters.length; n > i; i++) classie.remove(allPosters[i], "play")
			}
			tooltipPlayState && (classie.add(tooltipPlay, "hide"), tooltipPlayState = !1, setTimeout(function() {
				tooltipPlay.style.display = "none"
			}, 200)), thisSong = t.getAttribute("data-soundcloud"), player.resolve(thisSong, render), classie.add(t, "play"), setTimeout(function() {
				t.style.height = posterWidth + "px", t.style.top = parseInt(t.style.top, 10) + newTopValuePoster + "px"
			}, 300)
		},
		onPress: function(t) {
			t.stopPropagation()
		}
	})
}
function draggableContainer(t, e) {
	Draggable.create("#container", {
		type: t,
		edgeResistance: e,
		throwProps: !0,
		onClick: function() {
			if (player.playing) pausePlayer();
			else {
				var t = document.querySelector(".blok-poster.play");
				t && classie.remove(t, "play"), classie.remove(progressBar, "is-visible"), document.title = originalDocumentTitle, clearInterval(checkIfPlayingTimer), setTimeout(function() {
					t.style.height = posterHeight + "px", t.style.top = parseInt(t.style.top, 10) - newTopValuePoster + "px"
				}, 280)
			}
		}
	})
}
function checkIfPlaying() {
	checkIfPlayingTimer = setInterval(function() {
		player.audio.currentTime >= .2 && (classie.remove(document.querySelector(".play .music--loading"), "is-visible"), TweenLite.to(rotateDisc[rotateDiscIndex], 1, {
			timeScale: 1
		}), rotateDisc[rotateDiscIndex].play(), clearInterval(checkIfPlayingTimer))
	}, 50)
}
function pausePlayer(t) {
	var e = document.querySelector(".blok-poster.play"),
		i = document.querySelector(".show-pause-btn");
	clearInterval(checkIfPlayingTimer), t && player.stop(), i && classie.remove(i, "show-pause-btn"), classie.remove(progressBar, "is-visible"), TweenLite.to(rotateDisc, 1.2, {
		timeScale: 0
	}), setTimeout(function() {
		classie.remove(e, "play"), setTimeout(function() {
			e.style.height = posterHeight + "px", e.style.top = parseInt(e.style.top, 10) - newTopValuePoster + "px"
		}, 280)
	}, 1e3), player.pause(), clearInterval(progressBarInterval), progressBarValue.style.width = "0%", document.title = originalDocumentTitle
}
function getTransform(t) {
	var e = window.getComputedStyle(t, null).getPropertyValue(transformPropPrefix),
		i = e.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}.+))(?:, (-{0,1}.+))\))/);
	return i ? "3d" == i[1] ? i.slice(2, 5) : (i.push(0), i.slice(5, 8)) : [0, 0, 0]
}
function getRandomInt(t, e) {
	return Math.floor(Math.random() * (e - t + 1)) + t
}
function positionGIFs() {
	var t = Math.floor(Math.random() * aniCellAmount);
	if (aniCount != allAnimations.length) {
		if (!aniCells[t][2]) {
			var e = aniCells[t][0] + contentWidth / aniCellRows / 3 - Math.random() * (contentWidth / aniCellRows / 1.5),
				i = aniCells[t][1] + contentWidth / aniCellRows / 3 - Math.random() * (contentWidth / aniCellRows / 1.5);
			if (e > (contentWidth - vpW) / 2 && (contentWidth + vpW) / 2 > e && i > (contentHeight - vpH) / 2 && (contentHeight + vpH) / 2 > i) return positionGIFs(), void 0;
			allAnimations[aniCount].style.left = e + "px", allAnimations[aniCount].style.top = i + "px", aniCells[t][2] = !0, aniCount++
		}
		positionGIFs()
	}
}
function getActualDay(t, e) {
	var i = new Date;
	i.setYear(parseInt("20" + t.toString().substr(0, 2))), i.setDate(parseInt(t.toString().substr(4, 2))), i.setMonth(parseInt(t.toString().substr(2, 2) - 1));
	var n = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][i.getDay()];
	return e && (n = n.substr(0, 2)), n
}
function insertGifs() {
	for (var t = ["300", "320", "400", "176", "400"], e = ["405", "250", "267", "300", "250"], i = 0, n = 5; n > i; i++) content.insertAdjacentHTML("afterBegin", '<div class="gif-items" style="background-image: url(' + rootUrl + i + ".gif); width:" + t[i] + "px; height:" + e[i] + 'px;"></div>');
	allAnimations = document.querySelectorAll(".gif-items")
}
function resetProgress() {
	loadedImageCount = 0
}
function updateProgress(t) {
	preloadPercentage = t / imageCount * 100 - 100, TweenLite.to(preloaderBar, .5, {
		y: preloadPercentage + "%"
	})
}
function onProgress() {
	loadedImageCount++, updateProgress(loadedImageCount)
}
function onAlways() {
	var t = new Blazy;
	t.load(document.querySelectorAll(".b-lazy"), !0);
	var e = getRandomInt(1, 2);
	classie.remove(documentBody, "loading"), setTimeout(function() {
		classie.add(preloader, "hide"), classie.add(documentBody, "lucky-" + e), setTimeout(function() {
			preloader.remove(), vpW > 640 && (insertGifs(), positionGIFs())
		}, 1500)
	}, 500)
}
!
function() {
	"use strict";

	function t(e, n) {
		function r(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		}
		var s;
		if (n = n || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = n.touchBoundary || 10, this.layer = e, this.tapDelay = n.tapDelay || 200, this.tapTimeout = n.tapTimeout || 700, !t.notNeeded(e)) {
			for (var o = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], a = this, l = 0, h = o.length; h > l; l++) a[o[l]] = r(a[o[l]], a);
			i && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, i, n) {
				var r = Node.prototype.removeEventListener;
				"click" === t ? r.call(e, t, i.hijacked || i, n) : r.call(e, t, i, n)
			}, e.addEventListener = function(t, i, n) {
				var r = Node.prototype.addEventListener;
				"click" === t ? r.call(e, t, i.hijacked || (i.hijacked = function(t) {
					t.propagationStopped || i(t)
				}), n) : r.call(e, t, i, n)
			}), "function" == typeof e.onclick && (s = e.onclick, e.addEventListener("click", function(t) {
				s(t)
			}, !1), e.onclick = null)
		}
	}
	var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
		i = navigator.userAgent.indexOf("Android") > 0 && !e,
		n = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
		r = n && /OS 4_\d(_\d)?/.test(navigator.userAgent),
		s = n && /OS [6-7]_\d/.test(navigator.userAgent),
		o = navigator.userAgent.indexOf("BB10") > 0;
	t.prototype.needsClick = function(t) {
		switch (t.nodeName.toLowerCase()) {
		case "button":
		case "select":
		case "textarea":
			if (t.disabled) return !0;
			break;
		case "input":
			if (n && "file" === t.type || t.disabled) return !0;
			break;
		case "label":
		case "iframe":
		case "video":
			return !0
		}
		return /\bneedsclick\b/.test(t.className)
	},
	t.prototype.needsFocus = function(t) {
		switch (t.nodeName.toLowerCase()) {
		case "textarea":
			return !0;
		case "select":
			return !i;
		case "input":
			switch (t.type) {
			case "button":
			case "checkbox":
			case "file":
			case "image":
			case "radio":
			case "submit":
				return !1
			}
			return !t.disabled && !t.readOnly;
		default:
			return /\bneedsfocus\b/.test(t.className)
		}
	},
	 t.prototype.sendClick = function(t, e) {//document.activeElement当前页面中获得焦点的元素,initMouseEvent新建一个鼠标事件
		var i, n;
		document.activeElement &&
		document.activeElement !== t &&
		document.activeElement.blur(),
		n = e.changedTouches[0],
		i = document.createEvent("MouseEvents"),
		i.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, t.dispatchEvent(i)
	},
	t.prototype.determineEventType = function(t) {
		return i && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
	},
	t.prototype.focus = function(t) {
		var e;
		n && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
	},
	t.prototype.updateScrollParent = function(t) {
		var e, i;
		if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
			i = t;
			do {
				if (i.scrollHeight > i.offsetHeight) {
					e = i, t.fastClickScrollParent = i;
					break
				}
				i = i.parentElement
			} while (i)
		}
		e && (e.fastClickLastScrollTop = e.scrollTop)
	},
	t.prototype.getTargetElementFromEventTarget = function(t) {
		return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
	},
	t.prototype.onTouchStart = function(t) {//window.getSelection()选择的范围？
		var e, i, s;
		if (t.targetTouches.length > 1) return !0;
		if (e = this.getTargetElementFromEventTarget(t.target), i = t.targetTouches[0], n) {
			if (s = window.getSelection(), s.rangeCount && !s.isCollapsed) return !0;
			if (!r) {
				if (i.identifier && i.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
				this.lastTouchIdentifier = i.identifier, this.updateScrollParent(e)
			}
		}
		return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = i.pageX, this.touchStartY = i.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
	}, 
	t.prototype.touchHasMoved = function(t) {//判断鼠标是否有移动
		var e = t.changedTouches[0],
			i = this.touchBoundary;
		return Math.abs(e.pageX - this.touchStartX) > i || Math.abs(e.pageY - this.touchStartY) > i ? !0 : !1
	},
	t.prototype.onTouchMove = function(t) {
		return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
	},
	t.prototype.findControl = function(t) {
		return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
	},
	 t.prototype.onTouchEnd = function(t) {
		var e, o, a, l, h, c = this.targetElement;
		if (!this.trackingClick) return !0;
		if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
		if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
		if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, o = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, s && (h = t.changedTouches[0], c = document.elementFromPoint(h.pageX - window.pageXOffset, h.pageY - window.pageYOffset) || c, c.fastClickScrollParent = this.targetElement.fastClickScrollParent), a = c.tagName.toLowerCase(), "label" === a) {
			if (e = this.findControl(c)) {
				if (this.focus(c), i) return !1;
				c = e
			}
		} else if (this.needsFocus(c)) return t.timeStamp - o > 100 || n && window.top !== window && "input" === a ? (this.targetElement = null, !1) : (this.focus(c), this.sendClick(c, t), n && "select" === a || (this.targetElement = null, t.preventDefault()), !1);
		return n && !r && (l = c.fastClickScrollParent, l && l.fastClickLastScrollTop !== l.scrollTop) ? !0 : (this.needsClick(c) || (t.preventDefault(), this.sendClick(c, t)), !1)
	},
	t.prototype.onTouchCancel = function() {
		this.trackingClick = !1, this.targetElement = null
	}, 
	t.prototype.onMouse = function(t) {
		return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0 : !0
	},
	 t.prototype.onClick = function(t) {
		var e;
		return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
	}, 
	t.prototype.destroy = function() {
		var t = this.layer;
		i && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
	},
	 t.notNeeded = function(t) {
		var e, n, r, s;
		if ("undefined" == typeof window.ontouchstart) return !0;
		if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
			if (!i) return !0;
			if (e = document.querySelector("meta[name=viewport]")) {
				if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
				if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
			}
		}
		if (o && (r = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), r[1] >= 10 && r[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
			if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
			if (document.documentElement.scrollWidth <= window.outerWidth) return !0
		}
		return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (s = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], s >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
	}, t.attach = function(e, i) {
		return new t(e, i)
	}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
		return t
	}) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}(), function(t, e) {
	"function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.Blazy = e()
}(this, function() {
	function t(t) {
		var i = t._util;
		i.elements = r(t.options.selector), i.count = i.elements.length, i.destroyed && (i.destroyed = !1, t.options.container && l(t.options.container, function(t) {
			o(t, "scroll", i.validateT)
		}), o(window, "resize", i.saveViewportOffsetT), o(window, "resize", i.validateT), o(window, "scroll", i.validateT)), e(t)
	}
	function e(t) {
		for (var e = t._util, i = 0; i < e.count; i++) {
			var r = e.elements[i],
				s = r.getBoundingClientRect();
			(s.right >= u.left && s.bottom >= u.top && s.left <= u.right && s.top <= u.bottom || n(r, t.options.successClass)) && (t.load(r), e.elements.splice(i, 1), e.count--, i--)
		}
		0 === e.count && t.destroy()
	}
	function i(t, e, i) {
		if (!n(t, i.successClass) && (e || i.loadInvisible || 0 < t.offsetWidth && 0 < t.offsetHeight)) if (e = t.getAttribute(c) || t.getAttribute(i.src)) {
			e = e.split(i.separator);
			var r = e[p && 1 < e.length ? 1 : 0],
				s = "img" === t.nodeName.toLowerCase();
			l(i.breakpoints, function(e) {
				t.removeAttribute(e.src)
			}), t.removeAttribute(i.src), s || void 0 === t.src ? (e = new Image, e.onerror = function() {
				i.error && i.error(t, "invalid"), t.className = t.className + " " + i.errorClass
			}, e.onload = function() {
				s ? t.src = r : t.style.backgroundImage = 'url("' + r + '")', t.className = t.className + " " + i.successClass, i.success && i.success(t)
			}, e.src = r) : (t.src = r, t.className = t.className + " " + i.successClass)
		} else i.error && i.error(t, "missing"), n(t, i.errorClass) || (t.className = t.className + " " + i.errorClass)
	}
	function n(t, e) {
		return -1 !== (" " + t.className + " ").indexOf(" " + e + " ")
	}
	function r(t) {
		var e = [];
		t = document.querySelectorAll(t);
		for (var i = t.length; i--; e.unshift(t[i]));
		return e
	}
	function s(t) {
		u.bottom = (window.innerHeight || document.documentElement.clientHeight) + t, u.right = (window.innerWidth || document.documentElement.clientWidth) + t
	}
	function o(t, e, i) {
		t.attachEvent ? t.attachEvent && t.attachEvent("on" + e, i) : t.addEventListener(e, i, !1)
	}
	function a(t, e, i) {
		t.detachEvent ? t.detachEvent && t.detachEvent("on" + e, i) : t.removeEventListener(e, i, !1)
	}
	function l(t, e) {
		if (t && e) for (var i = t.length, n = 0; i > n && !1 !== e(t[n], n); n++);
	}
	function h(t, e, i) {
		var n = 0;
		return function() {
			var r = +new Date;
			e > r - n || (n = r, t.apply(i, arguments))
		}
	}
	var c, u, p;
	return function(n) {
		if (!document.querySelectorAll) {
			var r = document.createStyleSheet();
			document.querySelectorAll = function(t, e, i, n, s) {
				for (s = document.all, e = [], t = t.replace(/\[for\b/gi, "[htmlFor").split(","), i = t.length; i--;) {
					for (r.addRule(t[i], "k:v"), n = s.length; n--;) s[n].currentStyle.k && e.push(s[n]);
					r.removeRule(0)
				}
				return e
			}
		}
		var o = this,
			f = o._util = {};
		f.elements = [], f.destroyed = !0, o.options = n || {}, o.options.error = o.options.error || !1, o.options.offset = o.options.offset || 100, o.options.success = o.options.success || !1, o.options.selector = o.options.selector || ".b-lazy", o.options.separator = o.options.separator || "|", o.options.container = o.options.container ? document.querySelectorAll(o.options.container) : !1, o.options.errorClass = o.options.errorClass || "b-error", o.options.breakpoints = o.options.breakpoints || !1, o.options.loadInvisible = o.options.loadInvisible || !1, o.options.successClass = o.options.successClass || "b-loaded", o.options.validateDelay = o.options.validateDelay || 25, o.options.saveViewportOffsetDelay = o.options.saveViewportOffsetDelay || 50, o.options.src = c = o.options.src || "data-src", p = 1 < window.devicePixelRatio, u = {}, u.top = 0 - o.options.offset, u.left = 0 - o.options.offset, o.revalidate = function() {
			t(this)
		}, o.load = function(t, e) {
			var n = this.options;
			void 0 === t.length ? i(t, e, n) : l(t, function(t) {
				i(t, e, n)
			})
		}, o.destroy = function() {
			var t = this._util;
			this.options.container && l(this.options.container, function(e) {
				a(e, "scroll", t.validateT)
			}), a(window, "scroll", t.validateT), a(window, "resize", t.validateT), a(window, "resize", t.saveViewportOffsetT), t.count = 0, t.elements.length = 0, t.destroyed = !0
		}, f.validateT = h(function() {
			e(o)
		}, o.options.validateDelay, o), f.saveViewportOffsetT = h(function() {
			s(o.options.offset)
		}, o.options.saveViewportOffsetDelay, o), s(o.options.offset), l(o.options.breakpoints, function(t) {
			return t.width >= window.screen.width ? (c = t.src, !1) : void 0
		}), t(o)
	}
}), Function.prototype.debounce = function(t, e) {
	var i = this,
		n = null,
		r = t;
	return function() {
		function t() {
			i.apply(s, o), n = null
		}
		var s = e || this,
			o = arguments;
		n && clearTimeout(n), n = setTimeout(t, r)
	}
}, Function.prototype.throttle = function(t, e) {
	var i = this,
		n = null,
		r = t;
	return function() {
		var t = e || this,
			s = arguments,
			o = Date.now();
		(!n || o - n >= r) && (n = o, i.apply(t, s))
	}
};
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
	"use strict";
	_gsScope._gsDefine("utils.Draggable", ["events.EventDispatcher", "TweenLite", "plugins.CSSPlugin"], function(t, e, i) {
		var n, r, s, o, a, l, h, c, u = {
			css: {}
		},
			p = {
				css: {}
			},
			f = {
				css: {}
			},
			d = {
				css: {}
			},
			m = _gsScope._gsDefine.globals,
			_ = {},
			g = document,
			v = g.documentElement || {},
			y = function(t) {
				return g.createElementNS ? g.createElementNS("http://www.w3.org/1999/xhtml", t) : g.createElement(t)
			},
			x = y("div"),
			w = [],
			T = function() {
				return !1
			},
			b = 180 / Math.PI,
			P = 999999999999999,
			k = Date.now ||
		function() {
			return (new Date).getTime()
		}, S = !(g.addEventListener || !g.all), C = g.createElement("div"), O = [], A = {}, E = 0, R = /^(?:a|input|textarea|button|select)$/i, D = 0, M = -1 !== navigator.userAgent.toLowerCase().indexOf("android"), L = 0, I = {}, N = {}, B = function(t) {
			if ("string" == typeof t && (t = e.selector(t)), !t || t.nodeType) return [t];
			var i, n = [],
				r = t.length;
			for (i = 0; i !== r; n.push(t[i++]));
			return n
		}, F = function(t) {
			var e, i = {};
			for (e in t) i[e] = t[e];
			return i
		}, X = function() {
			for (var t = O.length; --t > -1;) O[t]()
		}, W = function(t) {
			O.push(t), 1 === O.length && e.ticker.addEventListener("tick", X, this, !1, 1)
		}, Y = function(t) {
			for (var i = O.length; --i > -1;) O[i] === t && O.splice(i, 1);
			e.to(z, 0, {
				overwrite: "all",
				delay: 15,
				onComplete: z
			})
		}, z = function() {
			O.length || e.ticker.removeEventListener("tick", X)
		}, H = function(t, e) {
			var i;
			for (i in e) void 0 === t[i] && (t[i] = e[i]);
			return t
		}, V = function() {
			return null != window.pageYOffset ? window.pageYOffset : null != g.scrollTop ? g.scrollTop : v.scrollTop || g.body.scrollTop || 0
		}, j = function() {
			return null != window.pageXOffset ? window.pageXOffset : null != g.scrollLeft ? g.scrollLeft : v.scrollLeft || g.body.scrollLeft || 0
		}, q = function(t, e) {
			Me(t, "scroll", e), G(t.parentNode) || q(t.parentNode, e)
		}, U = function(t, e) {
			Le(t, "scroll", e), G(t.parentNode) || U(t.parentNode, e)
		}, G = function(t) {
			return !(t && t !== v && t !== g && t !== g.body && t !== window && t.nodeType && t.parentNode)
		}, Z = function(t, e) {
			var i = "x" === e ? "Width" : "Height",
				n = "scroll" + i,
				r = "client" + i,
				s = g.body;
			return Math.max(0, G(t) ? Math.max(v[n], s[n]) - (window["inner" + i] || v[r] || s[r]) : t[n] - t[r])
		}, $ = function(t) {
			var e = G(t),
				i = Z(t, "x"),
				n = Z(t, "y");
			e ? t = N : $(t.parentNode), t._gsMaxScrollX = i, t._gsMaxScrollY = n, t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0
		}, Q = function(t, e) {
			return t = t || window.event, _.pageX = t.clientX + g.body.scrollLeft + v.scrollLeft, _.pageY = t.clientY + g.body.scrollTop + v.scrollTop, e && (t.returnValue = !1), _
		}, K = function(t) {
			return t ? ("string" == typeof t && (t = e.selector(t)), t.length && t !== window && t[0] && t[0].style && !t.nodeType && (t = t[0]), t === window || t.nodeType && t.style ? t : null) : t
		}, J = function(t, e) {
			var i, r, s, o = t.style;
			if (void 0 === o[e]) {
				for (s = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5, i = e.charAt(0).toUpperCase() + e.substr(1); --r > -1 && void 0 === o[s[r] + i];);
				if (0 > r) return "";
				n = 3 === r ? "ms" : s[r], e = n + i
			}
			return e
		}, te = function(t, e, i) {
			var n = t.style;
			n && (void 0 === n[e] && (e = J(t, e)), null == i ? n.removeProperty ? n.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : n.removeAttribute(e) : void 0 !== n[e] && (n[e] = i))
		}, ee = g.defaultView ? g.defaultView.getComputedStyle : T, ie = /(?:Left|Right|Width)/i, ne = /(?:\d|\-|\+|=|#|\.)*/g, re = function(t, e, i, n, r) {
			if ("px" === n || !n) return i;
			if ("auto" === n || !i) return 0;
			var s, o = ie.test(e),
				a = t,
				l = x.style,
				h = 0 > i;
			return h && (i = -i), "%" === n && -1 !== e.indexOf("border") ? s = i / 100 * (o ? t.clientWidth : t.clientHeight) : (l.cssText = "border:0 solid red;position:" + oe(t, "position", !0) + ";line-height:0;", "%" !== n && a.appendChild ? l[o ? "borderLeftWidth" : "borderTopWidth"] = i + n : (a = t.parentNode || g.body, l[o ? "width" : "height"] = i + n), a.appendChild(x), s = parseFloat(x[o ? "offsetWidth" : "offsetHeight"]), a.removeChild(x), 0 !== s || r || (s = re(t, e, i, n, !0))), h ? -s : s
		}, se = function(t, e) {
			if ("absolute" !== oe(t, "position", !0)) return 0;
			var i = "left" === e ? "Left" : "Top",
				n = oe(t, "margin" + i, !0);
			return t["offset" + i] - (re(t, e, parseFloat(n), (n + "").replace(ne, "")) || 0)
		}, oe = function(t, e, i) {
			var n, r = (t._gsTransform || {})[e];
			return r || 0 === r ? r : (t.style[e] ? r = t.style[e] : (n = ee(t)) ? (r = n.getPropertyValue(e.replace(/([A-Z])/g, "-$1").toLowerCase()), r = r || n.length ? r : n[e]) : t.currentStyle && (r = t.currentStyle[e]), "auto" !== r || "top" !== e && "left" !== e || (r = se(t, e)), i ? r : parseFloat(r) || 0)
		}, ae = function(t, e, i) {
			var n = t.vars,
				r = n[i],
				s = t._listeners[e];
			"function" == typeof r && r.apply(n[i + "Scope"] || n.callbackScope || t, n[i + "Params"] || [t.pointerEvent]), s && t.dispatchEvent(e)
		}, le = function(t, e) {
			var i, n, r, s = K(t);
			return s ? Oe(s, e) : void 0 !== t.left ? (r = Te(e), {
				left: t.left - r.x,
				top: t.top - r.y,
				width: t.width,
				height: t.height
			}) : (n = t.min || t.minX || t.minRotation || 0, i = t.min || t.minY || 0, {
				left: n,
				top: i,
				width: (t.max || t.maxX || t.maxRotation || 0) - n,
				height: (t.max || t.maxY || 0) - i
			})
		}, he = function() {
			if (!g.createElementNS) return o = 0, void(a = !1);
			var t, e, i, n, r = y("div"),
				s = g.createElementNS("http://www.w3.org/2000/svg", "svg"),
				c = y("div"),
				u = r.style,
				p = g.body || v;
			g.body && pe && (u.position = c.style.position = "absolute", p.appendChild(c), c.appendChild(r), u.height = "10px", n = r.offsetTop, c.style.border = "5px solid red", h = n !== r.offsetTop, p.removeChild(c)), u = s.style, s.setAttributeNS(null, "width", "400px"), s.setAttributeNS(null, "height", "400px"), s.setAttributeNS(null, "viewBox", "0 0 400 400"), u.display = "block", u.boxSizing = "border-box", u.border = "0px solid red", u.transform = "none", r.style.cssText = "width:100px;height:100px;overflow:scroll;-ms-overflow-style:none;", p.appendChild(r), r.appendChild(s), i = s.createSVGPoint().matrixTransform(s.getScreenCTM()), e = i.y, r.scrollTop = 100, i.x = i.y = 0, i = i.matrixTransform(s.getScreenCTM()), l = e - i.y < 100.1 ? 0 : e - i.y - 150, r.removeChild(s), p.removeChild(r), p.appendChild(s), t = s.getScreenCTM(), e = t.e, u.border = "50px solid red", t = s.getScreenCTM(), 0 === e && 0 === t.e && 0 === t.f && 1 === t.a ? (o = 1, a = !0) : (o = e !== t.e ? 1 : 0, a = 1 !== t.a), p.removeChild(s)
		}, ce = "" !== J(x, "perspective"), ue = J(x, "transformOrigin").replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(), pe = J(x, "transform"), fe = pe.replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(), de = {}, me = {}, _e = window.SVGElement, ge = function(t) {
			return !!(_e && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
		}, ve = (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)) && parseFloat(RegExp.$1) < 11, ye = [], xe = [], we = function(t) {
			if (!t.getBoundingClientRect || !t.parentNode || !pe) return {
				offsetTop: 0,
				offsetLeft: 0,
				scaleX: 1,
				scaleY: 1,
				offsetParent: v
			};
			if (He.cacheSVGData !== !1 && t._gsCache && t._gsCache.lastUpdate === e.ticker.frame) return t._gsCache;
			var i, n, r, s, h, c, u, p, f, d, m, _, y = t,
				x = be(t);
			if (x.lastUpdate = e.ticker.frame, t.getBBox && !x.isSVGRoot) {
				for (y = t.parentNode, i = t.getBBox(); y && "svg" !== (y.nodeName + "").toLowerCase();) y = y.parentNode;
				return s = we(y), x.offsetTop = i.y * s.scaleY, x.offsetLeft = i.x * s.scaleX, x.scaleX = s.scaleX, x.scaleY = s.scaleY, x.offsetParent = y || v, x
			}
			for (r = x.offsetParent, r === g.body && (r = v), xe.length = ye.length = 0; y && (h = oe(y, pe, !0), "matrix(1, 0, 0, 1, 0, 0)" !== h && "none" !== h && "translate3d(0px, 0px, 0px)" !== h && (xe.push(y), ye.push(y.style[pe]), y.style[pe] = "none"), y !== r);) y = y.parentNode;
			for (n = r.getBoundingClientRect(), h = t.getScreenCTM(), p = t.createSVGPoint(), u = p.matrixTransform(h), p.x = p.y = 10, p = p.matrixTransform(h), x.scaleX = (p.x - u.x) / 10, x.scaleY = (p.y - u.y) / 10, void 0 === o && he(), x.borderBox && !a && t.getAttribute("width") && (s = ee(t) || {}, f = parseFloat(s.borderLeftWidth) + parseFloat(s.borderRightWidth) || 0, d = parseFloat(s.borderTopWidth) + parseFloat(s.borderBottomWidth) || 0, m = parseFloat(s.width) || 0, _ = parseFloat(s.height) || 0, x.scaleX *= (m - f) / m, x.scaleY *= (_ - d) / _), l ? (i = t.getBoundingClientRect(), x.offsetLeft = i.left - n.left, x.offsetTop = i.top - n.top) : (x.offsetLeft = u.x - n.left, x.offsetTop = u.y - n.top), x.offsetParent = r, c = xe.length; --c > -1;) xe[c].style[pe] = ye[c];
			return x
		}, Te = function(t, i) {
			if (i = i || {}, !t || t === v || !t.parentNode || t === window) return {
				x: 0,
				y: 0
			};
			var n = ee(t),
				r = ue && n ? n.getPropertyValue(ue) : "50% 50%",
				s = r.split(" "),
				o = -1 !== r.indexOf("left") ? "0%" : -1 !== r.indexOf("right") ? "100%" : s[0],
				a = -1 !== r.indexOf("top") ? "0%" : -1 !== r.indexOf("bottom") ? "100%" : s[1];
			return ("center" === a || null == a) && (a = "50%"), ("center" === o || isNaN(parseFloat(o))) && (o = "50%"), t.getBBox && ge(t) ? (t._gsTransform || (e.set(t, {
				x: "+=0",
				overwrite: !1
			}), void 0 === t._gsTransform.xOrigin && console.log("Draggable requires at least GSAP 1.17.0")), r = t.getBBox(), i.x = t._gsTransform.xOrigin - r.x, i.y = t._gsTransform.yOrigin - r.y) : (t.getBBox && !t.offsetWidth && -1 !== (o + a).indexOf("%") && (t = t.getBBox(), t = {
				offsetWidth: t.width,
				offsetHeight: t.height
			}), i.x = -1 !== o.indexOf("%") ? t.offsetWidth * parseFloat(o) / 100 : parseFloat(o), i.y = -1 !== a.indexOf("%") ? t.offsetHeight * parseFloat(a) / 100 : parseFloat(a)), i
		}, be = function(t) {
			if (He.cacheSVGData !== !1 && t._gsCache && t._gsCache.lastUpdate === e.ticker.frame) return t._gsCache;
			var i, n = t._gsCache = t._gsCache || {},
				r = ee(t),
				s = t.getBBox && ge(t),
				o = "svg" === (t.nodeName + "").toLowerCase();
			if (n.isSVG = s, n.isSVGRoot = o, n.borderBox = "border-box" === r.boxSizing, n.computedStyle = r, o)(n.offsetParent = t.offsetParent) || (i = t.parentNode || v, i.insertBefore(x, t), n.offsetParent = x.offsetParent || v, i.removeChild(x));
			else if (s) {
				for (i = t.parentNode; i && "svg" !== (i.nodeName + "").toLowerCase();) i = i.parentNode;
				n.offsetParent = i
			}
			return n
		}, Pe = function(t, e, i, n) {
			if (t === window || !t || !t.style || !t.parentNode) return [1, 0, 0, 1, 0, 0];
			var r, s, a, l, c, u, p, f, d, m, _, y, x, w, T = t._gsCache || be(t),
				b = t.parentNode,
				P = b._gsCache || be(b),
				k = T.computedStyle,
				S = T.isSVG ? P.offsetParent : b.offsetParent;
			return r = T.isSVG && -1 !== (t.style[pe] + "").indexOf("matrix") ? t.style[pe] : k ? k.getPropertyValue(fe) : t.currentStyle ? t.currentStyle[pe] : "1,0,0,1,0,0", t.getBBox && -1 !== (t.getAttribute("transform") + "").indexOf("matrix") && (r = t.getAttribute("transform")), r = (r + "").match(/(?:\-|\b)[\d\-\.e]+\b/g) || [1, 0, 0, 1, 0, 0], r.length > 6 && (r = [r[0], r[1], r[4], r[5], r[12], r[13]]), n ? r[4] = r[5] = 0 : T.isSVG && (c = t._gsTransform) && (c.xOrigin || c.yOrigin) && (r[0] = parseFloat(r[0]), r[1] = parseFloat(r[1]), r[2] = parseFloat(r[2]), r[3] = parseFloat(r[3]), r[4] = parseFloat(r[4]) - (c.xOrigin - (c.xOrigin * r[0] + c.yOrigin * r[2])), r[5] = parseFloat(r[5]) - (c.yOrigin - (c.xOrigin * r[1] + c.yOrigin * r[3]))), e && (void 0 === o && he(), a = T.isSVG || T.isSVGRoot ? we(t) : t, T.isSVG ? (l = t.getBBox(), m = P.isSVGRoot ? {
				x: 0,
				y: 0
			} : b.getBBox(), a = {
				offsetLeft: l.x - m.x,
				offsetTop: l.y - m.y,
				offsetParent: T.offsetParent
			}) : T.isSVGRoot ? (_ = parseInt(k.borderTopWidth, 10) || 0, y = parseInt(k.borderLeftWidth, 10) || 0, x = (r[0] - o) * y + r[2] * _, w = r[1] * y + (r[3] - o) * _, u = e.x, p = e.y, f = u - (u * r[0] + p * r[2]), d = p - (u * r[1] + p * r[3]), r[4] = parseFloat(r[4]) + f, r[5] = parseFloat(r[5]) + d, e.x -= f, e.y -= d, u = a.scaleX, p = a.scaleY, e.x *= u, e.y *= p, r[0] *= u, r[1] *= p, r[2] *= u, r[3] *= p, ve || (e.x += x, e.y += w)) : !h && t.offsetParent && (e.x += parseInt(oe(t.offsetParent, "borderLeftWidth"), 10) || 0, e.y += parseInt(oe(t.offsetParent, "borderTopWidth"), 10) || 0), s = b === v || b === g.body, r[4] = Number(r[4]) + e.x + (a.offsetLeft || 0) - i.x - (s ? 0 : b.scrollLeft || 0), r[5] = Number(r[5]) + e.y + (a.offsetTop || 0) - i.y - (s ? 0 : b.scrollTop || 0), b && "fixed" === oe(t, "position", k) && (r[4] += j(), r[5] += V()), b && b !== v && S === a.offsetParent && (r[4] -= b.offsetLeft || 0, r[5] -= b.offsetTop || 0, h || !b.offsetParent || T.isSVG || T.isSVGRoot || (r[4] -= parseInt(oe(b.offsetParent, "borderLeftWidth"), 10) || 0, r[5] -= parseInt(oe(b.offsetParent, "borderTopWidth"), 10) || 0))), r
		}, ke = function(t, e) {
			if (!t || t === window || !t.parentNode) return [1, 0, 0, 1, 0, 0];
			for (var i, n, r, s, o, a, l, h, c = Te(t, de), u = Te(t.parentNode, me), p = Pe(t, c, u);
			(t = t.parentNode) && t.parentNode && t !== v;) c = u, u = Te(t.parentNode, c === de ? me : de), l = Pe(t, c, u), i = p[0], n = p[1], r = p[2], s = p[3], o = p[4], a = p[5], p[0] = i * l[0] + n * l[2], p[1] = i * l[1] + n * l[3], p[2] = r * l[0] + s * l[2], p[3] = r * l[1] + s * l[3], p[4] = o * l[0] + a * l[2] + l[4], p[5] = o * l[1] + a * l[3] + l[5];
			return e && (i = p[0], n = p[1], r = p[2], s = p[3], o = p[4], a = p[5], h = i * s - n * r, p[0] = s / h, p[1] = -n / h, p[2] = -r / h, p[3] = i / h, p[4] = (r * a - s * o) / h, p[5] = -(i * a - n * o) / h), p
		}, Se = function(t, e, i, n, r) {
			t = K(t);
			var s = ke(t, !1, r),
				o = e.x,
				a = e.y;
			return i && (Te(t, e), o -= e.x, a -= e.y), n = n === !0 ? e : n || {}, n.x = o * s[0] + a * s[2] + s[4], n.y = o * s[1] + a * s[3] + s[5], n
		}, Ce = function(t, e, i) {
			var n = t.x * e[0] + t.y * e[2] + e[4],
				r = t.x * e[1] + t.y * e[3] + e[5];
			return t.x = n * i[0] + r * i[2] + i[4], t.y = n * i[1] + r * i[3] + i[5], t
		}, Oe = function(t, e, i) {
			if (!(t = K(t))) return null;
			e = K(e);
			var n, r, s, o, a, l, h, c, u, p, f, d, m, _, y, x, w, T, b, P, k, C, O = t.getBBox && ge(t);
			if (t === window) o = V(), r = j(), s = r + (v.clientWidth || t.innerWidth || g.body.clientWidth || 0), a = o + ((t.innerHeight || 0) - 20 < v.clientHeight ? v.clientHeight : t.innerHeight || g.body.clientHeight || 0);
			else {
				if (void 0 === e || e === window) return t.getBoundingClientRect();
				n = Te(t), r = -n.x, o = -n.y, O ? (d = t.getBBox(), m = d.width, _ = d.height) : t.offsetWidth ? (m = t.offsetWidth, _ = t.offsetHeight) : (k = ee(t), m = parseFloat(k.width), _ = parseFloat(k.height)), s = r + m, a = o + _, "svg" !== t.nodeName.toLowerCase() || S || (y = we(t), C = y.computedStyle || {}, T = (t.getAttribute("viewBox") || "0 0").split(" "), b = parseFloat(T[0]), P = parseFloat(T[1]), x = parseFloat(C.borderLeftWidth) || 0, w = parseFloat(C.borderTopWidth) || 0, s -= m - (m - x) / y.scaleX - b, a -= _ - (_ - w) / y.scaleY - P, r -= x / y.scaleX - b, o -= w / y.scaleY - P, k && (s += (parseFloat(C.borderRightWidth) + x) / y.scaleX, a += (w + parseFloat(C.borderBottomWidth)) / y.scaleY))
			}
			return t === e ? {
				left: r,
				top: o,
				width: s - r,
				height: a - o
			} : (l = ke(t), h = ke(e, !0), c = Ce({
				x: r,
				y: o
			}, l, h), u = Ce({
				x: s,
				y: o
			}, l, h), p = Ce({
				x: s,
				y: a
			}, l, h), f = Ce({
				x: r,
				y: a
			}, l, h), r = Math.min(c.x, u.x, p.x, f.x), o = Math.min(c.y, u.y, p.y, f.y), I.x = I.y = 0, i && Te(e, I), {
				left: r + I.x,
				top: o + I.y,
				width: Math.max(c.x, u.x, p.x, f.x) - r,
				height: Math.max(c.y, u.y, p.y, f.y) - o
			})
		}, Ae = function(t) {
			return t && t.length && t[0] && (t[0].nodeType && t[0].style && !t.nodeType || t[0].length && t[0][0]) ? !0 : !1
		}, Ee = function(t) {
			var e, i, n, r = [],
				s = t.length;
			for (e = 0; s > e; e++) if (i = t[e], Ae(i)) for (n = i.length, n = 0; n < i.length; n++) r.push(i[n]);
			else i && 0 !== i.length && r.push(i);
			return r
		}, Re = "ontouchstart" in v && "orientation" in window, De = function(t) {
			for (var e = t.split(","), i = (void 0 !== x.onpointerdown ? "pointerdown,pointermove,pointerup,pointercancel" : void 0 !== x.onmspointerdown ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : t).split(","), n = {}, r = 8; --r > -1;) n[e[r]] = i[r], n[i[r]] = e[r];
			return n
		}("touchstart,touchmove,touchend,touchcancel"), Me = function(t, e, i, n) {
			t.addEventListener ? t.addEventListener(De[e] || e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
		}, Le = function(t, e, i) {
			t.removeEventListener ? t.removeEventListener(De[e] || e, i) : t.detachEvent && t.detachEvent("on" + e, i)
		}, Ie = function(t, e) {
			for (var i = t.length; --i > -1;) if (t[i].identifier === e) return !0;
			return !1
		}, Ne = function(t) {
			r = t.touches && D < t.touches.length, Le(t.target, "touchend", Ne)
		}, Be = function(t) {
			r = t.touches && D < t.touches.length, Me(t.target, "touchend", Ne)
		}, Fe = function(t, e, i, n, r, s) {
			var o, a, l, h = {};
			if (e) if (1 !== r && e instanceof Array) {
				for (h.end = o = [], l = e.length, a = 0; l > a; a++) o[a] = e[a] * r;
				i += 1.1, n -= 1.1
			} else h.end = "function" == typeof e ?
			function(i) {
				return e.call(t, i) * r
			} : e;
			return (i || 0 === i) && (h.max = i), (n || 0 === n) && (h.min = n), s && (h.velocity = 0), h
		}, Xe = function(t) {
			var e;
			return t && t.getAttribute && "BODY" !== t.nodeName ? "true" === (e = t.getAttribute("data-clickable")) || "false" !== e && (t.onclick || R.test(t.nodeName + "") || "true" === t.getAttribute("contentEditable")) ? !0 : Xe(t.parentNode) : !1
		}, We = function(t, e) {
			for (var i, n = t.length; --n > -1;) i = t[n], i.ondragstart = i.onselectstart = e ? null : T, te(i, "userSelect", e ? "text" : "none")
		}, Ye = function() {
			var t, e = g.createElement("div"),
				i = g.createElement("div"),
				n = i.style,
				r = g.body || x;
			return n.display = "inline-block", n.position = "relative", e.style.cssText = i.innerHTML = "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden", e.appendChild(i), r.appendChild(e), c = i.offsetHeight + 18 > e.scrollHeight, n.width = "100%", pe || (n.paddingRight = "500px", t = e.scrollLeft = e.scrollWidth - e.clientWidth, n.left = "-90px", t = t !== e.scrollLeft), r.removeChild(e), t
		}(), ze = function(t, i) {
			t = K(t), i = i || {};
			var n, r, s, o, a, l, h = g.createElement("div"),
				u = h.style,
				p = t.firstChild,
				f = 0,
				d = 0,
				m = t.scrollTop,
				_ = t.scrollLeft,
				v = t.scrollWidth,
				y = t.scrollHeight,
				x = 0,
				w = 0,
				T = 0;
			ce && i.force3D !== !1 ? (a = "translate3d(", l = "px,0px)") : pe && (a = "translate(", l = "px)"), this.scrollTop = function(t, e) {
				return arguments.length ? void this.top(-t, e) : -this.top()
			}, 
			this.scrollLeft = function(t, e) {
				return arguments.length ? void this.left(-t, e) : -this.left()
			},
			this.left = function(n, r) {
				if (!arguments.length) return -(t.scrollLeft + d);
				var s = t.scrollLeft - _,
					o = d;
				return (s > 2 || -2 > s) && !r ? (_ = t.scrollLeft, e.killTweensOf(this, !0, {
					left: 1,
					scrollLeft: 1
				}), this.left(-_), void(i.onKill && i.onKill())) : (n = -n, 0 > n ? (d = n - .5 | 0, n = 0) : n > w ? (d = n - w | 0, n = w) : d = 0, (d || o) && (a ? this._suspendTransforms || (u[pe] = a + -d + "px," + -f + l) : u.left = -d + "px", Ye && d + x >= 0 && (u.paddingRight = d + x + "px")), t.scrollLeft = 0 | n, void(_ = t.scrollLeft))
			}, 
			this.top = function(n, r) {
				if (!arguments.length) return -(t.scrollTop + f);
				var s = t.scrollTop - m,
					o = f;
				return (s > 2 || -2 > s) && !r ? (m = t.scrollTop, e.killTweensOf(this, !0, {
					top: 1,
					scrollTop: 1
				}), this.top(-m), void(i.onKill && i.onKill())) : (n = -n, 0 > n ? (f = n - .5 | 0, n = 0) : n > T ? (f = n - T | 0, n = T) : f = 0, (f || o) && (a ? this._suspendTransforms || (u[pe] = a + -d + "px," + -f + l) : u.top = -f + "px"), t.scrollTop = 0 | n, void(m = t.scrollTop))
			}, 
			this.maxScrollTop = function() {
				return T
			}, 
			this.maxScrollLeft = function() {
				return w
			}, 
			this.disable = function() {
				for (p = h.firstChild; p;) o = p.nextSibling, t.appendChild(p), p = o;
				t === h.parentNode && t.removeChild(h)
			}, 
			this.enable = function() {
				if (p = t.firstChild, p !== h) {
					for (; p;) o = p.nextSibling, h.appendChild(p), p = o;
					t.appendChild(h), this.calibrate()
				}
			}, 
			this.calibrate = function(e) {
				var i, o, a = t.clientWidth === n;
				m = t.scrollTop, _ = t.scrollLeft, (!a || t.clientHeight !== r || h.offsetHeight !== s || v !== t.scrollWidth || y !== t.scrollHeight || e) && ((f || d) && (i = this.left(), o = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), (!a || e) && (u.display = "block", u.width = "auto", u.paddingRight = "0px", x = Math.max(0, t.scrollWidth - t.clientWidth), x && (x += oe(t, "paddingLeft") + (c ? oe(t, "paddingRight") : 0))), u.display = "inline-block", u.position = "relative", u.overflow = "visible", u.verticalAlign = "top", u.width = "100%", u.paddingRight = x + "px", c && (u.paddingBottom = oe(t, "paddingBottom", !0)), S && (u.zoom = "1"), n = t.clientWidth, r = t.clientHeight, v = t.scrollWidth, y = t.scrollHeight, w = t.scrollWidth - n, T = t.scrollHeight - r, s = h.offsetHeight, u.display = "block", (i || o) && (this.left(i), this.top(o)))
			}, this.content = h, this.element = t, this._suspendTransforms = !1, this.enable()
		}, He = function(n, o) {
			t.call(this, n), n = K(n), s || (s = m.com.greensock.plugins.ThrowPropsPlugin), this.vars = o = F(o || {}), this.target = n, this.x = this.y = this.rotation = 0, this.dragResistance = parseFloat(o.dragResistance) || 0, this.edgeResistance = isNaN(o.edgeResistance) ? 1 : parseFloat(o.edgeResistance) || 0, this.lockAxis = o.lockAxis, this.autoScroll = o.autoScroll || 0, this.lockedAxis = null, this.allowEventDefault = !! o.allowEventDefault;
			var a, l, h, c, _, y, x, T, O, R, I, X, z, V, j, Z, J, ee, ie, ne, re, se, he, ce, ue, pe, fe, de, me, _e, ge, ve, ye, xe = (o.type || (S ? "top,left" : "x,y")).toLowerCase(),
				we = -1 !== xe.indexOf("x") || -1 !== xe.indexOf("y"),
				Te = -1 !== xe.indexOf("rotation"),
				be = Te ? "rotation" : we ? "x" : "left",
				Pe = we ? "y" : "top",
				Ce = -1 !== xe.indexOf("x") || -1 !== xe.indexOf("left") || "scroll" === xe,
				Oe = -1 !== xe.indexOf("y") || -1 !== xe.indexOf("top") || "scroll" === xe,
				Ae = o.minimumMovement || 2,
				Ee = this,
				Ne = B(o.trigger || o.handle || n),
				Ye = {},
				Ve = 0,
				je = !1,
				qe = o.clickableTest || Xe,
				Ge = function(t) {
					if (Ee.autoScroll && (je || Ee.isDragging && ee)) {
						var e, i, r, s, o, a, h, c, u = n,
							p = 15 * Ee.autoScroll;
						for (je = !1, N.scrollTop = null != window.pageYOffset ? window.pageYOffset : null != v.scrollTop ? v.scrollTop : g.body.scrollTop, N.scrollLeft = null != window.pageXOffset ? window.pageXOffset : null != v.scrollLeft ? v.scrollLeft : g.body.scrollLeft, s = Ee.pointerX - N.scrollLeft, o = Ee.pointerY - N.scrollTop; u && !i;) i = G(u.parentNode), e = i ? N : u.parentNode, r = i ? {
							bottom: Math.max(v.clientHeight, window.innerHeight || 0),
							right: Math.max(v.clientWidth, window.innerWidth || 0),
							left: 0,
							top: 0
						} : e.getBoundingClientRect(), a = h = 0, Oe && (c = e._gsMaxScrollY - e.scrollTop, 0 > c ? h = c : o > r.bottom - 40 && c ? (je = !0, h = Math.min(c, p * (1 - Math.max(0, r.bottom - o) / 40) | 0)) : o < r.top + 40 && e.scrollTop && (je = !0, h = -Math.min(e.scrollTop, p * (1 - Math.max(0, o - r.top) / 40) | 0)), h && (e.scrollTop += h)), Ce && (c = e._gsMaxScrollX - e.scrollLeft, 0 > c ? a = c : s > r.right - 40 && c ? (je = !0, a = Math.min(c, p * (1 - Math.max(0, r.right - s) / 40) | 0)) : s < r.left + 40 && e.scrollLeft && (je = !0, a = -Math.min(e.scrollLeft, p * (1 - Math.max(0, s - r.left) / 40) | 0)), a && (e.scrollLeft += a)), i && (a || h) && (window.scrollTo(e.scrollLeft, e.scrollTop), oi(Ee.pointerX + a, Ee.pointerY + h)), u = e
					}
					if (ee) {
						var f = Ee.x,
							d = Ee.y,
							m = 1e-6;
						m > f && f > -m && (f = 0), m > d && d > -m && (d = 0), Te ? (me.data.rotation = Ee.rotation = f, me.setRatio(1)) : l ? (Oe && l.top(d), Ce && l.left(f)) : we ? (Oe && (me.data.y = d), Ce && (me.data.x = f), me.setRatio(1)) : (Oe && (n.style.top = d + "px"), Ce && (n.style.left = f + "px")), !T || t || ve || (ve = !0, ae(Ee, "drag", "onDrag"), ve = !1)
					}
					ee = !1
				},
				Ze = function(t, i) {
					var r, s = Ee.x,
						o = Ee.y;
					n._gsTransform || !we && !Te || e.set(n, {
						x: "+=0",
						overwrite: !1
					}), we ? (Ee.y = n._gsTransform.y, Ee.x = n._gsTransform.x) : Te ? Ee.x = Ee.rotation = n._gsTransform.rotation : l ? (Ee.y = l.top(), Ee.x = l.left()) : (Ee.y = parseInt(n.style.top, 10) || 0, Ee.x = parseInt(n.style.left, 10) || 0), !ne && !re || i || (ne && (r = ne(Ee.x), r !== Ee.x && (Ee.x = r, Te && (Ee.rotation = r))), re && (r = re(Ee.y), r !== Ee.y && (Ee.y = r))), (s !== Ee.x || o !== Ee.y) && Ge(!0), t || ae(Ee, "throwupdate", "onThrowUpdate")
				},
				$e = function() {
					var t, e, i, r;
					x = !1, l ? (l.calibrate(), Ee.minX = R = -l.maxScrollLeft(), Ee.minY = X = -l.maxScrollTop(), Ee.maxX = O = Ee.maxY = I = 0, x = !0) : o.bounds && (t = le(o.bounds, n.parentNode), Te ? (Ee.minX = R = t.left, Ee.maxX = O = t.left + t.width, Ee.minY = X = Ee.maxY = I = 0) : void 0 !== o.bounds.maxX || void 0 !== o.bounds.maxY ? (t = o.bounds, Ee.minX = R = t.minX, Ee.minY = X = t.minY, Ee.maxX = O = t.maxX, Ee.maxY = I = t.maxY) : (e = le(n, n.parentNode), Ee.minX = R = oe(n, be) + t.left - e.left, Ee.minY = X = oe(n, Pe) + t.top - e.top, Ee.maxX = O = R + (t.width - e.width), Ee.maxY = I = X + (t.height - e.height)), R > O && (Ee.minX = O, Ee.maxX = O = R, R = Ee.minX), X > I && (Ee.minY = I, Ee.maxY = I = X, X = Ee.minY), Te && (Ee.minRotation = R, Ee.maxRotation = O), x = !0), o.liveSnap && (i = o.liveSnap === !0 ? o.snap || {} : o.liveSnap, r = i instanceof Array || "function" == typeof i, Te ? (ne = ni(r ? i : i.rotation, R, O, 1), re = null) : (Ce && (ne = ni(r ? i : i.x || i.left || i.scrollLeft, R, O, l ? -1 : 1)), Oe && (re = ni(r ? i : i.y || i.top || i.scrollTop, X, I, l ? -1 : 1))))
				},
				Qe = function() {
					Ee.isThrowing = !1, ae(Ee, "throwcomplete", "onThrowComplete")
				},
				Ke = function() {
					Ee.isThrowing = !1
				},
				Je = function(t, e) {
					var i, r, a, h;
					t && s ? (t === !0 && (i = o.snap || {}, r = i instanceof Array || "function" == typeof i, t = {
						resistance: (o.throwResistance || o.resistance || 1e3) / (Te ? 10 : 1)
					}, Te ? t.rotation = Fe(Ee, r ? i : i.rotation, O, R, 1, e) : (Ce && (t[be] = Fe(Ee, r ? i : i.x || i.left || i.scrollLeft, O, R, l ? -1 : 1, e || "x" === Ee.lockedAxis)), Oe && (t[Pe] = Fe(Ee, r ? i : i.y || i.top || i.scrollTop, I, X, l ? -1 : 1, e || "y" === Ee.lockedAxis)))), Ee.isThrowing = !0, h = isNaN(o.overshootTolerance) ? 1 === o.edgeResistance ? 0 : 1 - Ee.edgeResistance + .2 : o.overshootTolerance, Ee.tween = a = s.to(l || n, {
						throwProps: t,
						ease: o.ease || m.Power3.easeOut,
						onComplete: Qe,
						onOverwrite: Ke,
						onUpdate: o.fastMode ? ae : Ze,
						onUpdateParams: o.fastMode ? [Ee, "onthrowupdate", "onThrowUpdate"] : w
					}, isNaN(o.maxDuration) ? 2 : o.maxDuration, isNaN(o.minDuration) ? 0 === h ? 0 : .5 : o.minDuration, h), o.fastMode || (l && (l._suspendTransforms = !0), a.render(a.duration(), !0, !0), Ze(!0, !0), Ee.endX = Ee.x, Ee.endY = Ee.y, Te && (Ee.endRotation = Ee.x), a.play(0), Ze(!0, !0), l && (l._suspendTransforms = !1))) : x && Ee.applyBounds()
				},
				ti = function() {
					var t, e, i, r, s, o, a, l, u, p = ce || [1, 0, 0, 1, 0, 0];
					ce = ke(n.parentNode, !0), Ee.isPressed && p.join(",") !== ce.join(",") && (t = p[0], e = p[1], i = p[2], r = p[3], s = p[4], o = p[5], a = t * r - e * i, l = h * (r / a) + c * (-i / a) + (i * o - r * s) / a, u = h * (-e / a) + c * (t / a) + -(t * o - e * s) / a, c = l * ce[1] + u * ce[3] + ce[5], h = l * ce[0] + u * ce[2] + ce[4]), ce[1] || ce[2] || 1 != ce[0] || 1 != ce[3] || 0 != ce[4] || 0 != ce[5] || (ce = null)
				},
				ei = function() {
					var t = 1 - Ee.edgeResistance;
					ti(), l ? ($e(), y = l.top(), _ = l.left()) : (ii() ? (Ze(!0, !0), $e()) : Ee.applyBounds(), Te ? (J = Se(n, {
						x: 0,
						y: 0
					}), Ze(!0, !0), _ = Ee.x, y = Ee.y = Math.atan2(J.y - c, h - J.x) * b) : (fe = n.parentNode ? n.parentNode.scrollTop || 0 : 0, de = n.parentNode ? n.parentNode.scrollLeft || 0 : 0, y = oe(n, Pe), _ = oe(n, be))), x && t && (_ > O ? _ = O + (_ - O) / t : R > _ && (_ = R - (R - _) / t), Te || (y > I ? y = I + (y - I) / t : X > y && (y = X - (X - y) / t)))
				},
				ii = function() {
					return Ee.tween && Ee.tween.isActive()
				},
				ni = function(t, e, i, n) {
					return "function" == typeof t ?
					function(r) {
						var s = Ee.isPressed ? 1 - Ee.edgeResistance : 1;
						return t.call(Ee, r > i ? i + (r - i) * s : e > r ? e + (r - e) * s : r) * n
					} : t instanceof Array ?
					function(n) {
						for (var r, s, o = t.length, a = 0, l = P; --o > -1;) r = t[o], s = r - n, 0 > s && (s = -s), l > s && r >= e && i >= r && (a = o, l = s);
						return t[a]
					} : isNaN(t) ?
					function(t) {
						return t
					} : function() {
						return t * n
					}
				},
				ri = function(t) {
					var i, r;
					if (a && !Ee.isPressed && t && !("mousedown" === t.type && k() - pe < 30 && De[Ee.pointerEvent.type])) {
						if (ue = ii(), Ee.pointerEvent = t, De[t.type] ? (he = -1 !== t.type.indexOf("touch") ? t.currentTarget || t.target : g, Me(he, "touchend", ai), Me(he, "touchmove", si), Me(he, "touchcancel", ai), Me(g, "touchstart", Be)) : (he = null, Me(g, "mousemove", si)), ge = null, Me(g, "mouseup", ai), t && t.target && Me(t.target, "mouseup", ai), se = qe.call(Ee, t.target) && !o.dragClickables) return Me(t.target, "change", ai), ae(Ee, "press", "onPress"), void We(Ne, !0);
						if (_e = !he || Ce === Oe || l || Ee.vars.allowNativeTouchScrolling === !1 ? !1 : Ce ? "y" : "x", S ? t = Q(t, !0) : _e || Ee.allowEventDefault || (t.preventDefault(), t.preventManipulation && t.preventManipulation()), t.changedTouches ? (t = j = t.changedTouches[0], Z = t.identifier) : t.pointerId ? Z = t.pointerId : j = Z = null, D++, W(Ge), c = Ee.pointerY = t.pageY, h = Ee.pointerX = t.pageX, (_e || Ee.autoScroll) && $(n.parentNode), !Ee.autoScroll || Te || l || !n.parentNode || n.getBBox || !n.parentNode._gsMaxScrollX || C.parentNode || (C.style.width = n.parentNode.scrollWidth + "px", n.parentNode.appendChild(C)), ei(), ce && (i = h * ce[0] + c * ce[2] + ce[4], c = h * ce[1] + c * ce[3] + ce[5], h = i), Ee.tween && Ee.tween.kill(), Ee.isThrowing = !1, e.killTweensOf(l || n, !0, Ye), l && e.killTweensOf(n, !0, {
							scrollTo: 1
						}), Ee.tween = Ee.lockedAxis = null, (o.zIndexBoost || !Te && !l && o.zIndexBoost !== !1) && (n.style.zIndex = He.zIndex++), Ee.isPressed = !0, T = !(!o.onDrag && !Ee._listeners.drag), !Te) for (r = Ne.length; --r > -1;) te(Ne[r], "cursor", o.cursor || "move");
						ae(Ee, "press", "onPress")
					}
				},
				si = function(t) {
					var e, i, n, s, o = t;
					if (a && !r && Ee.isPressed && t) {
						if (Ee.pointerEvent = t, e = t.changedTouches) {
							if (t = e[0], t !== j && t.identifier !== Z) {
								for (s = e.length; --s > -1 && (t = e[s]).identifier !== Z;);
								if (0 > s) return
							}
						} else if (t.pointerId && Z && t.pointerId !== Z) return;
						if (S) t = Q(t, !0);
						else {
							if (he && _e && !ge && (i = t.pageX, n = t.pageY, ce && (s = i * ce[0] + n * ce[2] + ce[4], n = i * ce[1] + n * ce[3] + ce[5], i = s), ge = Math.abs(i - h) > Math.abs(n - c) && Ce ? "x" : "y", Ee.vars.lockAxisOnTouchScroll !== !1 && (Ee.lockedAxis = "x" === ge ? "y" : "x", "function" == typeof Ee.vars.onLockAxis && Ee.vars.onLockAxis.call(Ee, o)), M && _e === ge)) return void ai(o);
							Ee.allowEventDefault || _e && (!ge || _e === ge) || o.cancelable === !1 || (o.preventDefault(), o.preventManipulation && o.preventManipulation())
						}
						Ee.autoScroll && (je = !0), oi(t.pageX, t.pageY)
					}
				},
				oi = function(t, e) {
					var i, n, r, s, o, a, l = 1 - Ee.dragResistance,
						u = 1 - Ee.edgeResistance;
					Ee.pointerX = t, Ee.pointerY = e, Te ? (s = Math.atan2(J.y - e, t - J.x) * b, o = Ee.y - s, Ee.y = s, o > 180 ? y -= 360 : -180 > o && (y += 360), r = _ + (y - s) * l) : (ce && (a = t * ce[0] + e * ce[2] + ce[4], e = t * ce[1] + e * ce[3] + ce[5], t = a), n = e - c, i = t - h, Ae > n && n > -Ae && (n = 0), Ae > i && i > -Ae && (i = 0), (Ee.lockAxis || Ee.lockedAxis) && (i || n) && (a = Ee.lockedAxis, a || (Ee.lockedAxis = a = Ce && Math.abs(i) > Math.abs(n) ? "y" : Oe ? "x" : null, a && "function" == typeof Ee.vars.onLockAxis && Ee.vars.onLockAxis.call(Ee, Ee.pointerEvent)), "y" === a ? n = 0 : "x" === a && (i = 0)), r = _ + i * l, s = y + n * l), ne || re ? (ne && (r = ne(r)), re && (s = re(s))) : x && (r > O ? r = O + (r - O) * u : R > r && (r = R + (r - R) * u), Te || (s > I ? s = I + (s - I) * u : X > s && (s = X + (s - X) * u))), Te || (r = Math.round(r), s = Math.round(s)), (Ee.x !== r || Ee.y !== s && !Te) && (Te ? Ee.endRotation = Ee.x = Ee.endX = r : (Oe && (Ee.y = Ee.endY = s), Ce && (Ee.x = Ee.endX = r)), ee = !0, !Ee.isDragging && Ee.isPressed && (Ee.isDragging = !0, ae(Ee, "dragstart", "onDragStart")))
				},
				ai = function(t, i) {
					if (a && Ee.isPressed && (!t || null == Z || i || !(t.pointerId && t.pointerId !== Z || t.changedTouches && !Ie(t.changedTouches, Z)))) {
						Ee.isPressed = !1;
						var r, s, l, h, c = t,
							u = Ee.isDragging;
						if (he ? (Le(he, "touchend", ai), Le(he, "touchmove", si), Le(he, "touchcancel", ai), Le(g, "touchstart", Be)) : Le(g, "mousemove", si), Le(g, "mouseup", ai), t && t.target && Le(t.target, "mouseup", ai), ee = !1, C.parentNode && C.parentNode.removeChild(C), se) return t && Le(t.target, "change", ai), We(Ne, !1), ae(Ee, "release", "onRelease"), ae(Ee, "click", "onClick"), void(se = !1);
						if (Y(Ge), !Te) for (s = Ne.length; --s > -1;) te(Ne[s], "cursor", o.cursor || "move");
						if (u && (Ve = L = k(), Ee.isDragging = !1), D--, t) {
							if (S && (t = Q(t, !1)), r = t.changedTouches, r && (t = r[0], t !== j && t.identifier !== Z)) {
								for (s = r.length; --s > -1 && (t = r[s]).identifier !== Z;);
								if (0 > s) return
							}
							Ee.pointerEvent = c, Ee.pointerX = t.pageX, Ee.pointerY = t.pageY
						}
						return c && !u ? (ue && (o.snap || o.bounds) && Je(o.throwProps), ae(Ee, "release", "onRelease"), M && "touchmove" === c.type || (ae(Ee, "click", "onClick"), h = c.target || c.srcElement || n, pe = k(), e.delayedCall(1e-5, function() {
							pe !== ye && Ee.enabled() && !Ee.isPressed && (h.click ? h.click() : g.createEvent && (l = g.createEvent("MouseEvents"), l.initMouseEvent("click", !0, !0, window, 1, Ee.pointerEvent.screenX, Ee.pointerEvent.screenY, Ee.pointerX, Ee.pointerY, !1, !1, !1, !1, 0, null), h.dispatchEvent(l)))
						}))) : (Je(o.throwProps), S || Ee.allowEventDefault || !c || !o.dragClickables && qe.call(Ee, c.target) || !u || _e && (!ge || _e !== ge) || c.cancelable === !1 || (c.preventDefault(), c.preventManipulation && c.preventManipulation()), ae(Ee, "release", "onRelease")), u && ae(Ee, "dragend", "onDragEnd"), !0
					}
				},
				li = function(t) {
					if (t && Ee.isDragging) {
						var e = t.target || t.srcElement || n.parentNode,
							i = e.scrollLeft - e._gsScrollX,
							r = e.scrollTop - e._gsScrollY;
						(i || r) && (h -= i, c -= r, e._gsScrollX += i, e._gsScrollY += r, oi(Ee.pointerX, Ee.pointerY))
					}
				},
				hi = function(t) {
					var e = k(),
						i = 40 > e - pe,
						n = 40 > e - Ve;
					return i && ye !== pe ? void(ye = pe) : void((Ee.isPressed || n || i) && (t.preventDefault ? (t.preventDefault(), (i || n && Ee.vars.suppressClickOnDrag !== !1) && t.stopImmediatePropagation()) : t.returnValue = !1, t.preventManipulation && t.preventManipulation()))
				};
			ie = He.get(this.target), ie && ie.kill(), this.startDrag = function(t) {
				ri(t), Ee.isDragging || (Ee.isDragging = !0, ae(Ee, "dragstart", "onDragStart"))
			}, 
			this.drag = si, this.endDrag = function(t) {
				ai(t, !0)
			}, 
			this.timeSinceDrag = function() {
				return Ee.isDragging ? 0 : (k() - Ve) / 1e3
			}, 
			this.hitTest = function(t, e) {
				return He.hitTest(Ee.target, t, e)
			}, 
			this.getDirection = function(t, e) {
				var i, n, r, o, a, l, h = "velocity" === t && s ? t : "object" != typeof t || Te ? "start" : "element";
				return "element" === h && (a = Ue(Ee.target), l = Ue(t)), i = "start" === h ? Ee.x - _ : "velocity" === h ? s.getVelocity(this.target, be) : a.left + a.width / 2 - (l.left + l.width / 2), Te ? 0 > i ? "counter-clockwise" : "clockwise" : (e = e || 2, n = "start" === h ? Ee.y - y : "velocity" === h ? s.getVelocity(this.target, Pe) : a.top + a.height / 2 - (l.top + l.height / 2), r = Math.abs(i / n), o = 1 / e > r ? "" : 0 > i ? "left" : "right", e > r && ("" !== o && (o += "-"), o += 0 > n ? "up" : "down"), o)
			}, 
			this.applyBounds = function(t) {
				var e, i, n;
				return t && o.bounds !== t ? (o.bounds = t, Ee.update(!0)) : (Ze(!0), $e(), x && (e = Ee.x, i = Ee.y, x && (e > O ? e = O : R > e && (e = R), i > I ? i = I : X > i && (i = X)), (Ee.x !== e || Ee.y !== i) && (n = !0, Ee.x = Ee.endX = e, Te ? Ee.endRotation = e : Ee.y = Ee.endY = i, ee = !0, Ge()), Ee.isThrowing && (n || Ee.endX > O || Ee.endX < R || Ee.endY > I || Ee.endY < X) && Je(o.throwProps, n)), Ee)
			}, 
			this.update = function(t, e) {
				var i = Ee.x,
					r = Ee.y;
				return ti(), t ? Ee.applyBounds() : (ee && e && Ge(), Ze(!0)), Ee.isPressed && (Ce && Math.abs(i - Ee.x) > .01 || Oe && Math.abs(r - Ee.y) > .01 && !Te) && ei(), Ee.autoScroll && ($(n.parentNode), je = !0, Ge()), Ee
			}, 
			this.enable = function(t) {
				var r, h, c;
				if ("soft" !== t) {
					for (h = Ne.length; --h > -1;) c = Ne[h], Me(c, "mousedown", ri), Me(c, "touchstart", ri), Me(c, "click", hi, !0), Te || te(c, "cursor", o.cursor || "move"), te(c, "touchCallout", "none"), te(c, "touchAction", Ce === Oe || l ? "none" : Ce ? "pan-y" : "pan-x");
					We(Ne, !1)
				}
				return q(Ee.target, li), a = !0, s && "soft" !== t && s.track(l || n, we ? "x,y" : Te ? "rotation" : "top,left"), l && l.enable(), n._gsDragID = r = "d" + E++, A[r] = this, l && (l.element._gsDragID = r), e.set(n, {
					x: "+=0",
					overwrite: !1
				}), me = {
					t: n,
					data: S ? V : n._gsTransform,
					tween: {},
					setRatio: S ?
					function() {
						e.set(n, z)
					} : i._internals.setTransformRatio || i._internals.set3DTransformRatio
				}, Ee.update(!0), Ee
			}, 
			this.disable = function(t) {
				var e, i, r = Ee.isDragging;
				if (!Te) for (e = Ne.length; --e > -1;) te(Ne[e], "cursor", null);
				if ("soft" !== t) {
					for (e = Ne.length; --e > -1;) i = Ne[e], te(i, "touchCallout", null), te(i, "touchAction", null), Le(i, "mousedown", ri), Le(i, "touchstart", ri), Le(i, "click", hi);
					We(Ne, !0), he && (Le(he, "touchcancel", ai), Le(he, "touchend", ai), Le(he, "touchmove", si)), Le(g, "mouseup", ai), Le(g, "mousemove", si)
				}
				return U(n, li), a = !1, s && "soft" !== t && s.untrack(l || n, we ? "x,y" : Te ? "rotation" : "top,left"), l && l.disable(), Y(Ge), Ee.isDragging = Ee.isPressed = se = !1, r && ae(Ee, "dragend", "onDragEnd"), Ee
			}, 
			this.enabled = function(t, e) {
				return arguments.length ? t ? Ee.enable(e) : Ee.disable(e) : a
			}, 
			this.kill = function() {
				return Ee.isThrowing = !1, e.killTweensOf(l || n, !0, Ye), Ee.disable(), delete A[n._gsDragID], Ee
			}, -1 !== xe.indexOf("scroll") && (l = this.scrollProxy = new ze(n, H({
				onKill: function() {
					Ee.isPressed && ai(null)
				}
			}, o)), n.style.overflowY = Oe && !Re ? "auto" : "hidden", n.style.overflowX = Ce && !Re ? "auto" : "hidden", n = l.content), o.force3D !== !1 && e.set(n, {
				force3D: !0
			}), Te ? Ye.rotation = 1 : (Ce && (Ye[be] = 1), Oe && (Ye[Pe] = 1)), Te ? (z = d, V = z.css, z.overwrite = !1) : we && (z = Ce && Oe ? u : Ce ? p : f, V = z.css, z.overwrite = !1), this.enable()
		}, Ve = He.prototype = new t;
		Ve.constructor = He, Ve.pointerX = Ve.pointerY = 0, Ve.isDragging = Ve.isPressed = !1, He.version = "0.14.3", He.zIndex = 1e3, Me(g, "touchcancel", function() {}), Me(g, "contextmenu", function() {
			var t;
			for (t in A) A[t].isPressed && A[t].endDrag()
		}), He.create = function(t, i) {
			"string" == typeof t && (t = e.selector(t));
			for (var n = t && 0 !== t.length ? Ae(t) ? Ee(t) : [t] : [], r = n.length; --r > -1;) n[r] = new He(n[r], i);
			return n
		}, He.get = function(t) {
			return A[(K(t) || {})._gsDragID]
		}, He.timeSinceDrag = function() {
			return (k() - L) / 1e3
		};
		var je = {},
			qe = function(t) {
				var e, i, n = 0,
					r = 0;
				for (t = K(t), e = t.offsetWidth, i = t.offsetHeight; t;) n += t.offsetTop, r += t.offsetLeft, t = t.offsetParent;
				return {
					top: n,
					left: r,
					width: e,
					height: i
				}
			},
			Ue = function(t, e) {
				if (t === window) return je.left = je.top = 0, je.width = je.right = v.clientWidth || t.innerWidth || g.body.clientWidth || 0, je.height = je.bottom = (t.innerHeight || 0) - 20 < v.clientHeight ? v.clientHeight : t.innerHeight || g.body.clientHeight || 0, je;
				var i = t.pageX !== e ? {
					left: t.pageX - j(),
					top: t.pageY - V(),
					right: t.pageX - j() + 1,
					bottom: t.pageY - V() + 1
				} : t.nodeType || t.left === e || t.top === e ? S ? qe(t) : K(t).getBoundingClientRect() : t;
				return i.right === e && i.width !== e ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : i.width === e && (i = {
					width: i.right - i.left,
					height: i.bottom - i.top,
					right: i.right,
					left: i.left,
					bottom: i.bottom,
					top: i.top
				}), i
			};
		return He.hitTest = function(t, e, i) {
			if (t === e) return !1;
			var n, r, s, o = Ue(t),
				a = Ue(e),
				l = a.left > o.right || a.right < o.left || a.top > o.bottom || a.bottom < o.top;
			return l || !i ? !l : (s = -1 !== (i + "").indexOf("%"), i = parseFloat(i) || 0, n = {
				left: Math.max(o.left, a.left),
				top: Math.max(o.top, a.top)
			}, n.width = Math.min(o.right, a.right) - n.left, n.height = Math.min(o.bottom, a.bottom) - n.top, n.width < 0 || n.height < 0 ? !1 : s ? (i *= .01, r = n.width * n.height, r >= o.width * o.height * i || r >= a.width * a.height * i) : n.width > i && n.height > i)
		}, C.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;", He
	}, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function(t) {
	"use strict";
	var e = function() {
			return (_gsScope.GreenSockGlobals || _gsScope)[t]
		};
	"function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), require("../plugins/CSSPlugin.js"), module.exports = e())
}("Draggable");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
	"use strict";
	_gsScope._gsDefine("plugins.ThrowPropsPlugin", ["plugins.TweenPlugin", "TweenLite", "easing.Ease", "utils.VelocityTracker"], function(t, e, i, n) {
		var r, s, o, a, l = function() {
				t.call(this, "throwProps"), this._overwriteProps.length = 0
			},
			h = 999999999999999,
			c = 1e-10,
			u = _gsScope._gsDefine.globals,
			p = !1,
			f = {
				x: 1,
				y: 1,
				z: 2,
				scale: 1,
				scaleX: 1,
				scaleY: 1,
				rotation: 1,
				rotationZ: 1,
				rotationX: 2,
				rotationY: 2,
				skewX: 1,
				skewY: 1,
				xPercent: 1,
				yPercent: 1
			},
			d = function(t, e, i, n) {
				for (var r, s, o = e.length, a = 0, l = h; --o > -1;) r = e[o], s = r - t, 0 > s && (s = -s), l > s && r >= n && i >= r && (a = o, l = s);
				return e[a]
			},
			m = function(t, e, i, n) {
				if ("auto" === t.end) return t;
				i = isNaN(i) ? h : i, n = isNaN(n) ? -h : n;
				var r = "function" == typeof t.end ? t.end(e) : t.end instanceof Array ? d(e, t.end, i, n) : Number(t.end);
				return r > i ? r = i : n > r && (r = n), {
					max: r,
					min: r,
					unitFactor: t.unitFactor
				}
			},
			_ = function(t, e, i) {
				for (var n in e) void 0 === t[n] && n !== i && (t[n] = e[n]);
				return t
			},
			g = l.calculateChange = function(t, n, r, s) {
				null == s && (s = .05);
				var o = n instanceof i ? n : n ? new i(n) : e.defaultEase;
				return r * s * t / o.getRatio(s)
			},
			v = l.calculateDuration = function(t, n, r, s, o) {
				o = o || .05;
				var a = s instanceof i ? s : s ? new i(s) : e.defaultEase;
				return Math.abs((n - t) * a.getRatio(o) / r / o)
			},
			y = l.calculateTweenDuration = function(t, r, s, o, a, h) {
				if ("string" == typeof t && (t = e.selector(t)), !t) return 0;
				null == s && (s = 10), null == o && (o = .2), null == a && (a = 1), t.length && (t = t[0] || t);
				var u, f, d, y, x, w, T, b, P, k, S = 0,
					C = 9999999999,
					O = r.throwProps || r,
					A = r.ease instanceof i ? r.ease : r.ease ? new i(r.ease) : e.defaultEase,
					E = isNaN(O.checkpoint) ? .05 : Number(O.checkpoint),
					R = isNaN(O.resistance) ? l.defaultResistance : Number(O.resistance);
				for (u in O)"resistance" !== u && "checkpoint" !== u && "preventOvershoot" !== u && (f = O[u], "object" != typeof f && (P = P || n.getByTarget(t), P && P.isTrackingProp(u) ? f = "number" == typeof f ? {
					velocity: f
				} : {
					velocity: P.getVelocity(u)
				} : (y = Number(f) || 0, d = y * R > 0 ? y / R : y / -R)), "object" == typeof f && (void 0 !== f.velocity && "number" == typeof f.velocity ? y = Number(f.velocity) || 0 : (P = P || n.getByTarget(t), y = P && P.isTrackingProp(u) ? P.getVelocity(u) : 0), x = isNaN(f.resistance) ? R : Number(f.resistance), d = y * x > 0 ? y / x : y / -x, w = "function" == typeof t[u] ? t[u.indexOf("set") || "function" != typeof t["get" + u.substr(3)] ? u : "get" + u.substr(3)]() : t[u] || 0, T = w + g(y, A, d, E), void 0 !== f.end && (f = m(f, T, f.max, f.min), (h || p) && (O[u] = _(f, O[u], "end"))), void 0 !== f.max && T > Number(f.max) + c ? (k = f.unitFactor || l.defaultUnitFactors[u] || 1, b = w > f.max && f.min !== f.max || y * k > -15 && 45 > y * k ? o + .1 * (s - o) : v(w, f.max, y, A, E), C > b + a && (C = b + a)) : void 0 !== f.min && T < Number(f.min) - c && (k = f.unitFactor || l.defaultUnitFactors[u] || 1, b = w < f.min && f.min !== f.max || y * k > -45 && 15 > y * k ? o + .1 * (s - o) : v(w, f.min, y, A, E), C > b + a && (C = b + a)), b > S && (S = b)), d > S && (S = d));
				return S > C && (S = C), S > s ? s : o > S ? o : S
			},
			x = l.prototype = new t("throwProps");
		return x.constructor = l, l.version = "0.9.10", l.API = 2, l._autoCSS = !0, l.defaultResistance = 100, l.defaultUnitFactors = {
			time: 1e3,
			totalTime: 1e3
		}, l.track = function(t, e, i) {
			return n.track(t, e, i)
		}, l.untrack = function(t, e) {
			n.untrack(t, e)
		}, l.isTracking = function(t, e) {
			return n.isTracking(t, e)
		}, l.getVelocity = function(t, e) {
			var i = n.getByTarget(t);
			return i ? i.getVelocity(e) : 0 / 0
		}, l._cssRegister = function() {
			var t = u.com.greensock.plugins.CSSPlugin;
			if (t) {
				var e = t._internals,
					i = e._parseToProxy,
					o = e._setPluginRatio,
					a = e.CSSPropTween;
				e._registerComplexSpecialProp("throwProps", {
					parser: function(t, e, h, c, u, p) {
						p = new l;
						var d, m, _, g, v, y = {},
							x = {},
							w = {},
							T = {},
							b = {},
							P = {};
						s = {};
						for (_ in e)"resistance" !== _ && "preventOvershoot" !== _ && (m = e[_], "object" == typeof m ? (void 0 !== m.velocity && "number" == typeof m.velocity ? y[_] = Number(m.velocity) || 0 : (v = v || n.getByTarget(t), y[_] = v && v.isTrackingProp(_) ? v.getVelocity(_) : 0), void 0 !== m.end && (T[_] = m.end), void 0 !== m.min && (x[_] = m.min), void 0 !== m.max && (w[_] = m.max), m.preventOvershoot && (P[_] = !0), void 0 !== m.resistance && (d = !0, b[_] = m.resistance)) : "number" == typeof m ? y[_] = m : (v = v || n.getByTarget(t), y[_] = v && v.isTrackingProp(_) ? v.getVelocity(_) : m || 0), f[_] && c._enableTransforms(2 === f[_]));
						g = i(t, y, c, u, p), r = g.proxy, y = g.end;
						for (_ in r) s[_] = {
							velocity: y[_],
							min: x[_],
							max: w[_],
							end: T[_],
							resistance: b[_],
							preventOvershoot: P[_]
						};
						return null != e.resistance && (s.resistance = e.resistance), e.preventOvershoot && (s.preventOvershoot = !0), u = new a(t, "throwProps", 0, 0, g.pt, 2), c._overwriteProps.pop(), u.plugin = p, u.setRatio = o, u.data = g, p._onInitTween(r, s, c._tween), u
					}
				})
			}
		}, l.to = function(t, i, n, l, h) {
			i.throwProps || (i = {
				throwProps: i
			}), 0 === h && (i.throwProps.preventOvershoot = !0), p = !0;
			var c = new e(t, l || 1, i);
			return c.render(0, !0, !0), c.vars.css ? (c.duration(y(r, {
				throwProps: s,
				ease: i.ease
			}, n, l, h)), c._delay && !c.vars.immediateRender ? c.invalidate() : o._onInitTween(r, a, c), p = !1, c) : (c.kill(), c = new e(t, y(t, i, n, l, h), i), p = !1, c)
		}, x._onInitTween = function(t, e, i) {
			this.target = t, this._props = [], o = this, a = e;
			var r, s, l, h, c, u, f, d, v, y = i._ease,
				x = isNaN(e.checkpoint) ? .05 : Number(e.checkpoint),
				w = i._duration,
				T = e.preventOvershoot,
				b = 0;
			for (r in e) if ("resistance" !== r && "checkpoint" !== r && "preventOvershoot" !== r) {
				if (s = e[r], "number" == typeof s) c = Number(s) || 0;
				else if ("object" != typeof s || isNaN(s.velocity)) {
					if (v = v || n.getByTarget(t), !v || !v.isTrackingProp(r)) throw "ERROR: No velocity was defined in the throwProps tween of " + t + " property: " + r;
					c = v.getVelocity(r)
				} else c = Number(s.velocity);
				u = g(c, y, w, x), d = 0, h = "function" == typeof t[r], l = h ? t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : t[r], "object" == typeof s && (f = l + u, void 0 !== s.end && (s = m(s, f, s.max, s.min), p && (e[r] = _(s, e[r], "end"))), void 0 !== s.max && Number(s.max) < f ? T || s.preventOvershoot ? u = s.max - l : d = s.max - l - u : void 0 !== s.min && Number(s.min) > f && (T || s.preventOvershoot ? u = s.min - l : d = s.min - l - u)), this._overwriteProps[b] = r, this._props[b++] = {
					p: r,
					s: l,
					c1: u,
					c2: d,
					f: h,
					r: !1
				}
			}
			return !0
		}, x._kill = function(e) {
			for (var i = this._props.length; --i > -1;) null != e[this._props[i].p] && this._props.splice(i, 1);
			return t.prototype._kill.call(this, e)
		}, x._roundProps = function(t, e) {
			for (var i = this._props, n = i.length; --n > -1;)(t[i[n].p] || t.throwProps) && (i[n].r = e)
		}, x.setRatio = function(t) {
			for (var e, i, n = this._props.length; --n > -1;) e = this._props[n], i = e.s + e.c1 * t + e.c2 * t * t, e.r ? i = Math.round(i) : 1 === t && (i = (1e4 * i + (0 > i ? -.5 : .5) | 0) / 1e4), e.f ? this.target[e.p](i) : this.target[e.p] = i
		}, t.activate([l]), l
	}, !0), _gsScope._gsDefine("utils.VelocityTracker", ["TweenLite"], function(t) {
		var e, i, n, r, s = /([A-Z])/g,
			o = {},
			a = {
				x: 1,
				y: 1,
				z: 2,
				scale: 1,
				scaleX: 1,
				scaleY: 1,
				rotation: 1,
				rotationZ: 1,
				rotationX: 2,
				rotationY: 2,
				skewX: 1,
				skewY: 1,
				xPercent: 1,
				yPercent: 1
			},
			l = document.defaultView ? document.defaultView.getComputedStyle : function() {},
			h = function(t, e, i) {
				var n = (t._gsTransform || o)[e];
				return n || 0 === n ? n : (t.style[e] ? n = t.style[e] : (i = i || l(t, null)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(s, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), parseFloat(n) || 0)
			},
			c = t.ticker,
			u = function(t, e, i) {
				this.p = t, this.f = e, this.v1 = this.v2 = 0, this.t1 = this.t2 = c.time, this.css = !1, this.type = "", this._prev = null, i && (this._next = i, i._prev = this)
			},
			p = function() {
				var t, i, s = e,
					o = c.time;
				if (o - n >= .03) for (r = n, n = o; s;) {
					for (i = s._firstVP; i;) t = i.css ? h(s.target, i.p) : i.f ? s.target[i.p]() : s.target[i.p], (t !== i.v1 || o - i.t1 > .15) && (i.v2 = i.v1, i.v1 = t, i.t2 = i.t1, i.t1 = o), i = i._next;
					s = s._next
				}
			},
			f = function(t) {
				this._lookup = {}, this.target = t, this.elem = t.style && t.nodeType ? !0 : !1, i || (c.addEventListener("tick", p, null, !1, -100), n = r = c.time, i = !0), e && (this._next = e, e._prev = this), e = this
			},
			d = f.getByTarget = function(t) {
				for (var i = e; i;) {
					if (i.target === t) return i;
					i = i._next
				}
			},
			m = f.prototype;
		return m.addProp = function(e, i) {
			if (!this._lookup[e]) {
				var n = this.target,
					r = "function" == typeof n[e],
					s = r ? this._altProp(e) : e,
					o = this._firstVP;
				this._firstVP = this._lookup[e] = this._lookup[s] = o = new u(s !== e && 0 === e.indexOf("set") ? s : e, r, o), o.css = this.elem && (void 0 !== this.target.style[o.p] || a[o.p]), o.css && a[o.p] && !n._gsTransform && t.set(n, {
					x: "+=0",
					overwrite: !1
				}), o.type = i || o.css && 0 === e.indexOf("rotation") ? "deg" : "", o.v1 = o.v2 = o.css ? h(n, o.p) : r ? n[o.p]() : n[o.p]
			}
		}, m.removeProp = function(t) {
			var e = this._lookup[t];
			e && (e._prev ? e._prev._next = e._next : e === this._firstVP && (this._firstVP = e._next), e._next && (e._next._prev = e._prev), this._lookup[t] = 0, e.f && (this._lookup[this._altProp(t)] = 0))
		}, m.isTrackingProp = function(t) {
			return this._lookup[t] instanceof u
		}, m.getVelocity = function(t) {
			var e, i, n, r = this._lookup[t],
				s = this.target;
			if (!r) throw "The velocity of " + t + " is not being tracked.";
			return e = r.css ? h(s, r.p) : r.f ? s[r.p]() : s[r.p], i = e - r.v2, ("rad" === r.type || "deg" === r.type) && (n = "rad" === r.type ? 2 * Math.PI : 360, i %= n, i !== i % (n / 2) && (i = 0 > i ? i + n : i - n)), i / (c.time - r.t2)
		}, m._altProp = function(t) {
			var e = t.substr(0, 3),
				i = ("get" === e ? "set" : "set" === e ? "get" : e) + t.substr(3);
			return "function" == typeof this.target[i] ? i : t
		}, f.getByTarget = function(i) {
			var n = e;
			for ("string" == typeof i && (i = t.selector(i)), i.length && i !== window && i[0] && i[0].style && !i.nodeType && (i = i[0]); n;) {
				if (n.target === i) return n;
				n = n._next
			}
		}, f.track = function(t, e, i) {
			var n = d(t),
				r = e.split(","),
				s = r.length;
			for (i = (i || "").split(","), n || (n = new f(t)); --s > -1;) n.addProp(r[s], i[s] || i[0]);
			return n
		}, f.untrack = function(t, i) {
			var n = d(t),
				r = (i || "").split(","),
				s = r.length;
			if (n) {
				for (; --s > -1;) n.removeProp(r[s]);
				n._firstVP && i || (n._prev ? n._prev._next = n._next : n === e && (e = n._next), n._next && (n._next._prev = n._prev))
			}
		}, f.isTracking = function(t, e) {
			var i = d(t);
			return i ? !e && i._firstVP ? !0 : i.isTrackingProp(e) : !1
		}, f
	}, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function(t) {
	"use strict";
	var e = function() {
			return (_gsScope.GreenSockGlobals || _gsScope)[t]
		};
	"function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = e())
}("ThrowPropsPlugin");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
	"use strict";
	_gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
		var n = function(t) {
				var e, i = [],
					n = t.length;
				for (e = 0; e !== n; i.push(t[e++]));
				return i
			},
			r = function(t, e, i) {
				var n, r, s = t.cycle;
				for (n in s) r = s[n], t[n] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length];
				delete t.cycle
			},
			s = function(t, e, n) {
				i.call(this, t, e, n), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = s.prototype.render
			},
			o = 1e-10,
			a = i._internals,
			l = a.isSelector,
			h = a.isArray,
			c = s.prototype = i.to({}, .1, {}),
			u = [];
		s.version = "1.18.2", c.constructor = s, c.kill()._gc = !1, s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf, s.getTweensOf = i.getTweensOf, s.lagSmoothing = i.lagSmoothing, s.ticker = i.ticker, s.render = i.render, c.invalidate = function() {
			return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
		}, c.updateTo = function(t, e) {
			var n, r = this.ratio,
				s = this.vars.immediateRender || t.immediateRender;
			e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
			for (n in t) this.vars[n] = t[n];
			if (this._initted || s) if (e) this._initted = !1, s && this.render(0, !0, !0);
			else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
				var o = this._totalTime;
				this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1)
			} else if (this._initted = !1, this._init(), this._time > 0 || s) for (var a, l = 1 / (1 - r), h = this._firstPT; h;) a = h.s + h.c, h.c *= l, h.s = a - h.c, h = h._next;
			return this
		}, c.render = function(t, e, i) {
			this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
			var n, r, s, l, h, c, u, p, f = this._dirty ? this.totalDuration() : this._totalDuration,
				d = this._time,
				m = this._totalTime,
				_ = this._cycle,
				g = this._duration,
				v = this._rawPrevTime;
			if (t >= f - 1e-7 ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = g, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === g && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > v || 0 >= t && t >= -1e-7 || v === o && "isPause" !== this.data) && v !== t && (i = !0, v > o && (r = "onReverseComplete")), this._rawPrevTime = p = !e || t || v === t ? t : o)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === g && v > 0) && (r = "onReverseComplete", n = this._reversed), 0 > t && (this._active = !1, 0 === g && (this._initted || !this.vars.lazy || i) && (v >= 0 && (i = !0), this._rawPrevTime = p = !e || t || v === t ? t : o)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (l = g + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = g - this._time), this._time > g ? this._time = g : this._time < 0 && (this._time = 0)), this._easeType ? (h = this._time / g, c = this._easeType, u = this._easePower, (1 === c || 3 === c && h >= .5) && (h = 1 - h), 3 === c && (h *= 2), 1 === u ? h *= h : 2 === u ? h *= h * h : 3 === u ? h *= h * h * h : 4 === u && (h *= h * h * h * h), this.ratio = 1 === c ? 1 - h : 2 === c ? h : this._time / g < .5 ? h / 2 : 1 - h / 2) : this.ratio = this._ease.getRatio(this._time / g)), d === this._time && !i && _ === this._cycle) return void(m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
			if (!this._initted) {
				if (this._init(), !this._initted || this._gc) return;
				if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = d, this._totalTime = m, this._rawPrevTime = v, this._cycle = _, a.lazyTweens.push(this), void(this._lazy = [t, e]);
				this._time && !n ? this.ratio = this._ease.getRatio(this._time / g) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
			}
			for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== d && t >= 0 && (this._active = !0), 0 === m && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === g) && (e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
			this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== m || n) && this._callback("onUpdate")), this._cycle !== _ && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === g && this._rawPrevTime === o && p !== o && (this._rawPrevTime = 0))
		}, s.to = function(t, e, i) {
			return new s(t, e, i)
		}, s.from = function(t, e, i) {
			return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new s(t, e, i)
		}, s.fromTo = function(t, e, i, n) {
			return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new s(t, e, n)
		}, s.staggerTo = s.allTo = function(t, e, o, a, c, p, f) {
			a = a || 0;
			var d, m, _, g, v = 0,
				y = [],
				x = function() {
					o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments), c.apply(f || o.callbackScope || this, p || u)
				},
				w = o.cycle,
				T = o.startAt && o.startAt.cycle;
			for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t))), t = t || [], 0 > a && (t = n(t), t.reverse(), a *= -1), d = t.length - 1, _ = 0; d >= _; _++) {
				m = {};
				for (g in o) m[g] = o[g];
				if (w && r(m, t, _), T) {
					T = m.startAt = {};
					for (g in o.startAt) T[g] = o.startAt[g];
					r(m.startAt, t, _)
				}
				m.delay = v + (m.delay || 0), _ === d && c && (m.onComplete = x), y[_] = new s(t[_], e, m), v += a
			}
			return y
		}, s.staggerFrom = s.allFrom = function(t, e, i, n, r, o, a) {
			return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, s.staggerTo(t, e, i, n, r, o, a)
		}, s.staggerFromTo = s.allFromTo = function(t, e, i, n, r, o, a, l) {
			return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, s.staggerTo(t, e, n, r, o, a, l)
		}, s.delayedCall = function(t, e, i, n, r) {
			return new s(e, 0, {
				delay: t,
				onComplete: e,
				onCompleteParams: i,
				callbackScope: n,
				onReverseComplete: e,
				onReverseCompleteParams: i,
				immediateRender: !1,
				useFrames: r,
				overwrite: 0
			})
		}, s.set = function(t, e) {
			return new s(t, 0, e)
		}, s.isTweening = function(t) {
			return i.getTweensOf(t, !0).length > 0
		};
		var p = function(t, e) {
				for (var n = [], r = 0, s = t._first; s;) s instanceof i ? n[r++] = s : (e && (n[r++] = s), n = n.concat(p(s, e)), r = n.length), s = s._next;
				return n
			},
			f = s.getAllTweens = function(e) {
				return p(t._rootTimeline, e).concat(p(t._rootFramesTimeline, e))
			};
		s.killAll = function(t, i, n, r) {
			null == i && (i = !0), null == n && (n = !0);
			var s, o, a, l = f(0 != r),
				h = l.length,
				c = i && n && r;
			for (a = 0; h > a; a++) o = l[a], (c || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
		}, s.killChildTweensOf = function(t, e) {
			if (null != t) {
				var r, o, c, u, p, f = a.tweenLookup;
				if ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t)), h(t)) for (u = t.length; --u > -1;) s.killChildTweensOf(t[u], e);
				else {
					r = [];
					for (c in f) for (o = f[c].target.parentNode; o;) o === t && (r = r.concat(f[c].tweens)), o = o.parentNode;
					for (p = r.length, u = 0; p > u; u++) e && r[u].totalTime(r[u].totalDuration()), r[u]._enabled(!1, !1)
				}
			}
		};
		var d = function(t, i, n, r) {
				i = i !== !1, n = n !== !1, r = r !== !1;
				for (var s, o, a = f(r), l = i && n && r, h = a.length; --h > -1;) o = a[h], (l || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && o.paused(t)
			};
		return s.pauseAll = function(t, e, i) {
			d(!0, t, e, i)
		}, s.resumeAll = function(t, e, i) {
			d(!1, t, e, i)
		}, s.globalTimeScale = function(e) {
			var n = t._rootTimeline,
				r = i.ticker.time;
			return arguments.length ? (e = e || o, n._startTime = r - (r - n._startTime) * n._timeScale / e, n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale
		}, c.progress = function(t) {
			return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
		}, c.totalProgress = function(t) {
			return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
		}, c.time = function(t, e) {
			return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
		}, c.duration = function(e) {
			return arguments.length ? t.prototype.duration.call(this, e) : this._duration
		}, c.totalDuration = function(t) {
			return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
		}, c.repeat = function(t) {
			return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
		}, c.repeatDelay = function(t) {
			return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
		}, c.yoyo = function(t) {
			return arguments.length ? (this._yoyo = t, this) : this._yoyo
		}, s
	}, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
		var n = function(t) {
				e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
				var i, n, r = this.vars;
				for (n in r) i = r[n], l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
				l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
			},
			r = 1e-10,
			s = i._internals,
			o = n._internals = {},
			a = s.isSelector,
			l = s.isArray,
			h = s.lazyTweens,
			c = s.lazyRender,
			u = _gsScope._gsDefine.globals,
			p = function(t) {
				var e, i = {};
				for (e in t) i[e] = t[e];
				return i
			},
			f = function(t, e, i) {
				var n, r, s = t.cycle;
				for (n in s) r = s[n], t[n] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length];
				delete t.cycle
			},
			d = o.pauseCallback = function() {},
			m = function(t) {
				var e, i = [],
					n = t.length;
				for (e = 0; e !== n; i.push(t[e++]));
				return i
			},
			_ = n.prototype = new e;
		return n.version = "1.18.2", _.constructor = n, _.kill()._gc = _._forcingPlayhead = _._hasPause = !1, _.to = function(t, e, n, r) {
			var s = n.repeat && u.TweenMax || i;
			return e ? this.add(new s(t, e, n), r) : this.set(t, n, r)
		}, _.from = function(t, e, n, r) {
			return this.add((n.repeat && u.TweenMax || i).from(t, e, n), r)
		}, _.fromTo = function(t, e, n, r, s) {
			var o = r.repeat && u.TweenMax || i;
			return e ? this.add(o.fromTo(t, e, n, r), s) : this.set(t, r, s)
		}, _.staggerTo = function(t, e, r, s, o, l, h, c) {
			var u, d, _ = new n({
				onComplete: l,
				onCompleteParams: h,
				callbackScope: c,
				smoothChildTiming: this.smoothChildTiming
			}),
				g = r.cycle;
			for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = m(t)), s = s || 0, 0 > s && (t = m(t), t.reverse(), s *= -1), d = 0; d < t.length; d++) u = p(r), u.startAt && (u.startAt = p(u.startAt), u.startAt.cycle && f(u.startAt, t, d)), g && f(u, t, d), _.to(t[d], e, u, d * s);
			return this.add(_, o)
		}, _.staggerFrom = function(t, e, i, n, r, s, o, a) {
			return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, s, o, a)
		}, _.staggerFromTo = function(t, e, i, n, r, s, o, a, l) {
			return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, s, o, a, l)
		}, _.call = function(t, e, n, r) {
			return this.add(i.delayedCall(0, t, e, n), r)
		}, _.set = function(t, e, n) {
			return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n)
		}, n.exportRoot = function(t, e) {
			t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
			var r, s, o = new n(t),
				a = o._timeline;
			for (null == e && (e = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, r = a._first; r;) s = r._next, e && r instanceof i && r.target === r.vars.onComplete || o.add(r, r._startTime - r._delay), r = s;
			return a.add(o, 0), o
		}, _.add = function(r, s, o, a) {
			var h, c, u, p, f, d;
			if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof t)) {
				if (r instanceof Array || r && r.push && l(r)) {
					for (o = o || "normal", a = a || 0, h = s, c = r.length, u = 0; c > u; u++) l(p = r[u]) && (p = new n({
						tweens: p
					})), this.add(p, h), "string" != typeof p && "function" != typeof p && ("sequence" === o ? h = p._startTime + p.totalDuration() / p._timeScale : "start" === o && (p._startTime -= p.delay())), h += a;
					return this._uncache(!0)
				}
				if ("string" == typeof r) return this.addLabel(r, s);
				if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
				r = i.delayedCall(0, r)
			}
			if (e.prototype.add.call(this, r, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (f = this, d = f.rawTime() > r._startTime; f._timeline;) d && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1), f = f._timeline;
			return this
		}, _.remove = function(e) {
			if (e instanceof t) {
				this._remove(e, !1);
				var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
				return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
			}
			if (e instanceof Array || e && e.push && l(e)) {
				for (var n = e.length; --n > -1;) this.remove(e[n]);
				return this
			}
			return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
		}, _._remove = function(t, i) {
			e.prototype._remove.call(this, t, i);
			var n = this._last;
			return n ? this._time > n._startTime + n._totalDuration / n._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
		}, _.append = function(t, e) {
			return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
		}, _.insert = _.insertMultiple = function(t, e, i, n) {
			return this.add(t, e || 0, i, n)
		}, _.appendMultiple = function(t, e, i, n) {
			return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
		}, _.addLabel = function(t, e) {
			return this._labels[t] = this._parseTimeOrLabel(e), this
		}, _.addPause = function(t, e, n, r) {
			var s = i.delayedCall(0, d, n, r || this);
			return s.vars.onComplete = s.vars.onReverseComplete = e, s.data = "isPause", this._hasPause = !0, this.add(s, t)
		}, _.removeLabel = function(t) {
			return delete this._labels[t], this
		}, _.getLabelTime = function(t) {
			return null != this._labels[t] ? this._labels[t] : -1
		}, _._parseTimeOrLabel = function(e, i, n, r) {
			var s;
			if (r instanceof t && r.timeline === this) this.remove(r);
			else if (r && (r instanceof Array || r.push && l(r))) for (s = r.length; --s > -1;) r[s] instanceof t && r[s].timeline === this && this.remove(r[s]);
			if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, n);
			if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
			else {
				if (s = e.indexOf("="), -1 === s) return null == this._labels[e] ? n ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
				i = parseInt(e.charAt(s - 1) + "1", 10) * Number(e.substr(s + 1)), e = s > 1 ? this._parseTimeOrLabel(e.substr(0, s - 1), 0, n) : this.duration()
			}
			return Number(e) + i
		}, _.seek = function(t, e) {
			return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
		}, _.stop = function() {
			return this.paused(!0)
		}, _.gotoAndPlay = function(t, e) {
			return this.play(t, e)
		}, _.gotoAndStop = function(t, e) {
			return this.pause(t, e)
		}, _.render = function(t, e, i) {
			this._gc && this._enabled(!0, !1);
			var n, s, o, a, l, u, p, f = this._dirty ? this.totalDuration() : this._totalDuration,
				d = this._time,
				m = this._startTime,
				_ = this._timeScale,
				g = this._paused;
			if (t >= f - 1e-7) this._totalTime = this._time = f, this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", l = !! this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = f + 1e-4;
			else if (1e-7 > t) if (this._totalTime = this._time = 0, (0 !== d || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (a = "onReverseComplete", s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t;
			else {
				if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s) for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
				t = 0, this._initted || (l = !0)
			} else {
				if (this._hasPause && !this._forcingPlayhead && !e) {
					if (t >= d) for (n = this._first; n && n._startTime <= t && !u;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (u = n), n = n._next;
					else for (n = this._last; n && n._startTime >= t && !u;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (u = n), n = n._prev;
					u && (this._time = t = u._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
				}
				this._totalTime = this._time = this._rawPrevTime = t
			}
			if (this._time !== d && this._first || i || l || u) {
				if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== d && t > 0 && (this._active = !0), 0 === d && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")), p = this._time, p >= d) for (n = this._first; n && (o = n._next, p === this._time && (!this._paused || g));)(n._active || n._startTime <= p && !n._paused && !n._gc) && (u === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
				else for (n = this._last; n && (o = n._prev, p === this._time && (!this._paused || g));) {
					if (n._active || n._startTime <= d && !n._paused && !n._gc) {
						if (u === n) {
							for (u = n._prev; u && u.endTime() > this._time;) u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i), u = u._prev;
							u = null, this.pause()
						}
						n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
					}
					n = o
				}
				this._onUpdate && (e || (h.length && c(), this._callback("onUpdate"))), a && (this._gc || (m === this._startTime || _ !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (h.length && c(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
			}
		}, _._hasPausedChild = function() {
			for (var t = this._first; t;) {
				if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
				t = t._next
			}
			return !1
		}, _.getChildren = function(t, e, n, r) {
			r = r || -9999999999;
			for (var s = [], o = this._first, a = 0; o;) o._startTime < r || (o instanceof i ? e !== !1 && (s[a++] = o) : (n !== !1 && (s[a++] = o), t !== !1 && (s = s.concat(o.getChildren(!0, e, n)), a = s.length))), o = o._next;
			return s
		}, _.getTweensOf = function(t, e) {
			var n, r, s = this._gc,
				o = [],
				a = 0;
			for (s && this._enabled(!0, !0), n = i.getTweensOf(t), r = n.length; --r > -1;)(n[r].timeline === this || e && this._contains(n[r])) && (o[a++] = n[r]);
			return s && this._enabled(!1, !0), o
		}, _.recent = function() {
			return this._recent
		}, _._contains = function(t) {
			for (var e = t.timeline; e;) {
				if (e === this) return !0;
				e = e.timeline
			}
			return !1
		}, _.shiftChildren = function(t, e, i) {
			i = i || 0;
			for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
			if (e) for (n in s) s[n] >= i && (s[n] += t);
			return this._uncache(!0)
		}, _._kill = function(t, e) {
			if (!t && !e) return this._enabled(!1, !1);
			for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
			return r
		}, _.clear = function(t) {
			var e = this.getChildren(!1, !0, !0),
				i = e.length;
			for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
			return t !== !1 && (this._labels = {}), this._uncache(!0)
		}, _.invalidate = function() {
			for (var e = this._first; e;) e.invalidate(), e = e._next;
			return t.prototype.invalidate.call(this)
		}, _._enabled = function(t, i) {
			if (t === this._gc) for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
			return e.prototype._enabled.call(this, t, i)
		}, _.totalTime = function() {
			this._forcingPlayhead = !0;
			var e = t.prototype.totalTime.apply(this, arguments);
			return this._forcingPlayhead = !1, e
		}, _.duration = function(t) {
			return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
		}, _.totalDuration = function(t) {
			if (!arguments.length) {
				if (this._dirty) {
					for (var e, i, n = 0, r = this._last, s = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = e;
					this._duration = this._totalDuration = n, this._dirty = !1
				}
				return this._totalDuration
			}
			return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
		}, _.paused = function(e) {
			if (!e) for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
			return t.prototype.paused.apply(this, arguments)
		}, _.usesFrames = function() {
			for (var e = this._timeline; e._timeline;) e = e._timeline;
			return e === t._rootFramesTimeline
		}, _.rawTime = function() {
			return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
		}, n
	}, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
		var n = function(e) {
				t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
			},
			r = 1e-10,
			s = e._internals,
			o = s.lazyTweens,
			a = s.lazyRender,
			l = new i(null, null, 1, 0),
			h = n.prototype = new t;
		return h.constructor = n, h.kill()._gc = !1, n.version = "1.18.2", h.invalidate = function() {
			return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
		}, h.addCallback = function(t, i, n, r) {
			return this.add(e.delayedCall(0, t, n, r), i)
		}, h.removeCallback = function(t, e) {
			if (t) if (null == e) this._kill(null, t);
			else for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
			return this
		}, h.removePause = function(e) {
			return this.removeCallback(t._internals.pauseCallback, e)
		}, h.tweenTo = function(t, i) {
			i = i || {};
			var n, r, s, o = {
				ease: l,
				useFrames: this.usesFrames(),
				immediateRender: !1
			};
			for (r in i) o[r] = i[r];
			return o.time = this._parseTimeOrLabel(t), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new e(this, n, o), o.onStart = function() {
				s.target.paused(!0), s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && s._callback("onStart")
			}, s
		}, h.tweenFromTo = function(t, e, i) {
			i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
				onComplete: this.seek,
				onCompleteParams: [t],
				callbackScope: this
			}, i.immediateRender = i.immediateRender !== !1;
			var n = this.tweenTo(e, i);
			return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
		}, h.render = function(t, e, i) {
			this._gc && this._enabled(!0, !1);
			var n, s, l, h, c, u, p, f, d = this._dirty ? this.totalDuration() : this._totalDuration,
				m = this._duration,
				_ = this._time,
				g = this._totalTime,
				v = this._startTime,
				y = this._timeScale,
				x = this._rawPrevTime,
				w = this._paused,
				T = this._cycle;
			if (t >= d - 1e-7) this._locked || (this._totalTime = d, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, h = "onComplete", c = !! this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || 0 > x || x === r) && x !== t && this._first && (c = !0, x > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = m, t = m + 1e-4);
			else if (1e-7 > t) if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== _ || 0 === m && x !== r && (x > 0 || 0 > t && x >= 0) && !this._locked) && (h = "onReverseComplete", s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (c = s = !0, h = "onReverseComplete") : x >= 0 && this._first && (c = !0), this._rawPrevTime = t;
			else {
				if (this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s) for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
				t = 0, this._initted || (c = !0)
			} else if (0 === m && 0 > x && (c = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (u = m + this._repeatDelay, this._cycle = this._totalTime / u >> 0, 0 !== this._cycle && this._cycle === this._totalTime / u && this._cycle--, this._time = this._totalTime - this._cycle * u, this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, t = m + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e) {
				if (t = this._time, t >= _) for (n = this._first; n && n._startTime <= t && !p;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (p = n), n = n._next;
				else for (n = this._last; n && n._startTime >= t && !p;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (p = n), n = n._prev;
				p && (this._time = t = p._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
			}
			if (this._cycle !== T && !this._locked) {
				var b = this._yoyo && 0 !== (1 & T),
					P = b === (this._yoyo && 0 !== (1 & this._cycle)),
					k = this._totalTime,
					S = this._cycle,
					C = this._rawPrevTime,
					O = this._time;
				if (this._totalTime = T * m, this._cycle < T ? b = !b : this._totalTime += m, this._time = _, this._rawPrevTime = 0 === m ? x - 1e-4 : x, this._cycle = T, this._locked = !0, _ = b ? 0 : m, this.render(_, e, 0 === m), e || this._gc || this.vars.onRepeat && this._callback("onRepeat"), _ !== this._time) return;
				if (P && (_ = b ? m + 1e-4 : -1e-4, this.render(_, !0, !1)), this._locked = !1, this._paused && !w) return;
				this._time = O, this._totalTime = k, this._cycle = S, this._rawPrevTime = C
			}
			if (!(this._time !== _ && this._first || i || c || p)) return void(g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
			if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && t > 0 && (this._active = !0), 0 === g && this.vars.onStart && 0 !== this._totalTime && (e || this._callback("onStart")), f = this._time, f >= _) for (n = this._first; n && (l = n._next, f === this._time && (!this._paused || w));)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (p === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = l;
			else for (n = this._last; n && (l = n._prev, f === this._time && (!this._paused || w));) {
				if (n._active || n._startTime <= _ && !n._paused && !n._gc) {
					if (p === n) {
						for (p = n._prev; p && p.endTime() > this._time;) p.render(p._reversed ? p.totalDuration() - (t - p._startTime) * p._timeScale : (t - p._startTime) * p._timeScale, e, i), p = p._prev;
						p = null, this.pause()
					}
					n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
				}
				n = l
			}
			this._onUpdate && (e || (o.length && a(), this._callback("onUpdate"))), h && (this._locked || this._gc || (v === this._startTime || y !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (s && (o.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this._callback(h)))
		}, h.getActive = function(t, e, i) {
			null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
			var n, r, s = [],
				o = this.getChildren(t, e, i),
				a = 0,
				l = o.length;
			for (n = 0; l > n; n++) r = o[n], r.isActive() && (s[a++] = r);
			return s
		}, h.getLabelAfter = function(t) {
			t || 0 !== t && (t = this._time);
			var e, i = this.getLabelsArray(),
				n = i.length;
			for (e = 0; n > e; e++) if (i[e].time > t) return i[e].name;
			return null
		}, h.getLabelBefore = function(t) {
			null == t && (t = this._time);
			for (var e = this.getLabelsArray(), i = e.length; --i > -1;) if (e[i].time < t) return e[i].name;
			return null
		}, h.getLabelsArray = function() {
			var t, e = [],
				i = 0;
			for (t in this._labels) e[i++] = {
				time: this._labels[t],
				name: t
			};
			return e.sort(function(t, e) {
				return t.time - e.time
			}), e
		}, h.progress = function(t, e) {
			return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
		}, h.totalProgress = function(t, e) {
			return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
		}, h.totalDuration = function(e) {
			return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
		}, h.time = function(t, e) {
			return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
		}, h.repeat = function(t) {
			return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
		}, h.repeatDelay = function(t) {
			return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
		}, h.yoyo = function(t) {
			return arguments.length ? (this._yoyo = t, this) : this._yoyo
		}, h.currentLabel = function(t) {
			return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
		}, n
	}, !0), function() {
		var t = 180 / Math.PI,
			e = [],
			i = [],
			n = [],
			r = {},
			s = _gsScope._gsDefine.globals,
			o = function(t, e, i, n) {
				this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t
			},
			a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			l = function(t, e, i, n) {
				var r = {
					a: t
				},
					s = {},
					o = {},
					a = {
						c: n
					},
					l = (t + e) / 2,
					h = (e + i) / 2,
					c = (i + n) / 2,
					u = (l + h) / 2,
					p = (h + c) / 2,
					f = (p - u) / 8;
				return r.b = l + (t - l) / 4, s.b = u + f, r.c = s.a = (r.b + s.b) / 2, s.c = o.a = (u + p) / 2, o.b = p - f, a.b = c + (n - c) / 4, o.c = a.a = (o.b + a.b) / 2, [r, s, o, a]
			},
			h = function(t, r, s, o, a) {
				var h, c, u, p, f, d, m, _, g, v, y, x, w, T = t.length - 1,
					b = 0,
					P = t[0].a;
				for (h = 0; T > h; h++) f = t[b], c = f.a, u = f.d, p = t[b + 1].d, a ? (y = e[h], x = i[h], w = (x + y) * r * .25 / (o ? .5 : n[h] || .5), d = u - (u - c) * (o ? .5 * r : 0 !== y ? w / y : 0), m = u + (p - u) * (o ? .5 * r : 0 !== x ? w / x : 0), _ = u - (d + ((m - d) * (3 * y / (y + x) + .5) / 4 || 0))) : (d = u - (u - c) * r * .5, m = u + (p - u) * r * .5, _ = u - (d + m) / 2), d += _, m += _, f.c = g = d, f.b = 0 !== h ? P : P = f.a + .6 * (f.c - f.a), f.da = u - c, f.ca = g - c, f.ba = P - c, s ? (v = l(c, P, g, u), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = m;
				f = t[b], f.b = P, f.c = P + .4 * (f.d - P), f.da = f.d - f.a, f.ca = f.c - f.a, f.ba = P - f.a, s && (v = l(f.a, P, f.c, f.d), t.splice(b, 1, v[0], v[1], v[2], v[3]))
			},
			c = function(t, n, r, s) {
				var a, l, h, c, u, p, f = [];
				if (s) for (t = [s].concat(t), l = t.length; --l > -1;)"string" == typeof(p = t[l][n]) && "=" === p.charAt(1) && (t[l][n] = s[n] + Number(p.charAt(0) + p.substr(2)));
				if (a = t.length - 2, 0 > a) return f[0] = new o(t[0][n], 0, 0, t[-1 > a ? 0 : 1][n]), f;
				for (l = 0; a > l; l++) h = t[l][n], c = t[l + 1][n], f[l] = new o(h, 0, 0, c), r && (u = t[l + 2][n], e[l] = (e[l] || 0) + (c - h) * (c - h), i[l] = (i[l] || 0) + (u - c) * (u - c));
				return f[l] = new o(t[l][n], 0, 0, t[l + 1][n]), f
			},
			u = function(t, s, o, l, u, p) {
				var f, d, m, _, g, v, y, x, w = {},
					T = [],
					b = p || t[0];
				u = "string" == typeof u ? "," + u + "," : a, null == s && (s = 1);
				for (d in t[0]) T.push(d);
				if (t.length > 1) {
					for (x = t[t.length - 1], y = !0, f = T.length; --f > -1;) if (d = T[f], Math.abs(b[d] - x[d]) > .05) {
						y = !1;
						break
					}
					y && (t = t.concat(), p && t.unshift(p), t.push(t[1]), p = t[t.length - 3])
				}
				for (e.length = i.length = n.length = 0, f = T.length; --f > -1;) d = T[f], r[d] = -1 !== u.indexOf("," + d + ","), w[d] = c(t, d, r[d], p);
				for (f = e.length; --f > -1;) e[f] = Math.sqrt(e[f]), i[f] = Math.sqrt(i[f]);
				if (!l) {
					for (f = T.length; --f > -1;) if (r[d]) for (m = w[T[f]], v = m.length - 1, _ = 0; v > _; _++) g = m[_ + 1].da / i[_] + m[_].da / e[_], n[_] = (n[_] || 0) + g * g;
					for (f = n.length; --f > -1;) n[f] = Math.sqrt(n[f])
				}
				for (f = T.length, _ = o ? 4 : 1; --f > -1;) d = T[f], m = w[d], h(m, s, o, l, r[d]), y && (m.splice(0, _), m.splice(m.length - _, _));
				return w
			},
			p = function(t, e, i) {
				e = e || "soft";
				var n, r, s, a, l, h, c, u, p, f, d, m = {},
					_ = "cubic" === e ? 3 : 2,
					g = "soft" === e,
					v = [];
				if (g && i && (t = [i].concat(t)), null == t || t.length < _ + 1) throw "invalid Bezier data";
				for (p in t[0]) v.push(p);
				for (h = v.length; --h > -1;) {
					for (p = v[h], m[p] = l = [], f = 0, u = t.length, c = 0; u > c; c++) n = null == i ? t[c][p] : "string" == typeof(d = t[c][p]) && "=" === d.charAt(1) ? i[p] + Number(d.charAt(0) + d.substr(2)) : Number(d), g && c > 1 && u - 1 > c && (l[f++] = (n + l[f - 2]) / 2), l[f++] = n;
					for (u = f - _ + 1, f = 0, c = 0; u > c; c += _) n = l[c], r = l[c + 1], s = l[c + 2], a = 2 === _ ? 0 : l[c + 3], l[f++] = d = 3 === _ ? new o(n, r, s, a) : new o(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
					l.length = f
				}
				return m
			},
			f = function(t, e, i) {
				for (var n, r, s, o, a, l, h, c, u, p, f, d = 1 / i, m = t.length; --m > -1;) for (p = t[m], s = p.a, o = p.d - s, a = p.c - s, l = p.b - s, n = r = 0, c = 1; i >= c; c++) h = d * c, u = 1 - h, n = r - (r = (h * h * o + 3 * u * (h * a + u * l)) * h), f = m * i + c - 1, e[f] = (e[f] || 0) + n * n
			},
			d = function(t, e) {
				e = e >> 0 || 6;
				var i, n, r, s, o = [],
					a = [],
					l = 0,
					h = 0,
					c = e - 1,
					u = [],
					p = [];
				for (i in t) f(t[i], o, e);
				for (r = o.length, n = 0; r > n; n++) l += Math.sqrt(o[n]), s = n % e, p[s] = l, s === c && (h += l, s = n / e >> 0, u[s] = p, a[s] = h, l = 0, p = []);
				return {
					length: h,
					lengths: a,
					segments: u
				}
			},
			m = _gsScope._gsDefine.plugin({
				propName: "bezier",
				priority: -1,
				version: "1.3.4",
				API: 2,
				global: !0,
				init: function(t, e, i) {
					this._target = t, e instanceof Array && (e = {
						values: e
					}), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
					var n, r, s, o, a, l = e.values || [],
						h = {},
						c = l[0],
						f = e.autoRotate || i.vars.orientToBezier;
					this._autoRotate = f ? f instanceof Array ? f : [
						["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]
					] : null;
					for (n in c) this._props.push(n);
					for (s = this._props.length; --s > -1;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], h[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), a || h[n] !== l[0][n] && (a = h);
					if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : p(l, e.type, h), this._segCount = this._beziers[n].length, this._timeRes) {
						var m = d(this._beziers, this._timeRes);
						this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
					}
					if (f = this._autoRotate) for (this._initialRotations = [], f[0] instanceof Array || (this._autoRotate = f = [f]), s = f.length; --s > -1;) {
						for (o = 0; 3 > o; o++) n = f[s][o], this._func[n] = "function" == typeof t[n] ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)] : !1;
						n = f[s][2], this._initialRotations[s] = this._func[n] ? this._func[n].call(this._target) : this._target[n]
					}
					return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
				},
				set: function(e) {
					var i, n, r, s, o, a, l, h, c, u, p = this._segCount,
						f = this._func,
						d = this._target,
						m = e !== this._startRatio;
					if (this._timeRes) {
						if (c = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && p - 1 > r) {
							for (h = p - 1; h > r && (this._l2 = c[++r]) <= e;);
							this._l1 = c[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
						} else if (e < this._l1 && r > 0) {
							for (; r > 0 && (this._l1 = c[--r]) >= e;);
							0 === r && e < this._l1 ? this._l1 = 0 : r++, this._l2 = c[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
						}
						if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < u.length - 1) {
							for (h = u.length - 1; h > r && (this._s2 = u[++r]) <= e;);
							this._s1 = u[r - 1], this._si = r
						} else if (e < this._s1 && r > 0) {
							for (; r > 0 && (this._s1 = u[--r]) >= e;);
							0 === r && e < this._s1 ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
						}
						a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
					} else i = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0, a = (e - i * (1 / p)) * p;
					for (n = 1 - a, r = this._props.length; --r > -1;) s = this._props[r], o = this._beziers[s][i], l = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a, this._round[s] && (l = Math.round(l)), f[s] ? d[s](l) : d[s] = l;
					if (this._autoRotate) {
						var _, g, v, y, x, w, T, b = this._autoRotate;
						for (r = b.length; --r > -1;) s = b[r][2], w = b[r][3] || 0, T = b[r][4] === !0 ? 1 : t, o = this._beziers[b[r][0]], _ = this._beziers[b[r][1]], o && _ && (o = o[i], _ = _[i], g = o.a + (o.b - o.a) * a, y = o.b + (o.c - o.b) * a, g += (y - g) * a, y += (o.c + (o.d - o.c) * a - y) * a, v = _.a + (_.b - _.a) * a, x = _.b + (_.c - _.b) * a, v += (x - v) * a, x += (_.c + (_.d - _.c) * a - x) * a, l = m ? Math.atan2(x - v, y - g) * T + w : this._initialRotations[r], f[s] ? d[s](l) : d[s] = l)
					}
				}
			}),
			_ = m.prototype;
		m.bezierThrough = u, m.cubicToQuadratic = l, m._autoCSS = !0, m.quadraticToCubic = function(t, e, i) {
			return new o(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
		}, m._cssRegister = function() {
			var t = s.CSSPlugin;
			if (t) {
				var e = t._internals,
					i = e._parseToProxy,
					n = e._setPluginRatio,
					r = e.CSSPropTween;
				e._registerComplexSpecialProp("bezier", {
					parser: function(t, e, s, o, a, l) {
						e instanceof Array && (e = {
							values: e
						}), l = new m;
						var h, c, u, p = e.values,
							f = p.length - 1,
							d = [],
							_ = {};
						if (0 > f) return a;
						for (h = 0; f >= h; h++) u = i(t, p[h], o, a, l, f !== h), d[h] = u.end;
						for (c in e) _[c] = e[c];
						return _.values = d, a = new r(t, "bezier", 0, 0, u.pt, 2), a.data = u, a.plugin = l, a.setRatio = n, 0 === _.autoRotate && (_.autoRotate = !0), !_.autoRotate || _.autoRotate instanceof Array || (h = _.autoRotate === !0 ? 0 : Number(_.autoRotate), _.autoRotate = null != u.end.left ? [
							["left", "top", "rotation", h, !1]
						] : null != u.end.x ? [
							["x", "y", "rotation", h, !1]
						] : !1), _.autoRotate && (o._transform || o._enableTransforms(!1), u.autoRotate = o._target._gsTransform), l._onInitTween(u.proxy, _, o._tween), a
					}
				})
			}
		}, _._roundProps = function(t, e) {
			for (var i = this._overwriteProps, n = i.length; --n > -1;)(t[i[n]] || t.bezier || t.bezierThrough) && (this._round[i[n]] = e)
		}, _._kill = function(t) {
			var e, i, n = this._props;
			for (e in this._beziers) if (e in t) for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);
			return this._super._kill.call(this, t)
		}
	}(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
		var i, n, r, s, o = function() {
				t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
			},
			a = _gsScope._gsDefine.globals,
			l = {},
			h = o.prototype = new t("css");
		h.constructor = o, o.version = "1.18.2", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, h = "px", o.suffixMap = {
			top: h,
			right: h,
			bottom: h,
			left: h,
			width: h,
			height: h,
			fontSize: h,
			padding: h,
			margin: h,
			perspective: h,
			lineHeight: ""
		};
		var c, u, p, f, d, m, _ = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
			g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
			y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
			x = /(?:\d|\-|\+|=|#|\.)*/g,
			w = /opacity *= *([^)]*)/i,
			T = /opacity:([^;]*)/i,
			b = /alpha\(opacity *=.+?\)/i,
			P = /^(rgb|hsl)/,
			k = /([A-Z])/g,
			S = /-([a-z])/gi,
			C = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
			O = function(t, e) {
				return e.toUpperCase()
			},
			A = /(?:Left|Right|Width)/i,
			E = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			R = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			D = /,(?=[^\)]*(?:\(|$))/gi,
			M = Math.PI / 180,
			L = 180 / Math.PI,
			I = {},
			N = document,
			B = function(t) {
				return N.createElementNS ? N.createElementNS("http://www.w3.org/1999/xhtml", t) : N.createElement(t)
			},
			F = B("div"),
			X = B("img"),
			W = o._internals = {
				_specialProps: l
			},
			Y = navigator.userAgent,
			z = function() {
				var t = Y.indexOf("Android"),
					e = B("a");
				return p = -1 !== Y.indexOf("Safari") && -1 === Y.indexOf("Chrome") && (-1 === t || Number(Y.substr(t + 8, 1)) > 3), d = p && Number(Y.substr(Y.indexOf("Version/") + 8, 1)) < 6, f = -1 !== Y.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y)) && (m = parseFloat(RegExp.$1)), e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1
			}(),
			H = function(t) {
				return w.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
			},
			V = function(t) {
				window.console && console.log(t)
			},
			j = "",
			q = "",
			U = function(t, e) {
				e = e || F;
				var i, n, r = e.style;
				if (void 0 !== r[t]) return t;
				for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
				return n >= 0 ? (q = 3 === n ? "ms" : i[n], j = "-" + q.toLowerCase() + "-", q + t) : null
			},
			G = N.defaultView ? N.defaultView.getComputedStyle : function() {},
			Z = o.getStyle = function(t, e, i, n, r) {
				var s;
				return z || "opacity" !== e ? (!n && t.style[e] ? s = t.style[e] : (i = i || G(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(k, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : H(t)
			},
			$ = W.convertToPixels = function(t, i, n, r, s) {
				if ("px" === r || !r) return n;
				if ("auto" === r || !n) return 0;
				var a, l, h, c = A.test(i),
					u = t,
					p = F.style,
					f = 0 > n;
				if (f && (n = -n), "%" === r && -1 !== i.indexOf("border")) a = n / 100 * (c ? t.clientWidth : t.clientHeight);
				else {
					if (p.cssText = "border:0 solid red;position:" + Z(t, "position") + ";line-height:0;", "%" !== r && u.appendChild && "v" !== r.charAt(0) && "rem" !== r) p[c ? "borderLeftWidth" : "borderTopWidth"] = n + r;
					else {
						if (u = t.parentNode || N.body, l = u._gsCache, h = e.ticker.frame, l && c && l.time === h) return l.width * n / 100;
						p[c ? "width" : "height"] = n + r
					}
					u.appendChild(F), a = parseFloat(F[c ? "offsetWidth" : "offsetHeight"]), u.removeChild(F), c && "%" === r && o.cacheWidths !== !1 && (l = u._gsCache = u._gsCache || {}, l.time = h, l.width = a / n * 100), 0 !== a || s || (a = $(t, i, n, r, !0))
				}
				return f ? -a : a
			},
			Q = W.calculateOffset = function(t, e, i) {
				if ("absolute" !== Z(t, "position", i)) return 0;
				var n = "left" === e ? "Left" : "Top",
					r = Z(t, "margin" + n, i);
				return t["offset" + n] - ($(t, e, parseFloat(r), r.replace(x, "")) || 0)
			},
			K = function(t, e) {
				var i, n, r, s = {};
				if (e = e || G(t, null)) if (i = e.length) for (; --i > -1;) r = e[i], (-1 === r.indexOf("-transform") || ke === r) && (s[r.replace(S, O)] = e.getPropertyValue(r));
				else for (i in e)(-1 === i.indexOf("Transform") || Pe === i) && (s[i] = e[i]);
				else if (e = t.currentStyle || t.style) for (i in e)"string" == typeof i && void 0 === s[i] && (s[i.replace(S, O)] = e[i]);
				return z || (s.opacity = H(t)), n = Be(t, e, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Ce && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
			},
			J = function(t, e, i, n, r) {
				var s, o, a, l = {},
					h = t.style;
				for (o in i)"cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(y, "") ? s : 0 : Q(t, o), void 0 !== h[o] && (a = new de(h, o, h[o], a)));
				if (n) for (o in n)"className" !== o && (l[o] = n[o]);
				return {
					difs: l,
					firstMPT: a
				}
			},
			te = {
				width: ["Left", "Right"],
				height: ["Top", "Bottom"]
			},
			ee = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
			ie = function(t, e, i) {
				var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
					r = te[e],
					s = r.length;
				for (i = i || G(t, null); --s > -1;) n -= parseFloat(Z(t, "padding" + r[s], i, !0)) || 0, n -= parseFloat(Z(t, "border" + r[s] + "Width", i, !0)) || 0;
				return n
			},
			ne = function(t, e) {
				if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
				(null == t || "" === t) && (t = "0 0");
				var i = t.split(" "),
					n = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
					r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
				return null == r ? r = "center" === n ? "50%" : "0" : "center" === r && (r = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), t = n + " " + r + (i.length > 2 ? " " + i[2] : ""), e && (e.oxp = -1 !== n.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === n.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(n.replace(y, "")), e.oy = parseFloat(r.replace(y, "")), e.v = t), e || t
			},
			re = function(t, e) {
				return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
			},
			se = function(t, e) {
				return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
			},
			oe = function(t, e, i, n) {
				var r, s, o, a, l, h = 1e-6;
				return null == t ? a = e : "number" == typeof t ? a = t : (r = 360, s = t.split("_"), l = "=" === t.charAt(1), o = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : L) - (l ? 0 : e), s.length && (n && (n[i] = e + o), -1 !== t.indexOf("short") && (o %= r, o !== o % (r / 2) && (o = 0 > o ? o + r : o - r)), -1 !== t.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : -1 !== t.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), a = e + o), h > a && a > -h && (a = 0), a
			},
			ae = {
				aqua: [0, 255, 255],
				lime: [0, 255, 0],
				silver: [192, 192, 192],
				black: [0, 0, 0],
				maroon: [128, 0, 0],
				teal: [0, 128, 128],
				blue: [0, 0, 255],
				navy: [0, 0, 128],
				white: [255, 255, 255],
				fuchsia: [255, 0, 255],
				olive: [128, 128, 0],
				yellow: [255, 255, 0],
				orange: [255, 165, 0],
				gray: [128, 128, 128],
				purple: [128, 0, 128],
				green: [0, 128, 0],
				red: [255, 0, 0],
				pink: [255, 192, 203],
				cyan: [0, 255, 255],
				transparent: [255, 255, 255, 0]
			},
			le = function(t, e, i) {
				return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
			},
			he = o.parseColor = function(t, e) {
				var i, n, r, s, o, a, l, h, c, u, p;
				if (t) if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t];
				else {
					if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ae[t]) i = ae[t];
					else if ("#" === t.charAt(0)) 4 === t.length && (n = t.charAt(1), r = t.charAt(2), s = t.charAt(3), t = "#" + n + n + r + r + s + s), t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & 255, 255 & t];
					else if ("hsl" === t.substr(0, 3)) if (i = p = t.match(_), e) {
						if (-1 !== t.indexOf("=")) return t.match(g)
					} else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, l = Number(i[2]) / 100, r = .5 >= l ? l * (a + 1) : l + a - l * a, n = 2 * l - r, i.length > 3 && (i[3] = Number(t[3])), i[0] = le(o + 1 / 3, n, r), i[1] = le(o, n, r), i[2] = le(o - 1 / 3, n, r);
					else i = t.match(_) || ae.transparent;
					i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
				} else i = ae.black;
				return e && !p && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, h = Math.max(n, r, s), c = Math.min(n, r, s), l = (h + c) / 2, h === c ? o = a = 0 : (u = h - c, a = l > .5 ? u / (2 - h - c) : u / (h + c), o = h === n ? (r - s) / u + (s > r ? 6 : 0) : h === r ? (s - n) / u + 2 : (n - r) / u + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i
			},
			ce = function(t, e) {
				var i, n, r, s = t.match(ue) || [],
					o = 0,
					a = s.length ? "" : t;
				for (i = 0; i < s.length; i++) n = s[i], r = t.substr(o, t.indexOf(n, o) - o), o += r.length + n.length, n = he(n, e), 3 === n.length && n.push(1), a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
				return a
			},
			ue = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
		for (h in ae) ue += "|" + h + "\\b";
		ue = new RegExp(ue + ")", "gi"), o.colorStringFilter = function(t) {
			var e, i = t[0] + t[1];
			ue.lastIndex = 0, ue.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), t[0] = ce(t[0], e), t[1] = ce(t[1], e))
		}, e.defaultStringFilter || (e.defaultStringFilter = o.colorStringFilter);
		var pe = function(t, e, i, n) {
				if (null == t) return function(t) {
					return t
				};
				var r, s = e ? (t.match(ue) || [""])[0] : "",
					o = t.split(s).join("").match(v) || [],
					a = t.substr(0, t.indexOf(o[0])),
					l = ")" === t.charAt(t.length - 1) ? ")" : "",
					h = -1 !== t.indexOf(" ") ? " " : ",",
					c = o.length,
					u = c > 0 ? o[0].replace(_, "") : "";
				return c ? r = e ?
				function(t) {
					var e, p, f, d;
					if ("number" == typeof t) t += u;
					else if (n && D.test(t)) {
						for (d = t.replace(D, "|").split("|"), f = 0; f < d.length; f++) d[f] = r(d[f]);
						return d.join(",")
					}
					if (e = (t.match(ue) || [s])[0], p = t.split(e).join("").match(v) || [], f = p.length, c > f--) for (; ++f < c;) p[f] = i ? p[(f - 1) / 2 | 0] : o[f];
					return a + p.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
				} : function(t) {
					var e, s, p;
					if ("number" == typeof t) t += u;
					else if (n && D.test(t)) {
						for (s = t.replace(D, "|").split("|"), p = 0; p < s.length; p++) s[p] = r(s[p]);
						return s.join(",")
					}
					if (e = t.match(v) || [], p = e.length, c > p--) for (; ++p < c;) e[p] = i ? e[(p - 1) / 2 | 0] : o[p];
					return a + e.join(h) + l
				} : function(t) {
					return t
				}
			},
			fe = function(t) {
				return t = t.split(","), function(e, i, n, r, s, o, a) {
					var l, h = (i + "").split(" ");
					for (a = {}, l = 0; 4 > l; l++) a[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
					return r.parse(e, a, s, o)
				}
			},
			de = (W._setPluginRatio = function(t) {
				this.plugin.setRatio(t);
				for (var e, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT, h = 1e-6; l;) e = a[l.v], l.r ? e = Math.round(e) : h > e && e > -h && (e = 0), l.t[l.p] = e, l = l._next;
				if (o.autoRotate && (o.autoRotate.rotation = a.rotation), 1 === t || 0 === t) for (l = o.firstMPT, s = 1 === t ? "e" : "b"; l;) {
					if (i = l.t, i.type) {
						if (1 === i.type) {
							for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
							i[s] = r
						}
					} else i[s] = i.s + i.xs0;
					l = l._next
				}
			}, function(t, e, i, n, r) {
				this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
			}),
			me = (W._parseToProxy = function(t, e, i, n, r, s) {
				var o, a, l, h, c, u = n,
					p = {},
					f = {},
					d = i._transform,
					m = I;
				for (i._transform = null, I = e, n = c = i.parse(t, e, n, r), I = m, s && (i._transform = d, u && (u._prev = null, u._prev && (u._prev._next = null))); n && n !== u;) {
					if (n.type <= 1 && (a = n.p, f[a] = n.s + n.c, p[a] = n.s, s || (h = new de(n, "s", a, h, n.r), n.c = 0), 1 === n.type)) for (o = n.l; --o > 0;) l = "xn" + o, a = n.p + "_" + l, f[a] = n.data[l], p[a] = n[l], s || (h = new de(n, l, a, h, n.rxp[l]));
					n = n._next
				}
				return {
					proxy: p,
					end: f,
					firstMPT: h,
					pt: c
				}
			}, W.CSSPropTween = function(t, e, n, r, o, a, l, h, c, u, p) {
				this.t = t, this.p = e, this.s = n, this.c = r, this.n = l || e, t instanceof me || s.push(this.n), this.r = h, this.type = a || 0, c && (this.pr = c, i = !0), this.b = void 0 === u ? n : u, this.e = void 0 === p ? n + r : p, o && (this._next = o, o._prev = this)
			}),
			_e = function(t, e, i, n, r, s) {
				var o = new me(t, e, i, n - i, r, -1, s);
				return o.b = i, o.e = o.xs0 = n, o
			},
			ge = o.parseComplex = function(t, e, i, n, r, s, o, a, l, h) {
				i = i || s || "", o = new me(t, e, 0, 0, o, h ? 2 : 1, null, !1, a, i, n), n += "";
				var u, p, f, d, m, v, y, x, w, T, b, P, k, S = i.split(", ").join(",").split(" "),
					C = n.split(", ").join(",").split(" "),
					O = S.length,
					A = c !== !1;
				for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (S = S.join(" ").replace(D, ", ").split(" "), C = C.join(" ").replace(D, ", ").split(" "), O = S.length), O !== C.length && (S = (s || "").split(" "), O = S.length), o.plugin = l, o.setRatio = h, ue.lastIndex = 0, u = 0; O > u; u++) if (d = S[u], m = C[u], x = parseFloat(d), x || 0 === x) o.appendXtra("", x, re(m, x), m.replace(g, ""), A && -1 !== m.indexOf("px"), !0);
				else if (r && ue.test(d)) P = "," === m.charAt(m.length - 1) ? ")," : ")", k = -1 !== m.indexOf("hsl") && z, d = he(d, k), m = he(m, k), w = d.length + m.length > 6, w && !z && 0 === m[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(C[u]).join("transparent")) : (z || (w = !1), k ? o.appendXtra(w ? "hsla(" : "hsl(", d[0], re(m[0], d[0]), ",", !1, !0).appendXtra("", d[1], re(m[1], d[1]), "%,", !1).appendXtra("", d[2], re(m[2], d[2]), w ? "%," : "%" + P, !1) : o.appendXtra(w ? "rgba(" : "rgb(", d[0], m[0] - d[0], ",", !0, !0).appendXtra("", d[1], m[1] - d[1], ",", !0).appendXtra("", d[2], m[2] - d[2], w ? "," : P, !0), w && (d = d.length < 4 ? 1 : d[3], o.appendXtra("", d, (m.length < 4 ? 1 : m[3]) - d, P, !1))), ue.lastIndex = 0;
				else if (v = d.match(_)) {
					if (y = m.match(g), !y || y.length !== v.length) return o;
					for (f = 0, p = 0; p < v.length; p++) b = v[p], T = d.indexOf(b, f), o.appendXtra(d.substr(f, T - f), Number(b), re(y[p], b), "", A && "px" === d.substr(T + b.length, 2), 0 === p), f = T + b.length;
					o["xs" + o.l] += d.substr(f)
				} else o["xs" + o.l] += o.l ? " " + m : m;
				if (-1 !== n.indexOf("=") && o.data) {
					for (P = o.xs0 + o.data.s, u = 1; u < o.l; u++) P += o["xs" + u] + o.data["xn" + u];
					o.e = P + o["xs" + u]
				}
				return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
			},
			ve = 9;
		for (h = me.prototype, h.l = h.pr = 0; --ve > 0;) h["xn" + ve] = 0, h["xs" + ve] = "";
		h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, n, r, s) {
			var o = this,
				a = o.l;
			return o["xs" + a] += s && a ? " " + t : t || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = e + i, o.rxp["xn" + a] = r, o["xn" + a] = e, o.plugin || (o.xfirst = new me(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
				s: e + i
			}, o.rxp = {}, o.s = e, o.c = i, o.r = r, o)) : (o["xs" + a] += e + (n || ""), o)
		};
		var ye = function(t, e) {
				e = e || {}, this.p = e.prefix ? U(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || pe(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
			},
			xe = W._registerComplexSpecialProp = function(t, e, i) {
				"object" != typeof e && (e = {
					parser: i
				});
				var n, r, s = t.split(","),
					o = e.defaultValue;
				for (i = i || [o], n = 0; n < s.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || o, r = new ye(s[n], e)
			},
			we = function(t) {
				if (!l[t]) {
					var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
					xe(t, {
						parser: function(t, i, n, r, s, o, h) {
							var c = a.com.greensock.plugins[e];
							return c ? (c._cssRegister(), l[n].parse(t, i, n, r, s, o, h)) : (V("Error: " + e + " js file not loaded."), s)
						}
					})
				}
			};
		h = ye.prototype, h.parseComplex = function(t, e, i, n, r, s) {
			var o, a, l, h, c, u, p = this.keyword;
			if (this.multi && (D.test(i) || D.test(e) ? (a = e.replace(D, "|").split("|"), l = i.replace(D, "|").split("|")) : p && (a = [e], l = [i])), l) {
				for (h = l.length > a.length ? l.length : a.length, o = 0; h > o; o++) e = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, p && (c = e.indexOf(p), u = i.indexOf(p), c !== u && (-1 === u ? a[o] = a[o].split(p).join("") : -1 === c && (a[o] += " " + p)));
				e = a.join(", "), i = l.join(", ")
			}
			return ge(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s)
		}, h.parse = function(t, e, i, n, s, o) {
			return this.parseComplex(t.style, this.format(Z(t, this.p, r, !1, this.dflt)), this.format(e), s, o)
		}, o.registerSpecialProp = function(t, e, i) {
			xe(t, {
				parser: function(t, n, r, s, o, a) {
					var l = new me(t, r, 0, 0, o, 2, r, !1, i);
					return l.plugin = a, l.setRatio = e(t, n, s._tween, r), l
				},
				priority: i
			})
		}, o.useSVGTransformAttr = p || f;
		var Te, be = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
			Pe = U("transform"),
			ke = j + "transform",
			Se = U("transformOrigin"),
			Ce = null !== U("perspective"),
			Oe = W.Transform = function() {
				this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = o.defaultForce3D !== !1 && Ce ? o.defaultForce3D || "auto" : !1
			},
			Ae = window.SVGElement,
			Ee = function(t, e, i) {
				var n, r = N.createElementNS("http://www.w3.org/2000/svg", t),
					s = /([a-z])([A-Z])/g;
				for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
				return e.appendChild(r), r
			},
			Re = N.documentElement,
			De = function() {
				var t, e, i, n = m || /Android/i.test(Y) && !window.chrome;
				return N.createElementNS && !n && (t = Ee("svg", Re), e = Ee("rect", t, {
					width: 100,
					height: 50,
					x: 100
				}), i = e.getBoundingClientRect().width, e.style[Se] = "50% 50%", e.style[Pe] = "scaleX(0.5)", n = i === e.getBoundingClientRect().width && !(f && Ce), Re.removeChild(t)), n
			}(),
			Me = function(t, e, i, n, r) {
				var s, a, l, h, c, u, p, f, d, m, _, g, v, y, x = t._gsTransform,
					w = Ne(t, !0);
				x && (v = x.xOrigin, y = x.yOrigin), (!n || (s = n.split(" ")).length < 2) && (p = t.getBBox(), e = ne(e).split(" "), s = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * p.width : parseFloat(e[0])) + p.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * p.height : parseFloat(e[1])) + p.y]), i.xOrigin = h = parseFloat(s[0]), i.yOrigin = c = parseFloat(s[1]), n && w !== Ie && (u = w[0], p = w[1], f = w[2], d = w[3], m = w[4], _ = w[5], g = u * d - p * f, a = h * (d / g) + c * (-f / g) + (f * _ - d * m) / g, l = h * (-p / g) + c * (u / g) - (u * _ - p * m) / g, h = i.xOrigin = s[0] = a, c = i.yOrigin = s[1] = l), x && (r || r !== !1 && o.defaultSmoothOrigin !== !1 ? (a = h - v, l = c - y, x.xOffset += a * w[0] + l * w[2] - a, x.yOffset += a * w[1] + l * w[3] - l) : x.xOffset = x.yOffset = 0), t.setAttribute("data-svg-origin", s.join(" "))
			},
			Le = function(t) {
				return !!(Ae && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
			},
			Ie = [1, 0, 0, 1, 0, 0],
			Ne = function(t, e) {
				var i, n, r, s, o, a = t._gsTransform || new Oe,
					l = 1e5;
				if (Pe ? n = Z(t, ke, null, !0) : t.currentStyle && (n = t.currentStyle.filter.match(E), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), a.x || 0, a.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, (a.svg || t.getBBox && Le(t)) && (i && -1 !== (t.style[Pe] + "").indexOf("matrix") && (n = t.style[Pe], i = 0), r = t.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (n = r, i = 0) : -1 !== r.indexOf("translate") && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Ie;
				for (r = (n || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], ve = r.length; --ve > -1;) s = Number(r[ve]), r[ve] = (o = s - (s |= 0)) ? (o * l + (0 > o ? -.5 : .5) | 0) / l + s : s;
				return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
			},
			Be = W.getTransform = function(t, i, n, s) {
				if (t._gsTransform && n && !s) return t._gsTransform;
				var a, l, h, c, u, p, f = n ? t._gsTransform || new Oe : new Oe,
					d = f.scaleX < 0,
					m = 2e-5,
					_ = 1e5,
					g = Ce ? parseFloat(Z(t, Se, i, !1, "0 0 0").split(" ")[2]) || f.zOrigin || 0 : 0,
					v = parseFloat(o.defaultTransformPerspective) || 0;
				if (f.svg = !(!t.getBBox || !Le(t)), f.svg && (Me(t, Z(t, Se, r, !1, "50% 50%") + "", f, t.getAttribute("data-svg-origin")), Te = o.useSVGTransformAttr || De), a = Ne(t), a !== Ie) {
					if (16 === a.length) {
						var y, x, w, T, b, P = a[0],
							k = a[1],
							S = a[2],
							C = a[3],
							O = a[4],
							A = a[5],
							E = a[6],
							R = a[7],
							D = a[8],
							M = a[9],
							I = a[10],
							N = a[12],
							B = a[13],
							F = a[14],
							X = a[11],
							W = Math.atan2(E, I);
						f.zOrigin && (F = -f.zOrigin, N = D * F - a[12], B = M * F - a[13], F = I * F + f.zOrigin - a[14]), f.rotationX = W * L, W && (T = Math.cos(-W), b = Math.sin(-W), y = O * T + D * b, x = A * T + M * b, w = E * T + I * b, D = O * -b + D * T, M = A * -b + M * T, I = E * -b + I * T, X = R * -b + X * T, O = y, A = x, E = w), W = Math.atan2(-S, I), f.rotationY = W * L, W && (T = Math.cos(-W), b = Math.sin(-W), y = P * T - D * b, x = k * T - M * b, w = S * T - I * b, M = k * b + M * T, I = S * b + I * T, X = C * b + X * T, P = y, k = x, S = w), W = Math.atan2(k, P), f.rotation = W * L, W && (T = Math.cos(-W), b = Math.sin(-W), P = P * T + O * b, x = k * T + A * b, A = k * -b + A * T, E = S * -b + E * T, k = x), f.rotationX && Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 && (f.rotationX = f.rotation = 0, f.rotationY = 180 - f.rotationY), f.scaleX = (Math.sqrt(P * P + k * k) * _ + .5 | 0) / _, f.scaleY = (Math.sqrt(A * A + M * M) * _ + .5 | 0) / _, f.scaleZ = (Math.sqrt(E * E + I * I) * _ + .5 | 0) / _, f.skewX = 0, f.perspective = X ? 1 / (0 > X ? -X : X) : 0, f.x = N, f.y = B, f.z = F, f.svg && (f.x -= f.xOrigin - (f.xOrigin * P - f.yOrigin * O), f.y -= f.yOrigin - (f.yOrigin * k - f.xOrigin * A))
					} else if (!(Ce && !s && a.length && f.x === a[4] && f.y === a[5] && (f.rotationX || f.rotationY) || void 0 !== f.x && "none" === Z(t, "display", i))) {
						var Y = a.length >= 6,
							z = Y ? a[0] : 1,
							H = a[1] || 0,
							V = a[2] || 0,
							j = Y ? a[3] : 1;
						f.x = a[4] || 0, f.y = a[5] || 0, h = Math.sqrt(z * z + H * H), c = Math.sqrt(j * j + V * V), u = z || H ? Math.atan2(H, z) * L : f.rotation || 0, p = V || j ? Math.atan2(V, j) * L + u : f.skewX || 0, Math.abs(p) > 90 && Math.abs(p) < 270 && (d ? (h *= -1, p += 0 >= u ? 180 : -180, u += 0 >= u ? 180 : -180) : (c *= -1, p += 0 >= p ? 180 : -180)), f.scaleX = h, f.scaleY = c, f.rotation = u, f.skewX = p, Ce && (f.rotationX = f.rotationY = f.z = 0, f.perspective = v, f.scaleZ = 1), f.svg && (f.x -= f.xOrigin - (f.xOrigin * z + f.yOrigin * V), f.y -= f.yOrigin - (f.xOrigin * H + f.yOrigin * j))
					}
					f.zOrigin = g;
					for (l in f) f[l] < m && f[l] > -m && (f[l] = 0)
				}
				return n && (t._gsTransform = f, f.svg && (Te && t.style[Pe] ? e.delayedCall(.001, function() {
					Ye(t.style, Pe)
				}) : !Te && t.getAttribute("transform") && e.delayedCall(.001, function() {
					t.removeAttribute("transform")
				}))), f
			},
			Fe = function(t) {
				var e, i, n = this.data,
					r = -n.rotation * M,
					s = r + n.skewX * M,
					o = 1e5,
					a = (Math.cos(r) * n.scaleX * o | 0) / o,
					l = (Math.sin(r) * n.scaleX * o | 0) / o,
					h = (Math.sin(s) * -n.scaleY * o | 0) / o,
					c = (Math.cos(s) * n.scaleY * o | 0) / o,
					u = this.t.style,
					p = this.t.currentStyle;
				if (p) {
					i = l, l = -h, h = -i, e = p.filter, u.filter = "";
					var f, d, _ = this.t.offsetWidth,
						g = this.t.offsetHeight,
						v = "absolute" !== p.position,
						y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + h + ", M22=" + c,
						T = n.x + _ * n.xPercent / 100,
						b = n.y + g * n.yPercent / 100;
					if (null != n.ox && (f = (n.oxp ? _ * n.ox * .01 : n.ox) - _ / 2, d = (n.oyp ? g * n.oy * .01 : n.oy) - g / 2, T += f - (f * a + d * l), b += d - (f * h + d * c)), v ? (f = _ / 2, d = g / 2, y += ", Dx=" + (f - (f * a + d * l) + T) + ", Dy=" + (d - (f * h + d * c) + b) + ")") : y += ", sizingMethod='auto expand')", u.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(R, y) : y + " " + e, (0 === t || 1 === t) && 1 === a && 0 === l && 0 === h && 1 === c && (v && -1 === y.indexOf("Dx=0, Dy=0") || w.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && u.removeAttribute("filter")), !v) {
						var P, k, S, C = 8 > m ? 1 : -1;
						for (f = n.ieOffsetX || 0, d = n.ieOffsetY || 0, n.ieOffsetX = Math.round((_ - ((0 > a ? -a : a) * _ + (0 > l ? -l : l) * g)) / 2 + T), n.ieOffsetY = Math.round((g - ((0 > c ? -c : c) * g + (0 > h ? -h : h) * _)) / 2 + b), ve = 0; 4 > ve; ve++) k = ee[ve], P = p[k], i = -1 !== P.indexOf("px") ? parseFloat(P) : $(this.t, k, parseFloat(P), P.replace(x, "")) || 0, S = i !== n[k] ? 2 > ve ? -n.ieOffsetX : -n.ieOffsetY : 2 > ve ? f - n.ieOffsetX : d - n.ieOffsetY, u[k] = (n[k] = Math.round(i - S * (0 === ve || 2 === ve ? 1 : C))) + "px"
					}
				}
			},
			Xe = W.set3DTransformRatio = W.setTransformRatio = function(t) {
				var e, i, n, r, s, o, a, l, h, c, u, p, d, m, _, g, v, y, x, w, T, b, P, k = this.data,
					S = this.t.style,
					C = k.rotation,
					O = k.rotationX,
					A = k.rotationY,
					E = k.scaleX,
					R = k.scaleY,
					D = k.scaleZ,
					L = k.x,
					I = k.y,
					N = k.z,
					B = k.svg,
					F = k.perspective,
					X = k.force3D;
				if (!(((1 !== t && 0 !== t || "auto" !== X || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && X || N || F || A || O || 1 !== D) && (!Te || !B) && Ce)) return void(C || k.skewX || B ? (C *= M, b = k.skewX * M, P = 1e5, e = Math.cos(C) * E, r = Math.sin(C) * E, i = Math.sin(C - b) * -R, s = Math.cos(C - b) * R, b && "simple" === k.skewType && (v = Math.tan(b), v = Math.sqrt(1 + v * v), i *= v, s *= v, k.skewY && (e *= v, r *= v)), B && (L += k.xOrigin - (k.xOrigin * e + k.yOrigin * i) + k.xOffset, I += k.yOrigin - (k.xOrigin * r + k.yOrigin * s) + k.yOffset, Te && (k.xPercent || k.yPercent) && (m = this.t.getBBox(), L += .01 * k.xPercent * m.width, I += .01 * k.yPercent * m.height), m = 1e-6, m > L && L > -m && (L = 0), m > I && I > -m && (I = 0)), x = (e * P | 0) / P + "," + (r * P | 0) / P + "," + (i * P | 0) / P + "," + (s * P | 0) / P + "," + L + "," + I + ")", B && Te ? this.t.setAttribute("transform", "matrix(" + x) : S[Pe] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + x) : S[Pe] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + R + "," + L + "," + I + ")");
				if (f && (m = 1e-4, m > E && E > -m && (E = D = 2e-5), m > R && R > -m && (R = D = 2e-5), !F || k.z || k.rotationX || k.rotationY || (F = 0)), C || k.skewX) C *= M, _ = e = Math.cos(C), g = r = Math.sin(C), k.skewX && (C -= k.skewX * M, _ = Math.cos(C), g = Math.sin(C), "simple" === k.skewType && (v = Math.tan(k.skewX * M), v = Math.sqrt(1 + v * v), _ *= v, g *= v, k.skewY && (e *= v, r *= v))), i = -g, s = _;
				else {
					if (!(A || O || 1 !== D || F || B)) return void(S[Pe] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) translate3d(" : "translate3d(") + L + "px," + I + "px," + N + "px)" + (1 !== E || 1 !== R ? " scale(" + E + "," + R + ")" : ""));
					e = s = 1, i = r = 0
				}
				h = 1, n = o = a = l = c = u = 0, p = F ? -1 / F : 0, d = k.zOrigin, m = 1e-6, w = ",", T = "0", C = A * M, C && (_ = Math.cos(C), g = Math.sin(C), a = -g, c = p * -g, n = e * g, o = r * g, h = _, p *= _, e *= _, r *= _), C = O * M, C && (_ = Math.cos(C), g = Math.sin(C), v = i * _ + n * g, y = s * _ + o * g, l = h * g, u = p * g, n = i * -g + n * _, o = s * -g + o * _, h *= _, p *= _, i = v, s = y), 1 !== D && (n *= D, o *= D, h *= D, p *= D), 1 !== R && (i *= R, s *= R, l *= R, u *= R), 1 !== E && (e *= E, r *= E, a *= E, c *= E), (d || B) && (d && (L += n * -d, I += o * -d, N += h * -d + d), B && (L += k.xOrigin - (k.xOrigin * e + k.yOrigin * i) + k.xOffset, I += k.yOrigin - (k.xOrigin * r + k.yOrigin * s) + k.yOffset), m > L && L > -m && (L = T), m > I && I > -m && (I = T), m > N && N > -m && (N = 0)), x = k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix3d(" : "matrix3d(", x += (m > e && e > -m ? T : e) + w + (m > r && r > -m ? T : r) + w + (m > a && a > -m ? T : a), x += w + (m > c && c > -m ? T : c) + w + (m > i && i > -m ? T : i) + w + (m > s && s > -m ? T : s), O || A || 1 !== D ? (x += w + (m > l && l > -m ? T : l) + w + (m > u && u > -m ? T : u) + w + (m > n && n > -m ? T : n), x += w + (m > o && o > -m ? T : o) + w + (m > h && h > -m ? T : h) + w + (m > p && p > -m ? T : p) + w) : x += ",0,0,0,0,1,0,", x += L + w + I + w + N + w + (F ? 1 + -N / F : 1) + ")", S[Pe] = x
			};
		h = Oe.prototype, h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0, h.scaleX = h.scaleY = h.scaleZ = 1, xe("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
			parser: function(t, e, i, n, s, a, l) {
				if (n._lastParsedTransform === l) return s;
				n._lastParsedTransform = l;
				var h, c, u, p, f, d, m, _, g, v, y = t._gsTransform,
					x = t.style,
					w = 1e-6,
					T = be.length,
					b = l,
					P = {},
					k = "transformOrigin";
				if (l.display ? (p = Z(t, "display"), x.display = "block", h = Be(t, r, !0, l.parseTransform), x.display = p) : h = Be(t, r, !0, l.parseTransform), n._transform = h, "string" == typeof b.transform && Pe) p = F.style, p[Pe] = b.transform, p.display = "block", p.position = "absolute", N.body.appendChild(F), c = Be(F, null, !1), N.body.removeChild(F), c.perspective || (c.perspective = h.perspective), null != b.xPercent && (c.xPercent = se(b.xPercent, h.xPercent)), null != b.yPercent && (c.yPercent = se(b.yPercent, h.yPercent));
				else if ("object" == typeof b) {
					if (c = {
						scaleX: se(null != b.scaleX ? b.scaleX : b.scale, h.scaleX),
						scaleY: se(null != b.scaleY ? b.scaleY : b.scale, h.scaleY),
						scaleZ: se(b.scaleZ, h.scaleZ),
						x: se(b.x, h.x),
						y: se(b.y, h.y),
						z: se(b.z, h.z),
						xPercent: se(b.xPercent, h.xPercent),
						yPercent: se(b.yPercent, h.yPercent),
						perspective: se(b.transformPerspective, h.perspective)
					}, _ = b.directionalRotation, null != _) if ("object" == typeof _) for (p in _) b[p] = _[p];
					else b.rotation = _;
					"string" == typeof b.x && -1 !== b.x.indexOf("%") && (c.x = 0, c.xPercent = se(b.x, h.xPercent)), "string" == typeof b.y && -1 !== b.y.indexOf("%") && (c.y = 0, c.yPercent = se(b.y, h.yPercent)), c.rotation = oe("rotation" in b ? b.rotation : "shortRotation" in b ? b.shortRotation + "_short" : "rotationZ" in b ? b.rotationZ : h.rotation, h.rotation, "rotation", P), Ce && (c.rotationX = oe("rotationX" in b ? b.rotationX : "shortRotationX" in b ? b.shortRotationX + "_short" : h.rotationX || 0, h.rotationX, "rotationX", P), c.rotationY = oe("rotationY" in b ? b.rotationY : "shortRotationY" in b ? b.shortRotationY + "_short" : h.rotationY || 0, h.rotationY, "rotationY", P)), c.skewX = null == b.skewX ? h.skewX : oe(b.skewX, h.skewX), c.skewY = null == b.skewY ? h.skewY : oe(b.skewY, h.skewY), (u = c.skewY - h.skewY) && (c.skewX += u, c.rotation += u)
				}
				for (Ce && null != b.force3D && (h.force3D = b.force3D, m = !0), h.skewType = b.skewType || h.skewType || o.defaultSkewType, d = h.force3D || h.z || h.rotationX || h.rotationY || c.z || c.rotationX || c.rotationY || c.perspective, d || null == b.scale || (c.scaleZ = 1); --T > -1;) i = be[T], f = c[i] - h[i], (f > w || -w > f || null != b[i] || null != I[i]) && (m = !0, s = new me(h, i, h[i], f, s), i in P && (s.e = P[i]), s.xs0 = 0, s.plugin = a, n._overwriteProps.push(s.n));
				return f = b.transformOrigin, h.svg && (f || b.svgOrigin) && (g = h.xOffset, v = h.yOffset, Me(t, ne(f), c, b.svgOrigin, b.smoothOrigin), s = _e(h, "xOrigin", (y ? h : c).xOrigin, c.xOrigin, s, k), s = _e(h, "yOrigin", (y ? h : c).yOrigin, c.yOrigin, s, k), (g !== h.xOffset || v !== h.yOffset) && (s = _e(h, "xOffset", y ? g : h.xOffset, h.xOffset, s, k), s = _e(h, "yOffset", y ? v : h.yOffset, h.yOffset, s, k)), f = Te ? null : "0px 0px"), (f || Ce && d && h.zOrigin) && (Pe ? (m = !0, i = Se, f = (f || Z(t, i, r, !1, "50% 50%")) + "", s = new me(x, i, 0, 0, s, -1, k), s.b = x[i], s.plugin = a, Ce ? (p = h.zOrigin, f = f.split(" "), h.zOrigin = (f.length > 2 && (0 === p || "0px" !== f[2]) ? parseFloat(f[2]) : p) || 0, s.xs0 = s.e = f[0] + " " + (f[1] || "50%") + " 0px", s = new me(h, "zOrigin", 0, 0, s, -1, s.n), s.b = p, s.xs0 = s.e = h.zOrigin) : s.xs0 = s.e = f) : ne(f + "", h)), m && (n._transformType = h.svg && Te || !d && 3 !== this._transformType ? 2 : 3), s
			},
			prefix: !0
		}), xe("boxShadow", {
			defaultValue: "0px 0px 0px 0px #999",
			prefix: !0,
			color: !0,
			multi: !0,
			keyword: "inset"
		}), xe("borderRadius", {
			defaultValue: "0px",
			parser: function(t, e, i, s, o) {
				e = this.format(e);
				var a, l, h, c, u, p, f, d, m, _, g, v, y, x, w, T, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
					P = t.style;
				for (m = parseFloat(t.offsetWidth), _ = parseFloat(t.offsetHeight), a = e.split(" "), l = 0; l < b.length; l++) this.p.indexOf("border") && (b[l] = U(b[l])), u = c = Z(t, b[l], r, !1, "0px"), -1 !== u.indexOf(" ") && (c = u.split(" "), u = c[0], c = c[1]), p = h = a[l], f = parseFloat(u), v = u.substr((f + "").length), y = "=" === p.charAt(1), y ? (d = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), d *= parseFloat(p), g = p.substr((d + "").length - (0 > d ? 1 : 0)) || "") : (d = parseFloat(p), g = p.substr((d + "").length)), "" === g && (g = n[i] || v), g !== v && (x = $(t, "borderLeft", f, v), w = $(t, "borderTop", f, v), "%" === g ? (u = x / m * 100 + "%", c = w / _ * 100 + "%") : "em" === g ? (T = $(t, "borderLeft", 1, "em"), u = x / T + "em", c = w / T + "em") : (u = x + "px", c = w + "px"), y && (p = parseFloat(u) + d + g, h = parseFloat(c) + d + g)), o = ge(P, b[l], u + " " + c, p + " " + h, !1, "0px", o);
				return o
			},
			prefix: !0,
			formatter: pe("0px 0px 0px 0px", !1, !0)
		}), xe("backgroundPosition", {
			defaultValue: "0 0",
			parser: function(t, e, i, n, s, o) {
				var a, l, h, c, u, p, f = "background-position",
					d = r || G(t, null),
					_ = this.format((d ? m ? d.getPropertyValue(f + "-x") + " " + d.getPropertyValue(f + "-y") : d.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
					g = this.format(e);
				if (-1 !== _.indexOf("%") != (-1 !== g.indexOf("%")) && (p = Z(t, "backgroundImage").replace(C, ""), p && "none" !== p)) {
					for (a = _.split(" "), l = g.split(" "), X.setAttribute("src", p), h = 2; --h > -1;) _ = a[h], c = -1 !== _.indexOf("%"), c !== (-1 !== l[h].indexOf("%")) && (u = 0 === h ? t.offsetWidth - X.width : t.offsetHeight - X.height, a[h] = c ? parseFloat(_) / 100 * u + "px" : parseFloat(_) / u * 100 + "%");
					_ = a.join(" ")
				}
				return this.parseComplex(t.style, _, g, s, o)
			},
			formatter: ne
		}), xe("backgroundSize", {
			defaultValue: "0 0",
			formatter: ne
		}), xe("perspective", {
			defaultValue: "0px",
			prefix: !0
		}), xe("perspectiveOrigin", {
			defaultValue: "50% 50%",
			prefix: !0
		}), xe("transformStyle", {
			prefix: !0
		}), xe("backfaceVisibility", {
			prefix: !0
		}), xe("userSelect", {
			prefix: !0
		}), xe("margin", {
			parser: fe("marginTop,marginRight,marginBottom,marginLeft")
		}), xe("padding", {
			parser: fe("paddingTop,paddingRight,paddingBottom,paddingLeft")
		}), xe("clip", {
			defaultValue: "rect(0px,0px,0px,0px)",
			parser: function(t, e, i, n, s, o) {
				var a, l, h;
				return 9 > m ? (l = t.currentStyle, h = 8 > m ? " " : ",", a = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (a = this.format(Z(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, s, o)
			}
		}), xe("textShadow", {
			defaultValue: "0px 0px 0px #999",
			color: !0,
			multi: !0
		}), xe("autoRound,strictUnits", {
			parser: function(t, e, i, n, r) {
				return r
			}
		}), xe("border", {
			defaultValue: "0px solid #000",
			parser: function(t, e, i, n, s, o) {
				return this.parseComplex(t.style, this.format(Z(t, "borderTopWidth", r, !1, "0px") + " " + Z(t, "borderTopStyle", r, !1, "solid") + " " + Z(t, "borderTopColor", r, !1, "#000")), this.format(e), s, o)
			},
			color: !0,
			formatter: function(t) {
				var e = t.split(" ");
				return e[0] + " " + (e[1] || "solid") + " " + (t.match(ue) || ["#000"])[0]
			}
		}), xe("borderWidth", {
			parser: fe("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
		}), xe("float,cssFloat,styleFloat", {
			parser: function(t, e, i, n, r) {
				var s = t.style,
					o = "cssFloat" in s ? "cssFloat" : "styleFloat";
				return new me(s, o, 0, 0, r, -1, i, !1, 0, s[o], e)
			}
		});
		var We = function(t) {
				var e, i = this.t,
					n = i.filter || Z(this.data, "filter") || "",
					r = this.s + this.c * t | 0;
				100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), e = !Z(this.data, "filter")) : (i.filter = n.replace(b, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(w, "opacity=" + r))
			};
		xe("opacity,alpha,autoAlpha", {
			defaultValue: "1",
			parser: function(t, e, i, n, s, o) {
				var a = parseFloat(Z(t, "opacity", r, !1, "1")),
					l = t.style,
					h = "autoAlpha" === i;
				return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), h && 1 === a && "hidden" === Z(t, "visibility", r) && 0 !== e && (a = 0), z ? s = new me(l, "opacity", a, e - a, s) : (s = new me(l, "opacity", 100 * a, 100 * (e - a), s), s.xn1 = h ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = t, s.plugin = o, s.setRatio = We), h && (s = new me(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
			}
		});
		var Ye = function(t, e) {
				e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(k, "-$1").toLowerCase())) : t.removeAttribute(e))
			},
			ze = function(t) {
				if (this.t._gsClassPT = this, 1 === t || 0 === t) {
					this.t.setAttribute("class", 0 === t ? this.b : this.e);
					for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Ye(i, e.p), e = e._next;
					1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
				} else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
			};
		xe("className", {
			parser: function(t, e, n, s, o, a, l) {
				var h, c, u, p, f, d = t.getAttribute("class") || "",
					m = t.style.cssText;
				if (o = s._classNamePT = new me(t, n, 0, 0, o, 2), o.setRatio = ze, o.pr = -11, i = !0, o.b = d, c = K(t, r), u = t._gsClassPT) {
					for (p = {}, f = u.data; f;) p[f.p] = 1, f = f._next;
					u.setRatio(1)
				}
				return t._gsClassPT = o, o.e = "=" !== e.charAt(1) ? e : d.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", o.e), h = J(t, c, K(t), l, p), t.setAttribute("class", d), o.data = h.firstMPT, t.style.cssText = m, o = o.xfirst = s.parse(t, h.difs, o, a)
			}
		});
		var He = function(t) {
				if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
					var e, i, n, r, s, o = this.t.style,
						a = l.transform.parse;
					if ("all" === this.e) o.cssText = "", r = !0;
					else for (e = this.e.split(" ").join("").split(","), n = e.length; --n > -1;) i = e[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Se : l[i].p), Ye(o, i);
					r && (Ye(o, Pe), s = this.t._gsTransform, s && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
				}
			};
		for (xe("clearProps", {
			parser: function(t, e, n, r, s) {
				return s = new me(t, n, 0, 0, s, 2), s.setRatio = He, s.e = e, s.pr = -10, s.data = r._tween, i = !0, s
			}
		}), h = "bezier,throwProps,physicsProps,physics2D".split(","), ve = h.length; ve--;) we(h[ve]);
		h = o.prototype, h._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function(t, e, a) {
			if (!t.nodeType) return !1;
			this._target = t, this._tween = a, this._vars = e, c = e.autoRound, i = !1, n = e.suffixMap || o.suffixMap, r = G(t, ""), s = this._overwriteProps;
			var h, f, m, _, g, v, y, x, w, b = t.style;
			if (u && "" === b.zIndex && (h = Z(t, "zIndex", r), ("auto" === h || "" === h) && this._addLazySet(b, "zIndex", 0)), "string" == typeof e && (_ = b.cssText, h = K(t, r), b.cssText = _ + ";" + e, h = J(t, h, K(t)).difs, !z && T.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, b.cssText = _), this._firstPT = f = e.className ? l.className.parse(t, e.className, "className", this, null, null, e) : this.parse(t, e, null), this._transformType) {
				for (w = 3 === this._transformType, Pe ? p && (u = !0, "" === b.zIndex && (y = Z(t, "zIndex", r), ("auto" === y || "" === y) && this._addLazySet(b, "zIndex", 0)), d && this._addLazySet(b, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (w ? "visible" : "hidden"))) : b.zoom = 1, m = f; m && m._next;) m = m._next;
				x = new me(t, "transform", 0, 0, null, 2), this._linkCSSP(x, null, m), x.setRatio = Pe ? Xe : Fe, x.data = this._transform || Be(t, r, !0), x.tween = a, x.pr = -1, s.pop()
			}
			if (i) {
				for (; f;) {
					for (v = f._next, m = _; m && m.pr > f.pr;) m = m._next;
					(f._prev = m ? m._prev : g) ? f._prev._next = f : _ = f, (f._next = m) ? m._prev = f : g = f, f = v
				}
				this._firstPT = _
			}
			return !0
		}, h.parse = function(t, e, i, s) {
			var o, a, h, u, p, f, d, m, _, g, v = t.style;
			for (o in e) f = e[o], a = l[o], a ? i = a.parse(t, f, o, this, i, s, e) : (p = Z(t, o, r) + "", _ = "string" == typeof f, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || _ && P.test(f) ? (_ || (f = he(f), f = (f.length > 3 ? "rgba(" : "rgb(") + f.join(",") + ")"), i = ge(v, o, p, f, !0, "transparent", i, 0, s)) : !_ || -1 === f.indexOf(" ") && -1 === f.indexOf(",") ? (h = parseFloat(p), d = h || 0 === h ? p.substr((h + "").length) : "", ("" === p || "auto" === p) && ("width" === o || "height" === o ? (h = ie(t, o, r), d = "px") : "left" === o || "top" === o ? (h = Q(t, o, r), d = "px") : (h = "opacity" !== o ? 0 : 1, d = "")), g = _ && "=" === f.charAt(1), g ? (u = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), u *= parseFloat(f), m = f.replace(x, "")) : (u = parseFloat(f), m = _ ? f.replace(x, "") : ""), "" === m && (m = o in n ? n[o] : d), f = u || 0 === u ? (g ? u + h : u) + m : e[o], d !== m && "" !== m && (u || 0 === u) && h && (h = $(t, o, h, d), "%" === m ? (h /= $(t, o, 100, "%") / 100, e.strictUnits !== !0 && (p = h + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? h /= $(t, o, 1, m) : "px" !== m && (u = $(t, o, u, m), m = "px"), g && (u || 0 === u) && (f = u + h + m)), g && (u += h), !h && 0 !== h || !u && 0 !== u ? void 0 !== v[o] && (f || f + "" != "NaN" && null != f) ? (i = new me(v, o, u || h || 0, 0, i, -1, o, !1, 0, p, f), i.xs0 = "none" !== f || "display" !== o && -1 === o.indexOf("Style") ? f : p) : V("invalid " + o + " tween value: " + e[o]) : (i = new me(v, o, h, u - h, i, 0, o, c !== !1 && ("px" === m || "zIndex" === o), 0, p, f), i.xs0 = m)) : i = ge(v, o, p, f, !0, null, i, 0, s)), s && i && !i.plugin && (i.plugin = s);
			return i
		}, h.setRatio = function(t) {
			var e, i, n, r = this._firstPT,
				s = 1e-6;
			if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (; r;) {
				if (e = r.c * t + r.s, r.r ? e = Math.round(e) : s > e && e > -s && (e = 0), r.type) if (1 === r.type) if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
				else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
				else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
				else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
				else {
					for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
					r.t[r.p] = i
				} else - 1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
				else r.t[r.p] = e + r.xs0;
				r = r._next
			} else for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
			else for (; r;) {
				if (2 !== r.type) if (r.r && -1 !== r.type) if (e = Math.round(r.s + r.c), r.type) {
					if (1 === r.type) {
						for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
						r.t[r.p] = i
					}
				} else r.t[r.p] = e + r.xs0;
				else r.t[r.p] = r.e;
				else r.setRatio(t);
				r = r._next
			}
		}, h._enableTransforms = function(t) {
			this._transform = this._transform || Be(this._target, r, !0), this._transformType = this._transform.svg && Te || !t && 3 !== this._transformType ? 2 : 3
		};
		var Ve = function() {
				this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
			};
		h._addLazySet = function(t, e, i) {
			var n = this._firstPT = new me(t, e, 0, 0, this._firstPT, 2);
			n.e = i, n.setRatio = Ve, n.data = this
		}, h._linkCSSP = function(t, e, i, n) {
			return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
		}, h._kill = function(e) {
			var i, n, r, s = e;
			if (e.autoAlpha || e.alpha) {
				s = {};
				for (n in e) s[n] = e[n];
				s.opacity = 1, s.autoAlpha && (s.visibility = 1)
			}
			return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, s)
		};
		var je = function(t, e, i) {
				var n, r, s, o;
				if (t.slice) for (r = t.length; --r > -1;) je(t[r], e, i);
				else for (n = t.childNodes, r = n.length; --r > -1;) s = n[r], o = s.type, s.style && (e.push(K(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || je(s, e, i)
			};
		return o.cascadeTo = function(t, i, n) {
			var r, s, o, a, l = e.to(t, i, n),
				h = [l],
				c = [],
				u = [],
				p = [],
				f = e._internals.reservedProps;
			for (t = l._targets || l.target, je(t, c, p), l.render(i, !0, !0), je(t, u), l.render(0, !0, !0), l._enabled(!0), r = p.length; --r > -1;) if (s = J(p[r], c[r], u[r]), s.firstMPT) {
				s = s.difs;
				for (o in n) f[o] && (s[o] = n[o]);
				a = {};
				for (o in s) a[o] = c[r][o];
				h.push(e.fromTo(p[r], i, a, s))
			}
			return h
		}, t.activate([o]), o
	}, !0), function() {
		var t = _gsScope._gsDefine.plugin({
			propName: "roundProps",
			version: "1.5",
			priority: -1,
			API: 2,
			init: function(t, e, i) {
				return this._tween = i, !0
			}
		}),
			e = function(t) {
				for (; t;) t.f || t.blob || (t.r = 1), t = t._next
			},
			i = t.prototype;
		i._onInitAllProps = function() {
			for (var t, i, n, r = this._tween, s = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","), o = s.length, a = {}, l = r._propLookup.roundProps; --o > -1;) a[s[o]] = 1;
			for (o = s.length; --o > -1;) for (t = s[o], i = r._firstPT; i;) n = i._next, i.pg ? i.t._roundProps(a, !0) : i.n === t && (2 === i.f && i.t ? e(i.t._firstPT) : (this._add(i.t, t, i.s, i.c), n && (n._prev = i._prev), i._prev ? i._prev._next = n : r._firstPT === i && (r._firstPT = n), i._next = i._prev = null, r._propLookup[t] = l)), i = n;
			return !1
		}, i._add = function(t, e, i, n) {
			this._addTween(t, e, i, i + n, e, !0), this._overwriteProps.push(e)
		}
	}(), function() {
		_gsScope._gsDefine.plugin({
			propName: "attr",
			API: 2,
			version: "0.5.0",
			init: function(t, e) {
				var i;
				if ("function" != typeof t.setAttribute) return !1;
				for (i in e) this._addTween(t, "setAttribute", t.getAttribute(i) + "", e[i] + "", i, !1, i), this._overwriteProps.push(i);
				return !0
			}
		})
	}(), _gsScope._gsDefine.plugin({
		propName: "directionalRotation",
		version: "0.2.1",
		API: 2,
		init: function(t, e) {
			"object" != typeof e && (e = {
				rotation: e
			}), this.finals = {};
			var i, n, r, s, o, a, l = e.useRadians === !0 ? 2 * Math.PI : 360,
				h = 1e-6;
			for (i in e)"useRadians" !== i && (a = (e[i] + "").split("_"), n = a[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), s = this.finals[i] = "string" == typeof n && "=" === n.charAt(1) ? r + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2)) : Number(n) || 0, o = s - r, a.length && (n = a.join("_"), -1 !== n.indexOf("short") && (o %= l, o !== o % (l / 2) && (o = 0 > o ? o + l : o - l)), -1 !== n.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * l) % l - (o / l | 0) * l : -1 !== n.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * l) % l - (o / l | 0) * l)), (o > h || -h > o) && (this._addTween(t, i, r, r + o, i), this._overwriteProps.push(i)));
			return !0
		},
		set: function(t) {
			var e;
			if (1 !== t) this._super.setRatio.call(this, t);
			else for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
		}
	})._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
		var e, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
			s = r.com.greensock,
			o = 2 * Math.PI,
			a = Math.PI / 2,
			l = s._class,
			h = function(e, i) {
				var n = l("easing." + e, function() {}, !0),
					r = n.prototype = new t;
				return r.constructor = n, r.getRatio = i, n
			},
			c = t.register ||
		function() {}, u = function(t, e, i, n) {
			var r = l("easing." + t, {
				easeOut: new e,
				easeIn: new i,
				easeInOut: new n
			}, !0);
			return c(r, t), r
		}, p = function(t, e, i) {
			this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
		}, f = function(e, i) {
			var n = l("easing." + e, function(t) {
				this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
			}, !0),
				r = n.prototype = new t;
			return r.constructor = n, r.getRatio = i, r.config = function(t) {
				return new n(t)
			}, n
		}, d = u("Back", f("BackOut", function(t) {
			return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
		}), f("BackIn", function(t) {
			return t * t * ((this._p1 + 1) * t - this._p1)
		}), f("BackInOut", function(t) {
			return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
		})), m = l("easing.SlowMo", function(t, e, i) {
			e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
		}, !0), _ = m.prototype = new t;
		return _.constructor = m, _.getRatio = function(t) {
			var e = t + (.5 - t) * this._p;
			return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
		}, m.ease = new m(.7, .7), _.config = m.config = function(t, e, i) {
			return new m(t, e, i)
		}, e = l("easing.SteppedEase", function(t) {
			t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
		}, !0), _ = e.prototype = new t, _.constructor = e, _.getRatio = function(t) {
			return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
		}, _.config = e.config = function(t) {
			return new e(t)
		}, i = l("easing.RoughEase", function(e) {
			e = e || {};
			for (var i, n, r, s, o, a, l = e.taper || "none", h = [], c = 0, u = 0 | (e.points || 20), f = u, d = e.randomize !== !1, m = e.clamp === !0, _ = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = d ? Math.random() : 1 / u * f, n = _ ? _.getRatio(i) : i, "none" === l ? r = g : "out" === l ? (s = 1 - i, r = s * s * g) : "in" === l ? r = i * i * g : .5 > i ? (s = 2 * i, r = s * s * .5 * g) : (s = 2 * (1 - i), r = s * s * .5 * g), d ? n += Math.random() * r - .5 * r : f % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), h[c++] = {
				x: i,
				y: n
			};
			for (h.sort(function(t, e) {
				return t.x - e.x
			}), a = new p(1, 1, null), f = u; --f > -1;) o = h[f], a = new p(o.x, o.y, a);
			this._prev = new p(0, 0, 0 !== a.t ? a : a.next)
		}, !0), _ = i.prototype = new t, _.constructor = i, _.getRatio = function(t) {
			var e = this._prev;
			if (t > e.t) {
				for (; e.next && t >= e.t;) e = e.next;
				e = e.prev
			} else for (; e.prev && t <= e.t;) e = e.prev;
			return this._prev = e, e.v + (t - e.t) / e.gap * e.c
		}, _.config = function(t) {
			return new i(t)
		}, i.ease = new i, u("Bounce", h("BounceOut", function(t) {
			return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
		}), h("BounceIn", function(t) {
			return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
		}), h("BounceInOut", function(t) {
			var e = .5 > t;
			return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
		})), u("Circ", h("CircOut", function(t) {
			return Math.sqrt(1 - (t -= 1) * t)
		}), h("CircIn", function(t) {
			return -(Math.sqrt(1 - t * t) - 1)
		}), h("CircInOut", function(t) {
			return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
		})), n = function(e, i, n) {
			var r = l("easing." + e, function(t, e) {
				this._p1 = t >= 1 ? t : 1, this._p2 = (e || n) / (1 > t ? t : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
			}, !0),
				s = r.prototype = new t;
			return s.constructor = r, s.getRatio = i, s.config = function(t, e) {
				return new r(t, e)
			}, r
		}, u("Elastic", n("ElasticOut", function(t) {
			return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
		}, .3), n("ElasticIn", function(t) {
			return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2))
		}, .3), n("ElasticInOut", function(t) {
			return (t *= 2) < 1 ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
		}, .45)), u("Expo", h("ExpoOut", function(t) {
			return 1 - Math.pow(2, -10 * t)
		}), h("ExpoIn", function(t) {
			return Math.pow(2, 10 * (t - 1)) - .001
		}), h("ExpoInOut", function(t) {
			return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
		})), u("Sine", h("SineOut", function(t) {
			return Math.sin(t * a)
		}), h("SineIn", function(t) {
			return -Math.cos(t * a) + 1
		}), h("SineInOut", function(t) {
			return -.5 * (Math.cos(Math.PI * t) - 1)
		})), l("easing.EaseLookup", {
			find: function(e) {
				return t.map[e]
			}
		}, !0), c(r.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), d
	}, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function(t, e) {
	"use strict";
	var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
	if (!i.TweenLite) {
		var n, r, s, o, a, l = function(t) {
				var e, n = t.split("."),
					r = i;
				for (e = 0; e < n.length; e++) r[n[e]] = r = r[n[e]] || {};
				return r
			},
			h = l("com.greensock"),
			c = 1e-10,
			u = function(t) {
				var e, i = [],
					n = t.length;
				for (e = 0; e !== n; i.push(t[e++]));
				return i
			},
			p = function() {},
			f = function() {
				var t = Object.prototype.toString,
					e = t.call([]);
				return function(i) {
					return null != i && (i instanceof Array || "object" == typeof i && !! i.push && t.call(i) === e)
				}
			}(),
			d = {},
			m = function(n, r, s, o) {
				this.sc = d[n] ? d[n].sc : [], d[n] = this, this.gsClass = null, this.func = s;
				var a = [];
				this.check = function(h) {
					for (var c, u, p, f, _, g = r.length, v = g; --g > -1;)(c = d[r[g]] || new m(r[g], [])).gsClass ? (a[g] = c.gsClass, v--) : h && c.sc.push(this);
					if (0 === v && s) for (u = ("com.greensock." + n).split("."), p = u.pop(), f = l(u.join("."))[p] = this.gsClass = s.apply(s, a), o && (i[p] = f, _ = "undefined" != typeof module && module.exports, !_ && "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
						return f
					}) : n === e && _ && (module.exports = f)), g = 0; g < this.sc.length; g++) this.sc[g].check()
				}, this.check(!0)
			},
			_ = t._gsDefine = function(t, e, i, n) {
				return new m(t, e, i, n)
			},
			g = h._class = function(t, e, i) {
				return e = e ||
				function() {}, _(t, [], function() {
					return e
				}, i), e
			};
		_.globals = i;
		var v = [0, 0, 1, 1],
			y = [],
			x = g("easing.Ease", function(t, e, i, n) {
				this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? v.concat(e) : v
			}, !0),
			w = x.map = {},
			T = x.register = function(t, e, i, n) {
				for (var r, s, o, a, l = e.split(","), c = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1;) for (s = l[c], r = n ? g("easing." + s, null, !0) : h.easing[s] || {}, o = u.length; --o > -1;) a = u[o], w[s + "." + a] = w[a + s] = r[a] = t.getRatio ? t : t[a] || new t
			};
		for (s = x.prototype, s._calcEnd = !1, s.getRatio = function(t) {
			if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
			var e = this._type,
				i = this._power,
				n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
			return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
		}, n = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = n.length; --r > -1;) s = n[r] + ",Power" + r, T(new x(null, null, 1, r), s, "easeOut", !0), T(new x(null, null, 2, r), s, "easeIn" + (0 === r ? ",easeNone" : "")), T(new x(null, null, 3, r), s, "easeInOut");
		w.linear = h.easing.Linear.easeIn, w.swing = h.easing.Quad.easeInOut;
		var b = g("events.EventDispatcher", function(t) {
			this._listeners = {}, this._eventTarget = t || this
		});
		s = b.prototype, s.addEventListener = function(t, e, i, n, r) {
			r = r || 0;
			var s, l, h = this._listeners[t],
				c = 0;
			for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;) s = h[l], s.c === e && s.s === i ? h.splice(l, 1) : 0 === c && s.pr < r && (c = l + 1);
			h.splice(c, 0, {
				c: e,
				s: i,
				up: n,
				pr: r
			}), this !== o || a || o.wake()
		}, s.removeEventListener = function(t, e) {
			var i, n = this._listeners[t];
			if (n) for (i = n.length; --i > -1;) if (n[i].c === e) return void n.splice(i, 1)
		}, s.dispatchEvent = function(t) {
			var e, i, n, r = this._listeners[t];
			if (r) for (e = r.length, i = this._eventTarget; --e > -1;) n = r[e], n && (n.up ? n.c.call(n.s || i, {
				type: t,
				target: i
			}) : n.c.call(n.s || i))
		};
		var P = t.requestAnimationFrame,
			k = t.cancelAnimationFrame,
			S = Date.now ||
		function() {
			return (new Date).getTime()
		}, C = S();
		for (n = ["ms", "moz", "webkit", "o"], r = n.length; --r > -1 && !P;) P = t[n[r] + "RequestAnimationFrame"], k = t[n[r] + "CancelAnimationFrame"] || t[n[r] + "CancelRequestAnimationFrame"];
		g("Ticker", function(t, e) {
			var i, n, r, s, l, h = this,
				u = S(),
				f = e !== !1 && P ? "auto" : !1,
				d = 500,
				m = 33,
				_ = "tick",
				g = function(t) {
					var e, o, a = S() - C;
					a > d && (u += a - m), C += a, h.time = (C - u) / 1e3, e = h.time - l, (!i || e > 0 || t === !0) && (h.frame++, l += e + (e >= s ? .004 : s - e), o = !0), t !== !0 && (r = n(g)), o && h.dispatchEvent(_)
				};
			b.call(h), h.time = h.frame = 0, h.tick = function() {
				g(!0)
			}, h.lagSmoothing = function(t, e) {
				d = t || 1 / c, m = Math.min(e, d, 0)
			}, h.sleep = function() {
				null != r && (f && k ? k(r) : clearTimeout(r), n = p, r = null, h === o && (a = !1))
			}, h.wake = function(t) {
				null !== r ? h.sleep() : t ? u += -C + (C = S()) : h.frame > 10 && (C = S() - d + 5), n = 0 === i ? p : f && P ? P : function(t) {
					return setTimeout(t, 1e3 * (l - h.time) + 1 | 0)
				}, h === o && (a = !0), g(2)
			}, h.fps = function(t) {
				return arguments.length ? (i = t, s = 1 / (i || 60), l = this.time + s, void h.wake()) : i
			}, h.useRAF = function(t) {
				return arguments.length ? (h.sleep(), f = t, void h.fps(i)) : f
			}, h.fps(t), setTimeout(function() {
				"auto" === f && h.frame < 5 && "hidden" !== document.visibilityState && h.useRAF(!1)
			}, 1500)
		}), s = h.Ticker.prototype = new h.events.EventDispatcher, s.constructor = h.Ticker;
		var O = g("core.Animation", function(t, e) {
			if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, U) {
				a || o.wake();
				var i = this.vars.useFrames ? q : U;
				i.add(this, i._time), this.vars.paused && this.paused(!0)
			}
		});
		o = O.ticker = new h.Ticker, s = O.prototype, s._dirty = s._gc = s._initted = s._paused = !1, s._totalTime = s._time = 0, s._rawPrevTime = -1, s._next = s._last = s._onUpdate = s._timeline = s.timeline = null, s._paused = !1;
		var A = function() {
				a && S() - C > 2e3 && o.wake(), setTimeout(A, 2e3)
			};
		A(), s.play = function(t, e) {
			return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
		}, s.pause = function(t, e) {
			return null != t && this.seek(t, e), this.paused(!0)
		}, s.resume = function(t, e) {
			return null != t && this.seek(t, e), this.paused(!1)
		}, s.seek = function(t, e) {
			return this.totalTime(Number(t), e !== !1)
		}, s.restart = function(t, e) {
			return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
		}, s.reverse = function(t, e) {
			return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
		}, s.render = function() {}, s.invalidate = function() {
			return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
		}, s.isActive = function() {
			var t, e = this._timeline,
				i = this._startTime;
			return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && t < i + this.totalDuration() / this._timeScale
		}, s._enabled = function(t, e) {
			return a || o.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
		}, s._kill = function() {
			return this._enabled(!1, !1)
		}, s.kill = function(t, e) {
			return this._kill(t, e), this
		}, s._uncache = function(t) {
			for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
			return this
		}, s._swapSelfInParams = function(t) {
			for (var e = t.length, i = t.concat(); --e > -1;)"{self}" === t[e] && (i[e] = this);
			return i
		}, s._callback = function(t) {
			var e = this.vars;
			e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || y)
		}, s.eventCallback = function(t, e, i, n) {
			if ("on" === (t || "").substr(0, 2)) {
				var r = this.vars;
				if (1 === arguments.length) return r[t];
				null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = f(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
			}
			return this
		}, s.delay = function(t) {
			return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
		}, s.duration = function(t) {
			return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
		}, s.totalDuration = function(t) {
			return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
		}, s.time = function(t, e) {
			return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
		}, s.totalTime = function(t, e, i) {
			if (a || o.wake(), !arguments.length) return this._totalTime;
			if (this._timeline) {
				if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
					this._dirty && this.totalDuration();
					var n = this._totalDuration,
						r = this._timeline;
					if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline) for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
				}
				this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (L.length && Z(), this.render(t, e, !1), L.length && Z())
			}
			return this
		}, s.progress = s.totalProgress = function(t, e) {
			var i = this.duration();
			return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
		}, s.startTime = function(t) {
			return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
		}, s.endTime = function(t) {
			return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
		}, s.timeScale = function(t) {
			if (!arguments.length) return this._timeScale;
			if (t = t || c, this._timeline && this._timeline.smoothChildTiming) {
				var e = this._pauseTime,
					i = e || 0 === e ? e : this._timeline.totalTime();
				this._startTime = i - (i - this._startTime) * this._timeScale / t
			}
			return this._timeScale = t, this._uncache(!1)
		}, s.reversed = function(t) {
			return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
		}, s.paused = function(t) {
			if (!arguments.length) return this._paused;
			var e, i, n = this._timeline;
			return t != this._paused && n && (a || t || o.wake(), e = n.rawTime(), i = e - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
		};
		var E = g("core.SimpleTimeline", function(t) {
			O.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
		});
		s = E.prototype = new O, s.constructor = E, s.kill()._gc = !1, s._first = s._last = s._recent = null, s._sortChildren = !1, s.add = s.insert = function(t, e) {
			var i, n;
			if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren) for (n = t._startTime; i && i._startTime > n;) i = i._prev;
			return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
		}, s._remove = function(t, e) {
			return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
		}, s.render = function(t, e, i) {
			var n, r = this._first;
			for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
		}, s.rawTime = function() {
			return a || o.wake(), this._totalTime
		};
		var R = g("TweenLite", function(e, i, n) {
			if (O.call(this, i, n), this.render = R.prototype.render, null == e) throw "Cannot tween a null target.";
			this.target = e = "string" != typeof e ? e : R.selector(e) || e;
			var r, s, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
				l = this.vars.overwrite;
			if (this._overwrite = l = null == l ? j[R.defaultOverwrite] : "number" == typeof l ? l >> 0 : j[l], (a || e instanceof Array || e.push && f(e)) && "number" != typeof e[0]) for (this._targets = o = u(e), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) s = o[r], s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(u(s))) : (this._siblings[r] = $(s, this, !1), 1 === l && this._siblings[r].length > 1 && K(s, this, null, 1, this._siblings[r])) : (s = o[r--] = R.selector(s), "string" == typeof s && o.splice(r + 1, 1)) : o.splice(r--, 1);
			else this._propLookup = {}, this._siblings = $(e, this, !1), 1 === l && this._siblings.length > 1 && K(e, this, null, 1, this._siblings);
			(this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -c, this.render(-this._delay))
		}, !0),
			D = function(e) {
				return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
			},
			M = function(t, e) {
				var i, n = {};
				for (i in t) V[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!Y[i] || Y[i] && Y[i]._autoCSS) || (n[i] = t[i], delete t[i]);
				t.css = n
			};
		s = R.prototype = new O, s.constructor = R, s.kill()._gc = !1, s.ratio = 0, s._firstPT = s._targets = s._overwrittenProps = s._startAt = null, s._notifyPluginsOfEnabled = s._lazy = !1, R.version = "1.18.2", R.defaultEase = s._ease = new x(null, null, 1, 1), R.defaultOverwrite = "auto", R.ticker = o, R.autoSleep = 120, R.lagSmoothing = function(t, e) {
			o.lagSmoothing(t, e)
		}, R.selector = t.$ || t.jQuery ||
		function(e) {
			var i = t.$ || t.jQuery;
			return i ? (R.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
		};
		var L = [],
			I = {},
			N = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
			B = function(t) {
				for (var e, i = this._firstPT, n = 1e-6; i;) e = i.blob ? t ? this.join("") : this.start : i.c * t + i.s, i.r ? e = Math.round(e) : n > e && e > -n && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
			},
			F = function(t, e, i, n) {
				var r, s, o, a, l, h, c, u = [t, e],
					p = 0,
					f = "",
					d = 0;
				for (u.start = t, i && (i(u), t = u[0], e = u[1]), u.length = 0, r = t.match(N) || [], s = e.match(N) || [], n && (n._next = null, n.blob = 1, u._firstPT = n), l = s.length, a = 0; l > a; a++) c = s[a], h = e.substr(p, e.indexOf(c, p) - p), f += h || !a ? h : ",", p += h.length, d ? d = (d + 1) % 5 : "rgba(" === h.substr(-5) && (d = 1), c === r[a] || r.length <= a ? f += c : (f && (u.push(f), f = ""), o = parseFloat(r[a]), u.push(o), u._firstPT = {
					_next: u._firstPT,
					t: u,
					p: u.length - 1,
					s: o,
					c: ("=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2)) : parseFloat(c) - o) || 0,
					f: 0,
					r: d && 4 > d
				}), p += c.length;
				return f += e.substr(p), f && u.push(f), u.setRatio = B, u
			},
			X = function(t, e, i, n, r, s, o, a) {
				var l, h, c = "get" === i ? t[e] : i,
					u = typeof t[e],
					p = "string" == typeof n && "=" === n.charAt(1),
					f = {
						t: t,
						p: e,
						s: c,
						f: "function" === u,
						pg: 0,
						n: r || e,
						r: s,
						pr: 0,
						c: p ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - c || 0
					};
				return "number" !== u && ("function" === u && "get" === i && (h = e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3), f.s = c = o ? t[h](o) : t[h]()), "string" == typeof c && (o || isNaN(c)) ? (f.fp = o, l = F(c, n, a || R.defaultStringFilter, f), f = {
					t: l,
					p: "setRatio",
					s: 0,
					c: 1,
					f: 2,
					pg: 0,
					n: r || e,
					pr: 0
				}) : p || (f.s = parseFloat(c), f.c = parseFloat(n) - f.s || 0)), f.c ? ((f._next = this._firstPT) && (f._next._prev = f), this._firstPT = f, f) : void 0
			},
			W = R._internals = {
				isArray: f,
				isSelector: D,
				lazyTweens: L,
				blobDif: F
			},
			Y = R._plugins = {},
			z = W.tweenLookup = {},
			H = 0,
			V = W.reservedProps = {
				ease: 1,
				delay: 1,
				overwrite: 1,
				onComplete: 1,
				onCompleteParams: 1,
				onCompleteScope: 1,
				useFrames: 1,
				runBackwards: 1,
				startAt: 1,
				onUpdate: 1,
				onUpdateParams: 1,
				onUpdateScope: 1,
				onStart: 1,
				onStartParams: 1,
				onStartScope: 1,
				onReverseComplete: 1,
				onReverseCompleteParams: 1,
				onReverseCompleteScope: 1,
				onRepeat: 1,
				onRepeatParams: 1,
				onRepeatScope: 1,
				easeParams: 1,
				yoyo: 1,
				immediateRender: 1,
				repeat: 1,
				repeatDelay: 1,
				data: 1,
				paused: 1,
				reversed: 1,
				autoCSS: 1,
				lazy: 1,
				onOverwrite: 1,
				callbackScope: 1,
				stringFilter: 1
			},
			j = {
				none: 0,
				all: 1,
				auto: 2,
				concurrent: 3,
				allOnStart: 4,
				preexisting: 5,
				"true": 1,
				"false": 0
			},
			q = O._rootFramesTimeline = new E,
			U = O._rootTimeline = new E,
			G = 30,
			Z = W.lazyRender = function() {
				var t, e = L.length;
				for (I = {}; --e > -1;) t = L[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
				L.length = 0
			};
		U._startTime = o.time, q._startTime = o.frame, U._active = q._active = !0, setTimeout(Z, 1), O._updateRoot = R.render = function() {
			var t, e, i;
			if (L.length && Z(), U.render((o.time - U._startTime) * U._timeScale, !1, !1), q.render((o.frame - q._startTime) * q._timeScale, !1, !1), L.length && Z(), o.frame >= G) {
				G = o.frame + (parseInt(R.autoSleep, 10) || 120);
				for (i in z) {
					for (e = z[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
					0 === e.length && delete z[i]
				}
				if (i = U._first, (!i || i._paused) && R.autoSleep && !q._first && 1 === o._listeners.tick.length) {
					for (; i && i._paused;) i = i._next;
					i || o.sleep()
				}
			}
		}, o.addEventListener("tick", O._updateRoot);
		var $ = function(t, e, i) {
				var n, r, s = t._gsTweenID;
				if (z[s || (t._gsTweenID = s = "t" + H++)] || (z[s] = {
					target: t,
					tweens: []
				}), e && (n = z[s].tweens, n[r = n.length] = e, i)) for (; --r > -1;) n[r] === e && n.splice(r, 1);
				return z[s].tweens
			},
			Q = function(t, e, i, n) {
				var r, s, o = t.vars.onOverwrite;
				return o && (r = o(t, e, i, n)), o = R.onOverwrite, o && (s = o(t, e, i, n)), r !== !1 && s !== !1
			},
			K = function(t, e, i, n, r) {
				var s, o, a, l;
				if (1 === n || n >= 4) {
					for (l = r.length, s = 0; l > s; s++) if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0);
					else if (5 === n) break;
					return o
				}
				var h, u = e._startTime + c,
					p = [],
					f = 0,
					d = 0 === e._duration;
				for (s = r.length; --s > -1;)(a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || J(e, 0, d), 0 === J(a, h, d) && (p[f++] = a)) : a._startTime <= u && a._startTime + a.totalDuration() / a._timeScale > u && ((d || !a._initted) && u - a._startTime <= 2e-10 || (p[f++] = a)));
				for (s = f; --s > -1;) if (a = p[s], 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
					if (2 !== n && !Q(a, e)) continue;
					a._enabled(!1, !1) && (o = !0)
				}
				return o
			},
			J = function(t, e, i) {
				for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline;) {
					if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
					n = n._timeline
				}
				return s /= r, s > e ? s - e : i && s === e || !t._initted && 2 * c > s - e ? c : (s += t.totalDuration() / t._timeScale / r) > e + c ? 0 : s - e - c
			};
		s._init = function() {
			var t, e, i, n, r, s = this.vars,
				o = this._overwrittenProps,
				a = this._duration,
				l = !! s.immediateRender,
				h = s.ease;
			if (s.startAt) {
				this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
				for (n in s.startAt) r[n] = s.startAt[n];
				if (r.overwrite = !1, r.immediateRender = !0, r.lazy = l && s.lazy !== !1, r.startAt = r.delay = null, this._startAt = R.to(this.target, 0, r), l) if (this._time > 0) this._startAt = null;
				else if (0 !== a) return
			} else if (s.runBackwards && 0 !== a) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
			else {
				0 !== this._time && (l = !1), i = {};
				for (n in s) V[n] && "autoCSS" !== n || (i[n] = s[n]);
				if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && s.lazy !== !1, i.immediateRender = l, this._startAt = R.to(this.target, 0, i), l) {
					if (0 === this._time) return
				} else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
			}
			if (this._ease = h = h ? h instanceof x ? h : "function" == typeof h ? new x(h, s.easeParams) : w[h] || R.defaultEase : R.defaultEase, s.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null) && (e = !0);
			else e = this._initProps(this.target, this._propLookup, this._siblings, o);
			if (e && R._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards) for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
			this._onUpdate = s.onUpdate, this._initted = !0
		}, s._initProps = function(e, i, n, r) {
			var s, o, a, l, h, c;
			if (null == e) return !1;
			I[e._gsTweenID] && Z(), this.vars.css || e.style && e !== t && e.nodeType && Y.css && this.vars.autoCSS !== !1 && M(this.vars, e);
			for (s in this.vars) if (c = this.vars[s], V[s]) c && (c instanceof Array || c.push && f(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[s] = c = this._swapSelfInParams(c, this));
			else if (Y[s] && (l = new Y[s])._onInitTween(e, this.vars[s], this)) {
				for (this._firstPT = h = {
					_next: this._firstPT,
					t: l,
					p: "setRatio",
					s: 0,
					c: 1,
					f: 1,
					n: s,
					pg: 1,
					pr: l._priority
				}, o = l._overwriteProps.length; --o > -1;) i[l._overwriteProps[o]] = this._firstPT;
				(l._priority || l._onInitAllProps) && (a = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0), h._next && (h._next._prev = h)
			} else i[s] = X.call(this, e, s, "get", c, s, 0, null, this.vars.stringFilter);
			return r && this._kill(r, e) ? this._initProps(e, i, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && K(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (I[e._gsTweenID] = !0), a)
		}, s.render = function(t, e, i) {
			var n, r, s, o, a = this._time,
				l = this._duration,
				h = this._rawPrevTime;
			if (t >= l - 1e-7) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > h || 0 >= t && t >= -1e-7 || h === c && "isPause" !== this.data) && h !== t && (i = !0, h > c && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || h === t ? t : c);
			else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && h > 0) && (r = "onReverseComplete", n = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== c || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || h === t ? t : c)), this._initted || (i = !0);
			else if (this._totalTime = this._time = t, this._easeType) {
				var u = t / l,
					p = this._easeType,
					f = this._easePower;
				(1 === p || 3 === p && u >= .5) && (u = 1 - u), 3 === p && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === p ? 1 - u : 2 === p ? u : .5 > t / l ? u / 2 : 1 - u / 2
			} else this.ratio = this._ease.getRatio(t / l);
			if (this._time !== a || i) {
				if (!this._initted) {
					if (this._init(), !this._initted || this._gc) return;
					if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = h, L.push(this), void(this._lazy = [t, e]);
					this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
				}
				for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
				this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== a || n) && this._callback("onUpdate")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === c && o !== c && (this._rawPrevTime = 0))
			}
		}, s._kill = function(t, e, i) {
			if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
			e = "string" != typeof e ? e || this._targets || this.target : R.selector(e) || e;
			var n, r, s, o, a, l, h, c, u, p = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
			if ((f(e) || D(e)) && "number" != typeof e[0]) for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (l = !0);
			else {
				if (this._targets) {
					for (n = this._targets.length; --n > -1;) if (e === this._targets[n]) {
						a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
						break
					}
				} else {
					if (e !== this.target) return !1;
					a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
				}
				if (a) {
					if (h = t || a, c = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (R.onOverwrite || this.vars.onOverwrite)) {
						for (s in h) a[s] && (u || (u = []), u.push(s));
						if ((u || !t) && !Q(this, i, e, u)) return !1
					}
					for (s in h)(o = a[s]) && (p && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(h) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), c && (r[s] = 1);
					!this._firstPT && this._initted && this._enabled(!1, !1)
				}
			}
			return l
		}, s.invalidate = function() {
			return this._notifyPluginsOfEnabled && R._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], O.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -c, this.render(-this._delay)), this
		}, s._enabled = function(t, e) {
			if (a || o.wake(), t && this._gc) {
				var i, n = this._targets;
				if (n) for (i = n.length; --i > -1;) this._siblings[i] = $(n[i], this, !0);
				else this._siblings = $(this.target, this, !0)
			}
			return O.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? R._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
		}, R.to = function(t, e, i) {
			return new R(t, e, i)
		}, R.from = function(t, e, i) {
			return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new R(t, e, i)
		}, R.fromTo = function(t, e, i, n) {
			return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new R(t, e, n)
		}, R.delayedCall = function(t, e, i, n, r) {
			return new R(e, 0, {
				delay: t,
				onComplete: e,
				onCompleteParams: i,
				callbackScope: n,
				onReverseComplete: e,
				onReverseCompleteParams: i,
				immediateRender: !1,
				lazy: !1,
				useFrames: r,
				overwrite: 0
			})
		}, R.set = function(t, e) {
			return new R(t, 0, e)
		}, R.getTweensOf = function(t, e) {
			if (null == t) return [];
			t = "string" != typeof t ? t : R.selector(t) || t;
			var i, n, r, s;
			if ((f(t) || D(t)) && "number" != typeof t[0]) {
				for (i = t.length, n = []; --i > -1;) n = n.concat(R.getTweensOf(t[i], e));
				for (i = n.length; --i > -1;) for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
			} else for (n = $(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
			return n
		}, R.killTweensOf = R.killDelayedCallsTo = function(t, e, i) {
			"object" == typeof e && (i = e, e = !1);
			for (var n = R.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
		};
		var te = g("plugins.TweenPlugin", function(t, e) {
			this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = te.prototype
		}, !0);
		if (s = te.prototype, te.version = "1.18.0", te.API = 2, s._firstPT = null, s._addTween = X, s.setRatio = B, s._kill = function(t) {
			var e, i = this._overwriteProps,
				n = this._firstPT;
			if (null != t[this._propName]) this._overwriteProps = [];
			else for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
			for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
			return !1
		}, s._roundProps = function(t, e) {
			for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
		}, R._onPluginEvent = function(t, e) {
			var i, n, r, s, o, a = e._firstPT;
			if ("_onInitAllProps" === t) {
				for (; a;) {
					for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
					(a._prev = n ? n._prev : s) ? a._prev._next = a : r = a, (a._next = n) ? n._prev = a : s = a, a = o
				}
				a = e._firstPT = r
			}
			for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
			return i
		}, te.activate = function(t) {
			for (var e = t.length; --e > -1;) t[e].API === te.API && (Y[(new t[e])._propName] = t[e]);
			return !0
		}, _.plugin = function(t) {
			if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
			var e, i = t.propName,
				n = t.priority || 0,
				r = t.overwriteProps,
				s = {
					init: "_onInitTween",
					set: "setRatio",
					kill: "_kill",
					round: "_roundProps",
					initAll: "_onInitAllProps"
				},
				o = g("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
					te.call(this, i, n), this._overwriteProps = r || []
				}, t.global === !0),
				a = o.prototype = new te(i);
			a.constructor = o, o.API = t.API;
			for (e in s)"function" == typeof t[e] && (a[s[e]] = t[e]);
			return o.version = t.version, te.activate([o]), o
		}, n = t._gsQueue) {
			for (r = 0; r < n.length; r++) n[r]();
			for (s in d) d[s].func || t.console.log("GSAP encountered missing dependency: com.greensock." + s)
		}
		a = !1
	}
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"), function() {
	"use strict";

	function t() {}
	function e(t, e) {
		for (var i = t.length; i--;) if (t[i].listener === e) return i;
		return -1
	}
	function i(t) {
		return function() {
			return this[t].apply(this, arguments)
		}
	}
	var n = t.prototype,
		r = this,
		s = r.EventEmitter;
	n.getListeners = function(t) {
		var e, i, n = this._getEvents();
		if ("object" == typeof t) {
			e = {};
			for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
		} else e = n[t] || (n[t] = []);
		return e
	}, n.flattenListeners = function(t) {
		var e, i = [];
		for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
		return i
	}, n.getListenersAsObject = function(t) {
		var e, i = this.getListeners(t);
		return i instanceof Array && (e = {}, e[t] = i), e || i
	}, n.addListener = function(t, i) {
		var n, r = this.getListenersAsObject(t),
			s = "object" == typeof i;
		for (n in r) r.hasOwnProperty(n) && -1 === e(r[n], i) && r[n].push(s ? i : {
			listener: i,
			once: !1
		});
		return this
	}, n.on = i("addListener"), n.addOnceListener = function(t, e) {
		return this.addListener(t, {
			listener: e,
			once: !0
		})
	}, n.once = i("addOnceListener"), n.defineEvent = function(t) {
		return this.getListeners(t), this
	}, n.defineEvents = function(t) {
		for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
		return this
	}, n.removeListener = function(t, i) {
		var n, r, s = this.getListenersAsObject(t);
		for (r in s) s.hasOwnProperty(r) && (n = e(s[r], i), -1 !== n && s[r].splice(n, 1));
		return this
	}, n.off = i("removeListener"), n.addListeners = function(t, e) {
		return this.manipulateListeners(!1, t, e)
	}, n.removeListeners = function(t, e) {
		return this.manipulateListeners(!0, t, e)
	}, n.manipulateListeners = function(t, e, i) {
		var n, r, s = t ? this.removeListener : this.addListener,
			o = t ? this.removeListeners : this.addListeners;
		if ("object" != typeof e || e instanceof RegExp) for (n = i.length; n--;) s.call(this, e, i[n]);
		else for (n in e) e.hasOwnProperty(n) && (r = e[n]) && ("function" == typeof r ? s.call(this, n, r) : o.call(this, n, r));
		return this
	}, n.removeEvent = function(t) {
		var e, i = typeof t,
			n = this._getEvents();
		if ("string" === i) delete n[t];
		else if ("object" === i) for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
		else delete this._events;
		return this
	}, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(t, e) {
		var i, n, r, s, o = this.getListenersAsObject(t);
		for (r in o) if (o.hasOwnProperty(r)) for (n = o[r].length; n--;) i = o[r][n], i.once === !0 && this.removeListener(t, i.listener), s = i.listener.apply(this, e || []), s === this._getOnceReturnValue() && this.removeListener(t, i.listener);
		return this
	}, n.trigger = i("emitEvent"), n.emit = function(t) {
		var e = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(t, e)
	}, n.setOnceReturnValue = function(t) {
		return this._onceReturnValue = t, this
	}, n._getOnceReturnValue = function() {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, n._getEvents = function() {
		return this._events || (this._events = {})
	}, t.noConflict = function() {
		return r.EventEmitter = s, t
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
		return t
	}) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this), function(t) {
	function e(e) {
		var i = t.event;
		return i.target = i.target || i.srcElement || e, i
	}
	var i = document.documentElement,
		n = function() {};
	i.addEventListener ? n = function(t, e, i) {
		t.addEventListener(e, i, !1)
	} : i.attachEvent && (n = function(t, i, n) {
		t[i + n] = n.handleEvent ?
		function() {
			var i = e(t);
			n.handleEvent.call(n, i)
		} : function() {
			var i = e(t);
			n.call(t, i)
		}, t.attachEvent("on" + i, t[i + n])
	});
	var r = function() {};
	i.removeEventListener ? r = function(t, e, i) {
		t.removeEventListener(e, i, !1)
	} : i.detachEvent && (r = function(t, e, i) {
		t.detachEvent("on" + e, t[e + i]);
		try {
			delete t[e + i]
		} catch (n) {
			t[e + i] = void 0
		}
	});
	var s = {
		bind: n,
		unbind: r
	};
	"function" == typeof define && define.amd ? define("eventie/eventie", s) : t.eventie = s
}(this), function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(i, n) {
		return e(t, i, n)
	}) : "object" == typeof module && module.exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("eventie")) : t.imagesLoaded = e(t, t.EventEmitter, t.eventie)
}(window, function(t, e, i) {
	function n(t, e) {
		for (var i in e) t[i] = e[i];
		return t
	}
	function r(t) {
		return "[object Array]" == u.call(t)
	}
	function s(t) {
		var e = [];
		if (r(t)) e = t;
		else if ("number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]);
		else e.push(t);
		return e
	}
	function o(t, e, i) {
		if (!(this instanceof o)) return new o(t, e, i);
		"string" == typeof t && (t = document.querySelectorAll(t)), this.elements = s(t), this.options = n({}, this.options), "function" == typeof e ? i = e : n(this.options, e), i && this.on("always", i), this.getImages(), h && (this.jqDeferred = new h.Deferred);
		var r = this;
		setTimeout(function() {
			r.check()
		})
	}
	function a(t) {
		this.img = t
	}
	function l(t, e) {
		this.url = t, this.element = e, this.img = new Image
	}
	var h = t.jQuery,
		c = t.console,
		u = Object.prototype.toString;
	o.prototype = new e, o.prototype.options = {}, o.prototype.getImages = function() {
		this.images = [];
		for (var t = 0; t < this.elements.length; t++) {
			var e = this.elements[t];
			this.addElementImages(e)
		}
	}, o.prototype.addElementImages = function(t) {
		"IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
		var e = t.nodeType;
		if (e && p[e]) {
			for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
				var r = i[n];
				this.addImage(r)
			}
			if ("string" == typeof this.options.background) {
				var s = t.querySelectorAll(this.options.background);
				for (n = 0; n < s.length; n++) {
					var o = s[n];
					this.addElementBackgroundImages(o)
				}
			}
		}
	};
	var p = {
		1: !0,
		9: !0,
		11: !0
	};
	o.prototype.addElementBackgroundImages = function(t) {
		for (var e = f(t), i = /url\(['"]*([^'"\)]+)['"]*\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
			var r = n && n[1];
			r && this.addBackground(r, t), n = i.exec(e.backgroundImage)
		}
	};
	var f = t.getComputedStyle ||
	function(t) {
		return t.currentStyle
	};
	return o.prototype.addImage = function(t) {
		var e = new a(t);
		this.images.push(e)
	}, o.prototype.addBackground = function(t, e) {
		var i = new l(t, e);
		this.images.push(i)
	}, o.prototype.check = function() {
		function t(t, i, n) {
			setTimeout(function() {
				e.progress(t, i, n)
			})
		}
		var e = this;
		if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) return void this.complete();
		for (var i = 0; i < this.images.length; i++) {
			var n = this.images[i];
			n.once("progress", t), n.check()
		}
	}, o.prototype.progress = function(t, e, i) {
		this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emit("progress", this, t, e), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && c && c.log("progress: " + i, t, e)
	}, o.prototype.complete = function() {
		var t = this.hasAnyBroken ? "fail" : "done";
		if (this.isComplete = !0, this.emit(t, this), this.emit("always", this), this.jqDeferred) {
			var e = this.hasAnyBroken ? "reject" : "resolve";
			this.jqDeferred[e](this)
		}
	}, a.prototype = new e, a.prototype.check = function() {
		var t = this.getIsImageComplete();
		return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, i.bind(this.proxyImage, "load", this), i.bind(this.proxyImage, "error", this), i.bind(this.img, "load", this), i.bind(this.img, "error", this), void(this.proxyImage.src = this.img.src))
	}, a.prototype.getIsImageComplete = function() {
		return this.img.complete && void 0 !== this.img.naturalWidth
	}, a.prototype.confirm = function(t, e) {
		this.isLoaded = t, this.emit("progress", this, this.img, e)
	}, a.prototype.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, a.prototype.onload = function() {
		this.confirm(!0, "onload"), this.unbindEvents()
	}, a.prototype.onerror = function() {
		this.confirm(!1, "onerror"), this.unbindEvents()
	}, a.prototype.unbindEvents = function() {
		i.unbind(this.proxyImage, "load", this), i.unbind(this.proxyImage, "error", this), i.unbind(this.img, "load", this), i.unbind(this.img, "error", this)
	}, l.prototype = new a, l.prototype.check = function() {
		i.bind(this.img, "load", this), i.bind(this.img, "error", this), this.img.src = this.url;
		var t = this.getIsImageComplete();
		t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
	}, l.prototype.unbindEvents = function() {
		i.unbind(this.img, "load", this), i.unbind(this.img, "error", this)
	}, l.prototype.confirm = function(t, e) {
		this.isLoaded = t, this.emit("progress", this, this.element, e)
	}, o.makeJQueryPlugin = function(e) {
		e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) {
			var i = new o(this, t, e);
			return i.jqDeferred.promise(h(this))
		})
	}, o.makeJQueryPlugin(), o
}), function(t) {
	"use strict";

	function e(t) {
		return new RegExp("(^|\\s+)" + t + "(\\s+|$)")
	}
	function i(t, e) {
		var i = n(t, e) ? s : r;
		i(t, e)
	}
	var n, r, s;
	"classList" in document.documentElement ? (n = function(t, e) {
		return t.classList.contains(e)
	}, r = function(t, e) {
		t.classList.add(e)
	}, s = function(t, e) {
		t.classList.remove(e)
	}) : (n = function(t, i) {
		return e(i).test(t.className)
	}, r = function(t, e) {
		n(t, e) || (t.className = t.className + " " + e)
	}, s = function(t, i) {
		t.className = t.className.replace(e(i), " ")
	});
	var o = {
		hasClass: n,
		addClass: r,
		removeClass: s,
		toggleClass: i,
		has: n,
		add: r,
		remove: s,
		toggle: i
	};
	"function" == typeof define && define.amd ? define(o) : "object" == typeof exports ? module.exports = o : t.classie = o
}(window), function() {
	function t(t) {
		return a ? a : a = t.matches ? t.matches : t.webkitMatchesSelector ? t.webkitMatchesSelector : t.mozMatchesSelector ? t.mozMatchesSelector : t.msMatchesSelector ? t.msMatchesSelector : t.oMatchesSelector ? t.oMatchesSelector : o.matchesSelector
	}
	function e(i, n, r) {
		if ("_root" == n) return r;
		if (i !== r) {
			if (t(i).call(i, n)) return i;
			if (i.parentNode) return l++, e(i.parentNode, n, r)
		}
	}
	function i(t, e, i, n) {
		c[t.id] || (c[t.id] = {}), c[t.id][e] || (c[t.id][e] = {}), c[t.id][e][i] || (c[t.id][e][i] = []), c[t.id][e][i].push(n)
	}
	function n(t, e, i, n) {
		if (c[t.id]) if (e) if (n || i) if (n) {
			if (c[t.id][e][i]) for (r = 0; r < c[t.id][e][i].length; r++) if (c[t.id][e][i][r] === n) {
				c[t.id][e][i].splice(r, 1);
				break
			}
		} else delete c[t.id][e][i];
		else c[t.id][e] = {};
		else for (var r in c[t.id]) c[t.id].hasOwnProperty(r) && (c[t.id][r] = {})
	}
	function r(t, i, n) {
		if (c[t][n]) {
			var r, s, a = i.target || i.srcElement,
				h = {},
				p = s = 0;
			l = 0;
			for (r in c[t][n]) c[t][n].hasOwnProperty(r) && (s = e(a, r, u[t].element)) && o.matchesEvent(n, u[t].element, s, "_root" == r, i) && (l++, c[t][n][r].match = s, h[l] = c[t][n][r]);
			for (i.stopPropagation = function() {
				i.cancelBubble = !0
			}, s = 0; l >= s; s++) if (h[s]) for (p = 0; p < h[s].length; p++) {
				if (!1 === h[s][p].call(h[s].match, i)) return o.cancel(i), void 0;
				if (i.cancelBubble) return
			}
		}
	}
	function s(t, e, s, a) {
		function l(t) {
			return function(e) {
				r(u, e, t)
			}
		}
		if (this.element) {
			t instanceof Array || (t = [t]), s || "function" != typeof e || (s = e, e = "_root");
			var h, u = this.id;
			for (h = 0; h < t.length; h++) a ? n(this, t[h], e, s) : (c[u] && c[u][t[h]] || o.addEvent(this, t[h], l(t[h])), i(this, t[h], e, s));
			return this
		}
	}
	function o(t, e) {
		if (!(this instanceof o)) {
			for (var i in u) if (u[i].element === t) return u[i];
			return h++, u[h] = new o(t, h), u[h]
		}
		this.element = t, this.id = e
	}
	var a, l = 0,
		h = 0,
		c = {},
		u = {};
	o.prototype.on = function(t, e, i) {
		return s.call(this, t, e, i)
	}, o.prototype.off = function(t, e, i) {
		return s.call(this, t, e, i, !0)
	}, o.matchesSelector = function() {}, o.cancel = function(t) {
		t.preventDefault(), t.stopPropagation()
	}, o.addEvent = function(t, e, i) {
		t.element.addEventListener(e, i, "blur" == e || "focus" == e)
	}, o.matchesEvent = function() {
		return !0
	}, "undefined" != typeof module && module.exports && (module.exports = o), window.Gator = o
}(), function(t) {
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
	else if ("function" == typeof define && define.amd) define([], t);
	else {
		var e;
		e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.SoundCloudAudio = t()
	}
}(function() {
	return function t(e, i, n) {
		function r(o, a) {
			if (!i[o]) {
				if (!e[o]) {
					var l = "function" == typeof require && require;
					if (!a && l) return l(o, !0);
					if (s) return s(o, !0);
					var h = new Error("Cannot find module '" + o + "'");
					throw h.code = "MODULE_NOT_FOUND", h
				}
				var c = i[o] = {
					exports: {}
				};
				e[o][0].call(c.exports, function(t) {
					var i = e[o][1][t];
					return r(i ? i : t)
				}, c, c.exports, t, e, i, n)
			}
			return i[o].exports
		}
		for (var s = "function" == typeof require && require, o = 0; o < n.length; o++) r(n[o]);
		return r
	}({
		1: [function(t, e) {
			"use strict";

			function i(t) {
				s || (s = document.createElement("a")), s.href = t || "";
				for (var e = {}, i = 0, n = o.length; n > i; i++) {
					var r = o[i];
					e[r] = s[r]
				}
				return e
			}
			function n(t, e, n) {
				var r = i(t),
					s = /\?(?:.*)$/,
					o = s.test(r.search) ? "&" : "?",
					a = r.protocol + "//" + r.host + r.port + r.pathname + r.search + o + e + "=" + n + r.hash;
				return a
			}
			function r(t) {
				if (!(this instanceof r)) return new r(t);
				if (!t) throw new Error("SoundCloud API clientId is required, get it - https://developers.soundcloud.com/");
				this._events = {}, this._clientId = t, this._baseUrl = "https://api.soundcloud.com", this.playing = !1, this.duration = 0, this.audio = document.createElement("audio")
			}
			var s, o = "protocol hostname host pathname port search hash href".split(" ");
			r.prototype.resolve = function(t, e) {
				if (songAvailable = !1, !t) throw new Error("SoundCloud track or playlist url is required");
				var n = this._baseUrl + "/resolve.json?url=" + encodeURIComponent(t) + "&client_id=" + this._clientId;
				this._jsonp(n, function(n) {
					if (this.cleanData(), songAvailable = !0, Array.isArray(n)) {
						var r = n;
						n = {
							tracks: r
						}, this._playlist = n
					} else if (n.tracks) this._playlist = n;
					else {
						this._track = n;
						var s = i(t);
						this._track.stream_url += s.hash
					}
					this.duration = n.duration && !isNaN(n.duration) ? n.duration / 1e3 : 0, e(n)
				}.bind(this))
			}, r.prototype._jsonp = function(t, e) {
				var i = document.getElementsByTagName("script")[0] || document.head,
					r = document.createElement("script"),
					s = "jsonp_callback_" + (new Date).valueOf() + Math.floor(1e3 * Math.random());
				window[s] = function(t) {
					r.parentNode && r.parentNode.removeChild(r), window[s] = function() {}, e(t)
				}, r.src = n(t, "callback", s), i.parentNode.insertBefore(r, i)
			}, r.prototype.on = function(t, e) {
				this._events[t] = e, this.audio.addEventListener(t, e, !1)
			}, r.prototype.off = function(t, e) {
				this._events[t] = null, this.audio.removeEventListener(t, e)
			}, r.prototype.unbindAll = function() {
				for (var t in this._events) {
					var e = this._events[t];
					e && this.off(t, e)
				}
			}, r.prototype.preload = function(t) {
				this._track = {
					stream_url: t
				}, this.audio.src = n(t, "client_id", this._clientId)
			}, r.prototype.play = function(t) {
				t = t || {};
				var e;
				if (t.streamUrl) e = t.streamUrl;
				else if (this._playlist) {
					var i = this._playlist.tracks.length;
					if (i) {
						if (this._playlistIndex = t.playlistIndex || 0, this._playlistIndex >= i || this._playlistIndex < 0) return this._playlistIndex = 0, void 0;
						e = this._playlist.tracks[this._playlistIndex].stream_url
					}
				} else this._track && (e = this._track.stream_url);
				if (!e) throw new Error("There is no tracks to play, use `streamUrl` option or `load` method");
				e = n(e, "client_id", this._clientId), e !== this.audio.src && (this.audio.src = e), this.playing = e, this.audio.play()
			}, r.prototype.pause = function() {
				this.audio.pause(), this.playing = !1
			}, r.prototype.stop = function() {
				this.audio.pause(), this.audio.currentTime = 0, this.playing = !1
			}, r.prototype.next = function() {
				var t = this._playlist.tracks.length;
				this._playlistIndex >= t - 1 || this._playlist && t && this.play({
					playlistIndex: ++this._playlistIndex
				})
			}, r.prototype.previous = function() {
				this._playlistIndex <= 0 || this._playlist && this._playlist.tracks.length && this.play({
					playlistIndex: --this._playlistIndex
				})
			}, r.prototype.seek = function(t) {
				if (!this.audio.readyState) return !1;
				var e = t.offsetX / t.target.offsetWidth || (t.layerX - t.target.offsetLeft) / t.target.offsetWidth;
				this.audio.currentTime = e * (this.audio.duration || 0)
			}, r.prototype.cleanData = function() {
				this._track = void 0, this._playlist = void 0
			}, e.exports = r
		}, {}]
	}, {}, [1])(1)
});
var documentBody = document.body,
	container = document.getElementById("container"),
	content = document.getElementById("content"),
	allPosters = document.querySelectorAll(".blok-poster"),
	monthPlan = document.querySelector(".blok-poster__events"),
	nav = document.getElementById("nav"),
	navOverlay = document.getElementById("nav-overlay"),
	navOverlayInner = document.getElementById("nav-overlay__inner"),
	posterOverview = document.getElementById("poster-overview"),
	imprint = document.getElementById("impressum"),
	imprintLink = document.getElementById("impressum-link"),
	imprintOpen = !1,
	preloader = document.getElementById("preloader"),
	preloaderBar = document.getElementById("preloader-bar"),
	progressBar = document.getElementById("progress-wrapper"),
	progressBarValue = document.getElementById("sc-progress"),
	overlayMessage = document.getElementById("overlay-message"),
	allAnimations, originalDocumentTitle = document.title,
	rootUrl = "/wp-content/themes/blok-theme/images/",
	vpH = window.innerHeight,
	vpW = window.innerWidth,
	contentWidth, contentHeight, activePlayer, closeAll, thisSong, thisSongDuration, seekPositionValue, currentPositionValue, progressBarInterval, artistTitle, trackTitle, songAvailable = !0,
	tooltipPlay = document.querySelector(".tooltip-play"),
	tooltipPlayState = !0,
	_tooltipPlayCursorThrottle, tooltipSeek = document.querySelector(".tooltip-seek"),
	seekPositionThrottle, dragPoster, posterHeight, posterWidth, newTopValuePoster, boundTop, boundLeft, boundWidth, boundHeight;
"addEventListener" in document && document.addEventListener("DOMContentLoaded", function() {
	FastClick.attach(document.body)
}, !1), function(t) {
	"use strict";

	function e(t) {
		if (t) {
			if ("string" == typeof n[t]) return t;
			t = t.charAt(0).toUpperCase() + t.slice(1);
			for (var e, r = 0, s = i.length; s > r; r++) if (e = i[r] + t, "string" == typeof n[e]) return e
		}
	}
	var i = "Webkit Moz ms Ms O".split(" "),
		n = document.documentElement.style;
	t.getStyleProperty = e
}(window);
var transformProp = getStyleProperty("transform");
if (vpW > 640) {
	var browserCheck = get_browser_info();
	("Safari" === browserCheck.name && browserCheck.version < 7 || "Firefox" === browserCheck.name && browserCheck.version < 35 || "Chrome" === browserCheck.name && browserCheck.version < 40) && classie.add(documentBody, "not-supported"), posterHeight = Math.round(.8 * vpH), posterWidth = Math.round(.7 * posterHeight), newTopValuePoster = (posterHeight - posterWidth) / 2, contentWidth = Math.sqrt(posterWidth * posterHeight * (allPosters.length - 2.7) * 3) + Math.sqrt(vpH * vpW), contentHeight = contentWidth;
	var xPos = 0,
		yPos = 0,
		posterPos = new Array,
		posterCount = 0,
		start = !0,
		throttle = 0,
		horZero = (contentHeight - vpH) / 2 - 5,
		verZero = (contentWidth - vpW) / 2 - 10,
		aniCellSize = 800,
		aniCount = 0,
		aniCells = new Array,
		aniCellRows = Math.round(contentWidth / aniCellSize),
		aniCellAmount = 0;
	boundTop = 50, boundLeft = 50, boundBottom = 50, boundRight = 50, boundWidth = contentWidth - 100, boundHeight = contentHeight - 100, container.style.width = vpW + "px", container.style.height = vpH + "px", content.style.width = contentWidth + "px", content.style.height = contentHeight + "px";
	for (var i = 0; aniCellRows > i; i++) for (var s = 0; aniCellRows > s; s++) aniCells[aniCellAmount] = new Array, aniCells[aniCellAmount][0] = contentWidth / aniCellRows * s + contentWidth / aniCellRows / 2 - 150, aniCells[aniCellAmount][1] = contentWidth / aniCellRows * i + contentWidth / aniCellRows / 2 - 150, aniCells[aniCellAmount][2] = !1, aniCellAmount++;
	for (var i = 0, tot = allPosters.length; tot > i; i++) allPosters[i].style.height = posterHeight + "px", allPosters[i].style.width = posterWidth + "px", classie.has(allPosters[i], "blok-poster--current") ? (allPosters[i].style.top = horZero + (vpH - posterHeight) / 2 + "px", allPosters[i].style.left = verZero + vpW / 2 - posterWidth + "px") : (positionPoster(), allPosters[i].style.top = yPos + "px", allPosters[i].style.left = xPos + "px");
	monthPlan.clientHeight > vpH - 60 ? (classie.add(monthPlan, "shrink-size"), monthPlan.style.top = horZero + (vpH - monthPlan.clientHeight) / 2 + "px") : monthPlan.style.top = horZero + (vpH - posterHeight) / 2 + "px", monthPlan.style.left = verZero + vpW / 2 + posterWidth / 3 + "px", draggablePoster(), container.scrollTop = (contentHeight - vpH) / 2, container.scrollLeft = (contentWidth - vpW) / 2, draggableContainer("scroll", .8), _tooltipDragCursorThrottle = tooltipDragCursor.throttle(5), Gator(document).on("mousemove", "#content", _tooltipDragCursorThrottle), _tooltipPlayCursorThrottle = tooltipPlayCursor.throttle(5), Gator(document).on("mousemove", ".blok-poster", _tooltipPlayCursorThrottle), seekPositionThrottle = seekPosition.throttle(25), Gator(document).on("mousemove", "#progress-wrapper", seekPositionThrottle), Gator(document).on("click", "#progress-wrapper", goToPosition)
} else {
	posterHeight = Math.round(.8 * vpH), posterWidth = Math.round(.71 * posterHeight), newTopValuePoster = (posterHeight - posterWidth) / 2, contentHeight = Math.sqrt(posterWidth * posterHeight * (allPosters.length - 2) * 3) + Math.sqrt(vpH * vpW) + vpH, contentWidth = vpW, boundTop = -100, boundLeft = -150, boundRight = -150, boundBottom = -100, boundWidth = contentWidth + 300, boundHeight = contentHeight, container.style.width = vpW + "px", container.style.height = vpH + "px", content.style.width = vpW + "px", content.style.height = contentHeight + "px", navOverlayInner.style.height = vpH + "px", draggablePoster();
	for (var i = 0, tot = allPosters.length; tot > i; i++) allPosters[i].style.height = posterHeight + "px", allPosters[i].style.width = posterWidth + "px", classie.has(allPosters[i], "blok-poster--current") ? (allPosters[i].style.top = 70 >= .5 * vpH - .5 * posterHeight ? "70px" : .5 * vpH - .5 * posterHeight + "px", allPosters[i].style.left = .5 * vpW - .5 * posterWidth + "px") : (allPosters[i].style.top = getRandomInt(vpH + monthPlan.clientHeight, contentHeight - vpH) + "px", allPosters[i].style.left = getRandomInt(-150, vpW - .5 * posterWidth) + "px");
	monthPlan.style.top = vpH + 20 + "px", monthPlan.style.left = (contentWidth - vpW) / 2 + "px", monthPlan.style.width = vpW + "px", draggableContainer("scrollTop", .1)
}
var rotateDisc = [],
	rotateDiscIndex, discElement = document.querySelectorAll(".music-player-lp ");
for (i = 0; i < discElement.length; i++) rotateDisc[i] = new TweenMax.to(discElement[i], .15, {
	rotation: "360",
	ease: Linear.easeNone,
	repeat: -1,
	paused: !0
}).timeScale(0);
var player = new SoundCloudAudio("cb4aaa60c1882fd4f9d0ef36e37db2e6"),
	render = function() {
		player.unbindAll(), player.on("ended", function() {
			pausePlayer(stop)
		})
	};
Gator(document).on("click", ".sc-play-pause", function() {
	function t() {
		currentPositionValue = player.audio.currentTime / thisSongDuration, progressBarValue.style.width = 100 * currentPositionValue + "%"
	}
	return artistTitle = document.querySelector(".play span.top").textContent, trackTitle = document.querySelector(".play span.bottom").textContent, rotateDiscIndex = this.nextElementSibling.getAttribute("disc-index") - 1, songAvailable ? (player.playing ? (TweenLite.to(rotateDisc[rotateDiscIndex], 2, {
		timeScale: 0,
		onComplete: function() {
			this.pause()
		}
	}), classie.remove(this, "show-pause-btn"), classie.remove(this, "now-playing"), player.pause(), clearInterval(progressBarInterval)) : (classie.add(this.previousElementSibling, "is-visible"), classie.add(this, "now-playing"), classie.add(this, "show-pause-btn"), classie.add(progressBar, "is-visible"), checkIfPlaying(), player.play(), document.title = "  💿 " + artistTitle + "–" + trackTitle, thisSongDuration = player.duration, progressBarInterval = setInterval(t, 1e3)), !1) : (overlayMessage.style.display = "table", setTimeout(function() {
		classie.add(overlayMessage, "is-visible")
	}, 50), !1)
});
var checkIfPlayingTimer;
Gator(document).on("click", "#menu", function() {
	return classie.has(documentBody, "nav-open") ? (closeAll = 10, imprintOpen && (classie.remove(documentBody, "impressum--visible"), classie.remove(imprintLink, "open"), closeAll = 350), setTimeout(function() {
		classie.remove(documentBody, "nav-open"), classie.remove(navOverlay, "is-visible"), setTimeout(function() {
			navOverlay.style.display = "none", imprintOpen = !1
		}, 550)
	}, closeAll)) : (navOverlay.style.display = "block", classie.add(documentBody, "nav-open"), setTimeout(function() {
		classie.add(navOverlay, "is-visible")
	}, 20)), !1
}), Gator(document).on("click", "#impressum-link", function() {
	return imprintOpen ? (classie.remove(navOverlay, "impressum--visible"), classie.remove(documentBody, "impressum--visible"), classie.remove(this, "open"), imprintOpen = !1) : (classie.add(navOverlay, "impressum--visible"), classie.add(documentBody, "impressum--visible"), classie.add(this, "open"), imprintOpen = !0), !1
});
var transformPropPrefix = "transform";
transformPropPrefix = "WebkitTransform" === transformProp ? "-webkit-transform" : "transform", Gator(document).on("click", ".poster-overview__item", function() {
	var t = this.getAttribute("data-index"),
		e = parseInt(allPosters[t].style.top, 10),
		i = parseInt(allPosters[t].style.left, 10),
		n = getTransform(allPosters[t]),
		r = Math.round(n[1]),
		s = Math.round(n[0]);
	return container.scrollTop = e - (vpH / 2 - posterHeight / 2) + r, container.scrollLeft = i - (vpW / 2 - posterWidth / 2) + s, TweenLite.set(allPosters[t], {
		zIndex: Draggable.zIndex++
	}), container.style.visibility = "visible", imprintOpen ? (classie.remove(documentBody, "impressum--visible"), classie.remove(imprintLink, "open"), imprintOpen = !1, setTimeout(function() {
		container.style.visibility = "visible", classie.remove(documentBody, "nav-open"), classie.remove(navOverlay, "is-visible")
	}, 350), setTimeout(function() {
		navOverlay.style.display = "none"
	}, 1e3)) : (container.style.visibility = "visible", classie.remove(documentBody, "nav-open"), classie.remove(navOverlay, "is-visible"), setTimeout(function() {
		navOverlay.style.display = "none"
	}, 650)), !1
});
var d = new Date,
	actualDay = d.getDate(),
	actualMonth = d.getMonth() + 1,
	actualYear = d.getFullYear(),
	monthEvents = document.querySelectorAll(".month-event"),
	hours = d.getHours();
3 > hours && actualDay > 1 && actualDay--, actualYear = actualYear.toString().substr(2, 2), actualMonth = actualMonth.toString(), actualMonth.length < 2 && (actualMonth = "0" + actualMonth), actualDay = actualDay.toString(), actualDay.length < 2 && (actualDay = "0" + actualDay);
var actualDate = parseInt(actualYear + actualMonth + actualDay);
for (i = 0; i < monthEvents.length; i++) monthEvents[i][0] = monthEvents[i].getAttribute("data-date"), j = parseInt(i) - 1, 0 > j && (j = 0), monthEvents[i][0] == actualDate ? (monthEvents[i][1] = "next", monthEvents[i][2] = "Heute Abend") : monthEvents[i][0] > actualDate && monthEvents[j][0] < actualDate || i == j && monthEvents[i][0] > actualDate ? (monthEvents[i][1] = "next", monthEvents[i][2] = "Diesen " + getActualDay(monthEvents[i][0])) : monthEvents[i][0] < actualDate ? (monthEvents[i][1] = "past", monthEvents[i][2] = getActualDay(monthEvents[i][0], !0) + " " + monthEvents[i][0].toString().substr(4, 2) + "." + monthEvents[i][0].toString().substr(2, 2) + ".") : (monthEvents[i][1] = "future", monthEvents[i][2] = getActualDay(monthEvents[i][0], !0) + " " + monthEvents[i][0].toString().substr(4, 2) + "." + monthEvents[i][0].toString().substr(2, 2) + "."), monthEvents[i].children[0].innerHTML = monthEvents[i][2], classie.add(monthEvents[i], monthEvents[i][1]);
Element.prototype.remove = function() {
	this.parentElement.removeChild(this)
}, NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	for (var t = this.length - 1; t >= 0; t--) this[t] && this[t].parentElement && this[t].parentElement.removeChild(this[t])
}, classie.remove(documentBody, "loading");
for (var loadedImageCount, imageCount, preloadPercentage, preloadImagesArray = [], preloadImages = document.querySelectorAll(".b-lazy"), i = 0, len = preloadImages.length; len > i; i++) {
	var preloadImageUrl = preloadImages[i].getAttribute("data-src"),
		img = new Image;
	img.src = preloadImages[i].getAttribute("data-src"), preloadImagesArray[i] = img
}!
function() {
	640 >= vpW && posterOverview.remove();
	var t = imagesLoaded(preloadImagesArray);
	t.on("progress", onProgress), t.on("always", onAlways), imageCount = t.images.length, resetProgress(), updateProgress(0)
}(), Gator(document).on("click", "#overlay-message", function() {
	return classie.remove(this, "is-visible"), setTimeout(function() {
		overlayMessage.style.display = "none"
	}, 300), !1
}), window.addEventListener("resize", function() {
	clearTimeout(window.resizedFinished), window.resizedFinished = setTimeout(function() {
		vpH = window.innerHeight, vpW = window.innerWidth, container.style.width = vpW + "px", container.style.height = vpH + "px"
	}, 250)
}, !0);