# table 表格组件

### 简介
+ 固定表格单元格标题
+ 冰冻列，横向滚动时首列
+ 后台json格式数据渲染生成<table>
+ 分页栏显示当前数据分页状态
+ 扩展小功能：排序、筛选

### 用法
`new Table(el, options)`

### 参数配置
options		|type						|default		|description
----------|---------------|-----------|------------
form		  |String\|Object |无					|联动表单查询

### 使用示例
```javascript
table = new Table('#wrapper');
```