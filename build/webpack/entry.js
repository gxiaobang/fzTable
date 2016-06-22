/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(4);
	__webpack_require__(3);
	__webpack_require__(6);
	__webpack_require__(5);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	var _http = __webpack_require__(3);
	
	var _http2 = _interopRequireDefault(_http);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 表单异步提交
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var AsyncForm = function (_BaseMethod) {
		_inherits(AsyncForm, _BaseMethod);
	
		function AsyncForm(el) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
			_classCallCheck(this, AsyncForm);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AsyncForm).call(this));
	
			_this.el = (0, _util.$s)(el)[0];
			_this.url = options.url;
			_this.method = options.method;
			_this.initFn('success', 'complete', 'error');
			_this.events();
			return _this;
		}
	
		// 获取url
	
	
		_createClass(AsyncForm, [{
			key: 'getUrl',
			value: function getUrl() {
				if (!this.url) {
					this.url = this.el.getAttribute('action');
				}
				return this.url;
			}
			// 获取提交方式
	
		}, {
			key: 'getMethod',
			value: function getMethod() {
				if (!this.method) {
					this.method = this.el.getAttribute('method');
				}
				return this.method;
			}
	
			// 发送请求
	
		}, {
			key: 'send',
			value: function send() {
				var _this2 = this;
	
				var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
				new _http2.default({
					url: this.getUrl(),
					method: this.getMethod(),
					param: (0, _util.mixin)(data, (0, _util.parseForm)(this.el))
				}).on('success', function (data) {
					return _this2.trigger('success', null, data);
				});
			}
		}, {
			key: 'events',
			value: function events() {
				var _this3 = this;
	
				(0, _util.addEvent)(this.el, 'submit', function (event) {
					event = (0, _util.fixEvent)(event);
					event.preventDefault();
					_this3.send(null);
				});
			}
		}]);
	
		return AsyncForm;
	}(_util.BaseMethod);
	
	exports.default = AsyncForm;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * util.js
	 * 工具类
	 * by bang
	 */
	
	// 无操作
	function noop() {}
	
	// 基于class
	
	var BaseMethod = function () {
		function BaseMethod() {
			_classCallCheck(this, BaseMethod);
	
			this.fn = {};
		}
	
		// 初始化监听事件
	
	
		_createClass(BaseMethod, [{
			key: 'initFn',
			value: function initFn() {
				var _this = this;
	
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				forEach(args, function (name) {
					_this.fn[name] = [];
				});
			}
	
			// 安装事件
	
		}, {
			key: 'on',
			value: function on(type, fn) {
				if (isArray(this.fn[type])) {
					this.fn[type].push(fn);
				}
				return this;
			}
			// 卸载事件
	
		}, {
			key: 'un',
			value: function un(type, fn) {
				if (isArray(this.fn[type])) {
					if (fn) {
						for (var i = 0, f; f = this.fn[type][i]; i++) {
							if (f === fn) {
								this.fn[type].splice(i, 1);
								i--;
							}
						}
					} else {
						this.fn[type].length = 0;
					}
				}
				return this;
			}
	
			// 修改设置属性
	
		}, {
			key: 'set',
			value: function set(prop, value) {
				this[prop] = value;
				return this;
			}
			// 修改添加属性
	
		}, {
			key: 'add',
			value: function add(prop, value) {
				if (isArray(this[prop])) {
					this[prop].push(value);
				}
				return this;
			}
	
			// 触发事件
	
		}, {
			key: 'trigger',
			value: function trigger(fn, obj) {
				for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
					args[_key2 - 2] = arguments[_key2];
				}
	
				var result;
				if (isFunction(fn)) {
					result = fn.call.apply(fn, [obj].concat(args));
				} else if (isArray(fn)) {
					fn.forEach(function (f) {
						result = f.call.apply(f, [obj].concat(args));
						return result;
					});
				} else if (isString(fn)) {
					result = this.trigger.apply(this, [this.fn[fn], obj].concat(args));
				}
	
				return result !== false;
			}
		}]);
	
		return BaseMethod;
	}();
	
	// 类型判断
	
	
	var obt = Object.prototype.toString;
	function isType(type) {
		return function (obj) {
			return obt.call(obj) === '[object ' + type + ']';
		};
	}
	
	var isObject = isType('Object'),
	    isArray = isType('Array'),
	    isNumber = isType('Number'),
	    isString = isType('String'),
	    isFunction = isType('Function');
	
	// 驼峰命名
	function named(name) {
		return name.replace(/[-]\w/g, function (a) {
			return a.charAt(1).toUpperCase();
		});
	}
	
	// 获取dom节点
	function $s(expr) {
		var root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	
		if ((typeof expr === 'undefined' ? 'undefined' : _typeof(expr)) === 'object') {
			if (expr.nodeType !== 1) {
				return expr;
			} else {
				return [expr];
			}
		}
		return root.querySelectorAll(expr);
	}
	
	// 获取索引
	function getIndex(source) {
		var arr = arguments.length <= 1 || arguments[1] === undefined ? source.parentNode.children : arguments[1];
	
		return [].indexOf.call(arr, source);
	}
	
	// 获取range
	function getRange() {
		var range = document.createRange();
		range.selectNodeContents(document.body);
	
		getRange = function getRange() {
			return range;
		};
		return getRange();
	}
	
	// 解析html
	function parseDOM(html) {
		var range = getRange();
	
		if (range.createContextualFragment) {
			return range.createContextualFragment(html);
		} else {
			var fragment = document.createDocumentFragment();
			var div = document.createElement('div');
			div.innerHTML = html;
			while (div.firstChild) {
				fragment.appendChild(div.firstChild);
			}
			return fragment;
		}
	}
	
	// 解析表单
	function parseForm(form) {
		var json = {};
		forEach(form.elements, function (element) {
			var name = element.name;
			var type = element.type;
			if (name) {
				switch (type) {
					case 'radio':
					case 'checkbox':
						if (element.checked) {
							json[name] = element.value || 'true';
						}
						break;
					default:
						json[name] = element.value;
						break;
				}
			}
		});
		return json;
	}
	
	// 设置样式
	function getStyle(el, name) {
		// 标准
		if (window.getComputedStyle) {
			return window.getComputedStyle(el, '')[name] || null;
		}
		// IE8-
		else {
				// 透明度
				if (name == 'opacity') {
					return (el.filters.alpha || el.filters['DXImageTransform.Microsoft.Alpha'] || 100) / 100;
				} else {
					return el.currentStyle[name] || null;
				}
			}
	}
	
	// 获取样式
	function setStyle(el, name, value) {
	
		if (isString(el)) {
			el = $s(el)[0];
		} else if (isArray(el)) {
			forEach(el, function (elem) {
				return setStyle(elem, name, value);
			});
		}
	
		var props = {};
		if (arguments.length == 3 && typeof name == 'string') {
			props[name] = value;
		} else {
			props = name;
		}
	
		for (var _name in props) {
			if (_name == 'opacity') {
				el.style.opacity = props[_name];
				el.style.filter = 'alpha(filter=' + props[_name] / 100 + ')';
			} else if (isNaN(props[_name])) {
				el.style[_name] = props[_name];
			} else {
				el.style[_name] = props[_name] + 'px';
			}
		}
	}
	
	// className
	function hasClass(el, className) {
		if (el.classList) {
			return el.classList.contains(className);
		} else {
			var list = el.className.split(/\s+/g);
			return list.indexOf(className) > -1;
		}
	}
	function addClass(el, className) {
		if (el.classList) {
			el.classList.add(className);
		} else {
			if (!hasClass(el, className)) {
				var list = el.className.split(/\s+/g);
				list.push(className);
				el.className = list.join(' ');
			}
		}
	}
	function removeClass(el, className) {
		if (el.classList) {
			el.classList.remove(className);
		} else {
			if (hasClass(el, className)) {
				var list = el.className.split(/\s+/g);
				list.splice(list.indexOf(className), 1);
				el.className = list.join(' ');
			}
		}
	}
	function toggleClass(el, className) {
		if (hasClass(el, className)) {
			removeClass(el, className);
		} else {
			addClass(el, className);
		}
	}
	
	// 兼容事件
	function fixEvent(event) {
		event = event || window.event;
	
		if (!event.target) {
			event.target = event.srcElement;
		}
	
		if (!event.stopPropagation) {
			event.stopPropagation = function () {
				event.cancelBubble = true;
			};
		}
	
		if (!event.preventDefault) {
			event.preventDefault = function () {
				event.returnValue = false;
			};
		}
	
		return event;
	}
	
	// 判断包含关系
	function contains(e1, e2) {
		if (e1.contains) {
			return e1.contains(e2);
		} else {
			return e1.compareDocumentPosition(e2) == 16;
		}
	}
	
	// 事件绑定
	function addEvent(el, type, expr, fn) {
		// el.addEventListener(type, fn, false);
	
		if (isString(el)) {
			el = $s(el);
		}
	
		if (el.length && el.nodeType != 1) {
			forEach(el, function (elem) {
				addEvent(elem, type, expr, fn);
			});
		} else {
			if (isFunction(expr)) {
				fn = expr;
	
				/*let handler = (event) => fn.call(el, fixEvent(event));
	   handler.fn = fn;*/
				if (suports.is('addEventListener')) {
					el.addEventListener(type, fn, false);
				} else {
					el.attachEvent('on' + type, fn);
				}
			} else {
				delegate(el, type, expr, fn);
			}
		}
	}
	
	// 事件解绑
	function removeEvent(el, type, fn) {
		if (suports.is('removeEventListener')) {
			el.removeEventListener(type, fn);
		} else {
			el.detachEvent('on' + type, fn);
		}
	}
	
	// 事件委托
	function delegate(el, type, expr, fn) {
		addEvent(el, type, function (event) {
			event = fixEvent(event);
			var target = event.target;
	
			if (suports.is('matches')) {
				while (target && target !== el) {
					if (target.matches(expr)) {
						fn && fn.call(target, event);
						break;
					}
					target = target.parentNode;
				}
			} else {
				var els = $s(expr);
				els = Array.from(els);
				while (target !== el) {
					if (els.indexOf(el) > -1) {
						fn && fn.call(target, event);
						break;
					}
					target = target.parentNode;
				}
			}
		});
	}
	
	// 动画帧
	var requestAnim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
		return setTimeout(fn, 1000 / 60);
	};
	
	// 遍历类数组
	function forEach(array, func) {
		if (isFunction(func)) {
			for (var i = 0, len = array.length; i < len; i++) {
				if (func(array[i], i) === false) break;
			}
		}
	}
	
	// 混合 类似于extend
	function mixin(target) {
		for (var _len3 = arguments.length, sources = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			sources[_key3 - 1] = arguments[_key3];
		}
	
		forEach(sources, function (source) {
			for (var key in source) {
				target[key] = source[key];
			}
		});
		return target;
	}
	
	// 模板
	function templ(str) {
		for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			args[_key4 - 1] = arguments[_key4];
		}
	
		str = str.replace(/\{(\d+)\}/gm, function (m, n) {
			return args[n] || '';
		});
		return str;
	}
	
	// 日期输出格式
	function dateFormat(fmt, date) {
		date = date || new Date();
		function _pad(num) {
			if (num < 10) {
				num = '0' + num;
			}
			return num;
		}
	
		return String(fmt).replace(/yyyy|MM|dd|HH|mm|ss|D/g, function (m) {
			switch (m) {
				case 'yyyy':
					return date.getFullYear();
				case 'MM':
					return _pad(date.getMonth() + 1);
				case 'dd':
					return _pad(date.getDate());
				case 'HH':
					return _pad(date.getHours());
				case 'mm':
					return _pad(date.getMinutes());
				case 'ss':
					return _pad(date.getSeconds());
				case 'D':
					var locDays = ['日', '一', '二', '三', '四', '五', '六'];
					return _pad(locDays[date.getDay()]);
			}
		});
	}
	
	// 获取相对页面所在位置
	function getPoint(el) {
		var x = 0,
		    y = 0;
	
		while (el) {
			x += el.offsetLeft;
			y += el.offsetTop;
	
			el = el.offsetParent;
		}
	
		return {
			x: x, y: y
		};
	}
	
	// 检测浏览器支持
	var suports = {
		_cache: {},
		is: function is(prop) {
			return true;
		},
	
		// 获取支持属性
		get: function get(prop) {
			if (this._cache[prop]) return this._cache[prop];
			return prop;
		}
	};
	
	exports.noop = noop;
	exports.BaseMethod = BaseMethod;
	exports.isObject = isObject;
	exports.isNumber = isNumber;
	exports.isArray = isArray;
	exports.isString = isString;
	exports.isFunction = isFunction;
	exports.forEach = forEach;
	exports.getIndex = getIndex;
	exports.$s = $s;
	exports.parseDOM = parseDOM;
	exports.parseForm = parseForm;
	exports.getStyle = getStyle;
	exports.setStyle = setStyle;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.hasClass = hasClass;
	exports.toggleClass = toggleClass;
	exports.contains = contains;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.fixEvent = fixEvent;
	exports.templ = templ;
	exports.dateFormat = dateFormat;
	exports.getPoint = getPoint;
	exports.mixin = mixin;
	exports.requestAnim = requestAnim;
	exports.suports = suports;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// http请求
	
	var Http = function (_BaseMethod) {
		_inherits(Http, _BaseMethod);
	
		function Http(_ref) {
			var _ref$method = _ref.method;
			var method = _ref$method === undefined ? 'GET' : _ref$method;
			var _ref$url = _ref.url;
			var url = _ref$url === undefined ? '' : _ref$url;
			var _ref$param = _ref.param;
			var param = _ref$param === undefined ? null : _ref$param;
	
			_classCallCheck(this, Http);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Http).call(this));
	
			_this.initFn('beforeSend', 'success', 'error', 'complete');
			_this.method = method;
			_this.url = url;
			_this.param = param;
			_this.setup();
			return _this;
		}
	
		_createClass(Http, [{
			key: 'setup',
			value: function setup() {
				this.create();
				this.events();
				this.send(this.param);
			}
		}, {
			key: 'create',
			value: function create() {
				this.xhr = new XMLHttpRequest();
			}
		}, {
			key: 'send',
			value: function send(param) {
				this.beforeSend();
				switch (this.method.toUpperCase()) {
					case 'GET':
						this.xhr.open('GET', this.url, true);
						this.xhr.send();
						break;
					case 'POST':
						this.xhr.open('POST', this.url, true);
						this.xhr.send(this.param);
						break;
				}
			}
		}, {
			key: 'events',
			value: function events() {
				var _this2 = this;
	
				this.xhr.onreadystatechange = function () {
					// console.log(this.xhr.readyState);
					if (_this2.xhr.readyState == 4) {
						switch (_this2.xhr.status) {
							case 200:
							// 有缓存
							case 302:
								_this2.success();
								break;
							case 404:
							case 500:
								_this2.error();
								break;
						}
						_this2.complete();
					}
				};
			}
	
			// 请求发送前
	
		}, {
			key: 'beforeSend',
			value: function beforeSend() {
				this.trigger(this.fn.beforeSend, this.xhr);
			}
			// 成功
	
		}, {
			key: 'success',
			value: function success() {
				this.trigger(this.fn.success, this.xhr, this.xhr.responseText);
			}
			// 错误
	
		}, {
			key: 'error',
			value: function error() {
				this.trigger(this.fn.error, this.xhr, this.xhr.statusText);
			}
			// 完成
	
		}, {
			key: 'complete',
			value: function complete() {
				this.trigger(this.fn.complete, this.xhr);
			}
		}], [{
			key: 'get',
			value: function get(url, param) {
				return new Http({ method: 'GET', url: url, param: param });
			}
		}, {
			key: 'post',
			value: function post(url, param) {
				return new Http({ method: 'POST', url: url, param: param });
			}
		}]);
	
		return Http;
	}(_util.BaseMethod);
	
	exports.default = Http;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(5);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _table = __webpack_require__(6);
	
	var _table2 = _interopRequireDefault(_table);
	
	var _util = __webpack_require__(2);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	new _table2.default('#wrapper', {
		form: document.forms[0]
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	var _http = __webpack_require__(3);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _asyncForm = __webpack_require__(1);
	
	var _asyncForm2 = _interopRequireDefault(_asyncForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 表格组件：冰冻表头、排序、筛选
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var defaults = {
		templ: '\n\t\t\t\t<section class="table-main"></section>\n\t\t\t\t<section class="table-freeze-head"></section>\n\t\t\t\t<section class="table-freeze-foot"></section>\n\t\t\t\t<section class="table-freeze-column"></section>\n\t\t\t\t<section class="table-pagin"></section>\n\t\t',
	
		freeze: 0,
		// 别名
		alias: {
			head: 'head',
			list: 'list',
			total: 'total',
			ignore: 'ignore'
		}
	};
	
	function isWindow(obj) {
		return window == obj && window.window == obj;
	}
	
	var Table = function (_BaseMethod) {
		_inherits(Table, _BaseMethod);
	
		function Table(el) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
			_classCallCheck(this, Table);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Table).call(this));
	
			_this.el = (0, _util.$s)(el)[0];
			_this.form = (0, _util.$s)(options.form)[0];
			_this.url = options.url;
			_this.data = options.data;
			_this.param = options.param;
			_this.freeze = options.freeze || defaults.freeze;
			_this.root = (0, _util.$s)(options.root)[0] || window;
	
			_this.loaded = false;
			_this.setup();
			return _this;
		}
	
		_createClass(Table, [{
			key: 'setup',
			value: function setup() {
				var _this2 = this;
	
				if (this.url) {
					new _http2.default({
						url: this.url,
						method: this.method || 'POST',
						param: this.param
					}).on('success', function (data) {
						return _this2.render(data);
					});
				} else if (this.form) {
					new _asyncForm2.default(this.form).on('success', function (data) {
						return _this2.render(data);
					}).send(this.param || null);
				} else if (this.data) {
					this.render(this.data);
				}
			}
			// 渲染表格
	
		}, {
			key: 'render',
			value: function render(data) {
				// this.isReady = true;
				data = JSON.parse(data);
				this.getKey(data[defaults.alias.head], data[defaults.alias.ignore]);
				this.create();
				console.log(data);
				this.update('\n\t\t\t\t<table class="table table-striped">\n\t\t\t\t\t' + this.htmlHead(data[defaults.alias.head]) + '\n\t\t\t\t\t' + this.htmlBody(data[defaults.alias.list]) + '\n\t\t\t\t\t' + this.htmlFoot(data[defaults.alias.total]) + '\n\t\t\t\t</table>\n\t\t\t');
				this.rebuild();
				this.setScroll();
				this.events();
			}
	
			// 事件
	
		}, {
			key: 'events',
			value: function events() {
				var _this3 = this;
	
				if (!this.loaded) {
					this.loaded = true;
					(0, _util.addEvent)(window, 'resize', function () {
						_this3.rebuild();
					});
	
					(0, _util.addEvent)(this.root, 'scroll', function () {
						_this3.setScroll();
					});
				}
	
				(0, _util.addEvent)(this.main, 'scroll', function () {
					_this3.setScroll2();
				});
	
				(0, _util.addEvent)(this.freezeFoot, 'scroll', function () {
					_this3.setScroll3();
				});
			}
	
			// 设置滚动条
	
		}, {
			key: 'setScroll',
			value: function setScroll() {
				if (isWindow(this.root)) {
					var point = (0, _util.getPoint)(this.main);
					var l = document.body.scrollLeft || document.documentElement.scrollLeft,
					    t = document.body.scrollTop || document.documentElement.scrollTop;
	
					if (t > point.y) {
						(0, _util.addClass)(this.freezeHead, 'fixed');
						this.freezeHead.style.left = point.x + 'px';
					} else {
						(0, _util.removeClass)(this.freezeHead, 'fixed');
						this.freezeHead.style.left = '';
					}
	
					if (t < point.y + this.main.offsetHeight - document.documentElement.clientHeight) {
						(0, _util.addClass)(this.freezeFoot, 'fixed');
						this.freezeFoot.style.left = point.x + 'px';
						this.freezeFoot.style.display = '';
						this.freezeFoot.scrollLeft = this.main.scrollLeft;
					} else {
						(0, _util.removeClass)(this.freezeFoot, 'fixed');
						this.freezeFoot.style.left = '';
						this.freezeFoot.style.display = 'none';
					}
				} else {}
			}
	
			// 横向滚动条
	
		}, {
			key: 'setScroll2',
			value: function setScroll2() {
				for (var i = 0; i < this.freezeHead.children.length; i++) {
					this.freezeHead.children[0].style.marginLeft = -this.main.scrollLeft + 'px';
				}
			}
	
			// 固定滚动条
	
		}, {
			key: 'setScroll3',
			value: function setScroll3() {
				this.main.scrollLeft = this.freezeFoot.scrollLeft;
			}
	
			// 重建
	
		}, {
			key: 'rebuild',
			value: function rebuild() {
				this.setHeadCellWidth();
				this.setFootCellWidth();
				this.freezeHead.style.width = this.freezeFoot.style.width = this.main.offsetWidth + 'px';
			}
	
			// 获取字段keys
	
		}, {
			key: 'getKey',
			value: function getKey() {
				var head = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
				var ignore = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
				head = head[0];
				this.keys = [];
				for (var key in head) {
					if (ignore.indexOf(key) > -1) continue;
					this.keys.push(key);
				}
			}
	
			// 刷新表格数据
	
		}, {
			key: 'update',
			value: function update(html) {
				this.main.innerHTML = html;
				if (this.freeze > 0) {
					this.freezeColumn = html;
				}
				this.table = this.main.children[0];
				this.updateHead();
			}
	
			// 更新冰冻表头
	
		}, {
			key: 'updateHead',
			value: function updateHead() {
				var tHead = this.table.tHead,
				    row,
				    cell;
	
				var html = '';
				for (var i = 0; row = tHead.rows[i]; i++) {
					html += '<div class="table-freeze-row">';
					for (var j = 0; cell = row.cells[j]; j++) {
						html += '<div class="table-freeze-cell">';
						html += cell.innerHTML;
						html += '</div>';
					}
					html += '</div>';
				}
	
				this.freezeHead.innerHTML = html;
			}
	
			// 设置tHead cell宽度
	
		}, {
			key: 'setHeadCellWidth',
			value: function setHeadCellWidth() {
				var tHead = this.table.tHead,
				    row = void 0,
				    cell = void 0;
				for (var i = 0; row = tHead.rows[i]; i++) {
					var cells = (0, _util.$s)('.table-freeze-cell', this.freezeHead.children[i]);
					for (var j = 0; cell = row.cells[j]; j++) {
						cells[j].style.width = cell.offsetWidth + 'px';
					}
				}
			}
			// 设置tFoot cell宽度
	
		}, {
			key: 'setFootCellWidth',
			value: function setFootCellWidth() {
				var tFoot = this.table.tFoot,
				    row = void 0,
				    cell = void 0;
	
				if (tFoot.rows.length) {
					for (var i = 0; row = tFoot.rows[i]; i++) {
						var cells = (0, _util.$s)('.table-freeze-cell', this.freezeFoot.children[i]);
						for (var j = 0; cell = row.cells[j]; j++) {
							cells[j].style.width = cell.offsetWidth + 'px';
						}
					}
				} else {
					this.freezeFoot.innerHTML = '<div style="width: ' + this.table.offsetWidth + 'px; height: 1px;"></div>';
				}
			}
		}, {
			key: 'create',
			value: function create() {
				(0, _util.addClass)(this.el, 'table-freeze');
				this.el.innerHTML = defaults.templ;
				this.main = (0, _util.$s)('.table-main', this.el)[0];
				this.freezeHead = (0, _util.$s)('.table-freeze-head', this.el)[0];
				this.freezeFoot = (0, _util.$s)('.table-freeze-foot', this.el)[0];
				this.freezeColumn = (0, _util.$s)('.table-freeze-column', this.el)[0];
			}
	
			// <thead>
	
		}, {
			key: 'htmlHead',
			value: function htmlHead(data) {
				var _this4 = this;
	
				var that = this;
				var html = '';
				html += '<thead>';
				data.forEach(function (item) {
					html += '<tr>';
					for (var i = 0; i < _this4.keys.length; i++) {
						html += '<th>' + item[_this4.keys[i]] + '</th>';
					}
					html += '</tr>';
				});
				html += '</thead>';
				return html;
			}
			// <tbody>
	
		}, {
			key: 'htmlBody',
			value: function htmlBody(data) {
				var _this5 = this;
	
				var that = this;
				var html = '';
				html += '<tbody>';
				data.forEach(function (item) {
					html += '<tr>';
					for (var i = 0; i < _this5.keys.length; i++) {
						html += '<td>' + item[_this5.keys[i]] + '</td>';
					}
					html += '</tr>';
				});
				html += '</tbody>';
				return html;
			}
			// <tfoot>
	
		}, {
			key: 'htmlFoot',
			value: function htmlFoot(data) {
				var _this6 = this;
	
				var that = this;
				var html = '';
				html += '<tfoot>';
				data.forEach(function (item) {
					html += '<tr>';
					for (var i = 0; i < _this6.keys.length; i++) {
						html += '<th>' + item[_this6.keys[i]] + '</th>';
					}
					html += '</tr>';
				});
				html += '</tfoot>';
				return html;
			}
		}], [{
			key: 'init',
			value: function init(el, options) {
				return new Table(el, options);
			}
		}]);
	
		return Table;
	}(_util.BaseMethod);
	
	exports.default = Table;

/***/ }
/******/ ]);
//# sourceMappingURL=entry.js.map