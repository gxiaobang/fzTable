/**
 * 表格组件：冰冻表头、排序、筛选
 */
import { $s, BaseMethod, parseDOM, addClass, removeClass } from './util.js';
import Http from './http.js';
import AsyncForm from './asyncForm.js';


const defaults = {
	templ: `
				<section class="grid-main"></section>
				<section class="grid-freeze-head"></section>
				<section class="grid-freeze-foot"></section>
				<section class="grid-freeze-column"></section>
		`,

	freeze: -1,
	// 别名
	alias: {
		head: 'head',
		list: 'list',
		total: 'total',
		ignore: 'ignore'
	}
};

class Table extends BaseMethod {
	constructor(el, options = {}) {
		super();
		this.el = $s(el)[0];
		this.form = $s(options.form)[0];
		this.url = options.url;
		this.data = options.data;
		this.param = options.param;
		this.setup();
	}
	setup() {
		if (this.url) {
			new Http({
				url: this.url,
				method: this.method || 'POST',
				param: this.param,
			}).on('success', data => this.render(data));
		}
		else if (this.form) {
			new AsyncForm(this.form)
				.on('success', data => this.render(data))
				.send( this.param || null );
		}
		else if (this.data) {
			this.render(this.data);
		}
	}
	// 渲染表格
	render(data) {
		data = JSON.parse(data);
		this.getKey(data[ defaults.alias.head ], data[ defaults.alias.ignore ]);
		this.create();
		this.update(data);
	}
	
	// 获取字段keys
	getKey(head = [], ignore = []) {
		head = head[0];
		this.keys = [];
		for (var key in head) {
			if (ignore.indexOf(key) > -1) continue;
			this.keys.push(key);
		}
	}

	// 刷新表格数据
	update(data) {
		console.log(data);
		this.main.innerHTML = '';
		this.main.appendChild(
				parseDOM(
						`
							<table>
								${this.htmlHead(data[ defaults.alias.head ])}
								${this.htmlBody(data[ defaults.alias.list ])}
								${this.htmlFoot(data[ defaults.alias.total ])}
							</table>
						`
					)
			);
	}

	create() {
		addClass(this.el, 'grid');
		this.el.innerHTML = defaults.templ;
		this.main = $s('.grid-main', this.el)[0];
		this.freezeHead = $s('.grid-freeze-head', this.el)[0];
		this.freezeFoot = $s('.grid-freeze-foot', this.el)[0];
		this.freezeColumn = $s('.grid-freeze-column', this.el)[0];
	}


	// <thead>
	htmlHead(data) {
		var that = this;
		var html = '';
		html += '<thead>';
		data.forEach((item) => {
			html += '<tr>';
			for (var i = 0; i < this.keys.length; i++) {
				html += `<th>${ item[this.keys[i]] }</th>`;
			}
			html += '</tr>';
		});
		html += '</thead>';
		return html;
	}
	// <tbody>
	htmlBody(data) {
		var that = this;
		var html = '';
		html += '<tbody>';
		data.forEach((item) => {
			html += '<tr>';
			for (var i = 0; i < this.keys.length; i++) {
				html += `<td>${ item[this.keys[i]] }</td>`;
			}
			html += '</tr>';
		});
		html += '</tbody>';
		return html;
	}
	// <tfoot>
	htmlFoot(data) {
		var that = this;
		var html = '';
		html += '<tfoot>';
		data.forEach((item) => {
			html += '<tr>';
			for (var i = 0; i < this.keys.length; i++) {
				html += `<th>${ item[this.keys[i]] }</th>`;
			}
			html += '</tr>';
		});
		html += '</tfoot>';
		return html;
	}

	static init(el, options) {
		return new Table(el, options);
	}
}


export default Table;