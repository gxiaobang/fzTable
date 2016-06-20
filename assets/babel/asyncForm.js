/**
 * 表单异步提交
 */
import {
	$s, BaseMethod,
	addEvent, removeEvent, fixEvent,
	mixin, forEach, parseForm } from './util.js';
import Http from './http.js';

class AsyncForm extends BaseMethod {
	constructor(el, options = {}) {
		super();
		this.el = $s(el)[0];
		this.url = options.url;
		this.method = options.method;
		this.initFn('success', 'complete', 'error');
		this.events();
	}

	// 获取url
	getUrl() {
		if (!this.url) {
			this.url = this.el.getAttribute('action');
		}
		return this.url;
	}
	// 获取提交方式
	getMethod() {
		if (!this.method) {
			this.method = this.el.getAttribute('method');
		}
		return this.method;
	}

	// 发送请求
	send(data = {}) {
		new Http({
			url: this.getUrl(),
			method: this.getMethod(),
			param: mixin(data, parseForm(this.el))
		})
			.on('success', data => this.trigger('success', null, data));
	}

	events() {
		addEvent(this.el, 'submit', event => {
			event = fixEvent(event);
			event.preventDefault();
			this.send(null);
		});
	}
}

export default AsyncForm;