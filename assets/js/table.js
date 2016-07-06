/**
 * 表格组件：冰冻表头、排序、筛选
 */
import { $s, BaseMethod, parseDOM, addClass, removeClass, addEvent, getPoint } from './util.js';
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

function isWindow(obj) {
	return window == obj && window.window == obj;
}

class Table extends BaseMethod {
	constructor(el, options = {}) {
		super();
		this.el = $s(el)[0];
		this.form = $s(options.form)[0];
		this.url = options.url;
		this.data = options.data;
		this.param = options.param;
		this.freeze = options.freeze || defaults.freeze;
		this.root = $s(options.root)[0] || window;

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
		this.rebuild();
		this.setScroll();
		this.events();
	}

	// 事件
	events() {
		if (!this.loaded) {
			this.loaded = true;
			addEvent(window, 'resize', () => {
				this.rebuild();
			});

			addEvent(this.root, 'scroll', () => {
				this.setScroll();
			});
		}

		addEvent(this.main, 'scroll', () => {
			this.setScroll2();
		});

		addEvent(this.freezeFoot, 'scroll', () => {
			this.setScroll3();
		});
	}

	// 设置滚动条
	setScroll() {
		if (isWindow(this.root)) {
			let point = getPoint(this.main);
			let l = document.body.scrollLeft || document.documentElement.scrollLeft,
					t = document.body.scrollTop || document.documentElement.scrollTop;

			if (t > point.y) {
				addClass(this.freezeHead, 'fixed');
				this.freezeHead.style.left = point.x + 'px';
			}
			else {
				removeClass(this.freezeHead, 'fixed');
				this.freezeHead.style.left = '';
			}

			if (t < point.y + this.main.offsetHeight - document.documentElement.clientHeight) {
				addClass(this.freezeFoot, 'fixed');
				this.freezeFoot.style.left = point.x + 'px';
				this.freezeFoot.style.display = '';
				this.freezeFoot.scrollLeft = this.main.scrollLeft;
			}
			else {
				removeClass(this.freezeFoot, 'fixed');
				this.freezeFoot.style.left = '';
				this.freezeFoot.style.display = 'none';
			}
		}
		else {

		}
	}

	// 横向滚动条
	setScroll2() {
		for (let i = 0; i < this.freezeHead.children.length; i++) {
			this.freezeHead.children[0].style.marginLeft = -this.main.scrollLeft + 'px';
		}
	}

	// 固定滚动条
	setScroll3() {
		this.main.scrollLeft = this.freezeFoot.scrollLeft;
	}

	// 重建
	rebuild() {
		this.setHeadCellWidth();
		this.setFootCellWidth();
		this.freezeHead.style.width = 
			this.freezeFoot.style.width = 
				this.main.offsetWidth + 'px';
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

	// 设置tHead cell宽度
	setHeadCellWidth() {
		let tHead = this.table.tHead,
				row, cell;
		for (let i = 0; row = tHead.rows[i]; i++) {
			let cells = $s('.table-freeze-cell', this.freezeHead.children[i]);
			for (let j = 0; cell = row.cells[j]; j++) {
				cells[j].style.width = cell.offsetWidth + 'px';
			}
		}
	}
	// 设置tFoot cell宽度
	setFootCellWidth() {
		let tFoot = this.table.tFoot,
				row, cell;

		if (tFoot.rows.length) {
			for (let i = 0; row = tFoot.rows[i]; i++) {
				let cells = $s('.table-freeze-cell', this.freezeFoot.children[i]);
				for (let j = 0; cell = row.cells[j]; j++) {
					cells[j].style.width = cell.offsetWidth + 'px';
				}
			}
		}
		else {
			this.freezeFoot.innerHTML = `<div style="width: ${this.table.offsetWidth}px; height: 1px;"></div>`;
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