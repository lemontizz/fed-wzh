define(function(require, exports, module) {
	var $ = require('jquery'),
		ajax = require('ajax'),
		Mustache = require('mustache');

	let defaultOpts = {
		url: '/',
		method: 'GET',
		gridWrapId: 'grid-wrap',
		gridTemplateId: 'grid-template',
		textboxSearch: 'textbox-search',
		btnSearchId: 'btn-search',
		searchFields: 'username',
		pagingWrapId: 'paging-wrap',
		pageSize: 10,
		pageIndex: 1
	};

	let Grid = function(options) {
		let opts = Object.assign({}, defaultOpts, options);

		this.gridUrl = opts.url;
		this.gridWrapId = opts.gridWrapId;
		this.gridTemplateId = opts.gridTemplateId;
		this.btnSearchId = opts.btnSearchId;
		this.textboxSearch = opts.textboxSearch;
		this.searchFields = opts.searchFields;
		this.pagingWrapId = opts.pagingWrapId;
		this.pageSize = opts.pageSize;
		this.pageIndex = opts.pageIndex;
	};

	Grid.prototype = {
		init: function() {
			this.bindEls();
			this.bindEvent();
			this.getData();
		},
		bindEls: function() {
			this.$grid = $('#' + this.gridWrapId);
			this.$template = $('#' + this.gridTemplateId);
			this.$btnSearch = $('#' + this.btnSearchId);
			this.$tbSearch = $('#' + this.textboxSearch);
			this.$paging = $('#' + this.pagingWrapId);
		},
		bindEvent: function() {
			let self = this;

			this.$btnSearch.click(function() {
				self.pageIndex = 1;
				self.getData();
			});

			this.$tbSearch.keyup(function(e) {
				if(e.keyCode === 13) {
					self.pageIndex = 1;
					self.getData();
				}
			})
		},
		getData: function() {
			let self = this;

			ajax({
				url: this.gridUrl,
				data: {
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					search: this.$tbSearch.val(),
					fields: this.searchFields
				}
			})
			.done(function(result) {
				self.buildList(result);
			});
		},
		buildList: function(result) {
			let output = Mustache.render(this.$template.html(), {records: result.data});

			this.$grid.html(output);
		}
	}

	module.exports = Grid;
});