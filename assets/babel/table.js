/**
 * 表格组件：冰冻表头、排序、筛选
 */
import { $s, BaseMethod, parseDOM, addClass, removeClass, addEvent } from './util.js';
import Http from './http.js';
import AsyncForm from './asyncForm.js';


const defaults = {
	templ: `
				<section class="table-main"></section>
				<section class="table-freeze-head"></section>
				<section class="table-freeze-foot"></section>
				<section class="table-freeze-column"></section>
				<section class="table-pagin"></section>
		`,

	freeze: 0,
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
		this.freeze = defaults.freeze;

		this.loaded = false;
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
		// this.isReady = true;
		data = JSON.parse(data);
		this.getKey(data[ defaults.alias.head ], data[ defaults.alias.ignore ]);
		this.create();
		console.log(data);
		this.update(`
				<table class="table table-striped">
					${this.htmlHead(data[ defaults.alias.head ])}
					${this.htmlBody(data[ defaults.alias.list ])}
					${this.htmlFoot(data[ defaults.alias.total ])}
				</table>
			`);
		this.setHeadCellWidth();
		this.events();
	}

	// 事件
	events() {
		if (!this.loaded) {
			this.loaded = true;
			addEvent(window, 'resize', () => {
				this.rebuild();
			});
		}
	}

	// 重建
	rebuild() {
		this.setHeadCellWidth();
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
	update(html) {
		this.main.innerHTML = html;
		if (this.freeze > 0) {
			this.freezeColumn = html;
		}
		this.table = this.main.children[0];
		this.updateHead();
	}

	// 更新冰冻表头
	updateHead() {
		var tHead = this.table.tHead,
				row, cell;

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

	// 设置cell宽度
	setHeadCellWidth() {
		var tHead = this.table.tHead,
				row, cell;
		for (var i = 0; row = tHead.rows[i]; i++) {
			let cells = $s('.table-freeze-cell', this.freezeHead.children[i]);
			for (var j = 0; cell = row.cells[j]; j++) {
				cells[j].style.width = cell.offsetWidth + 'px';
			}
		}
	}

	create() {
		addClass(this.el, 'table-freeze');
		this.el.innerHTML = defaults.templ;
		this.main = $s('.table-main', this.el)[0];
		this.freezeHead = $s('.table-freeze-head', this.el)[0];
		this.freezeFoot = $s('.table-freeze-foot', this.el)[0];
		this.freezeColumn = $s('.table-freeze-column', this.el)[0];
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