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
		searchFields: '',
		pagingWrapId: 'paging-wrap',
		pagingTemplateId: 'paging-template',
		pageSize: 10,
		pageIndex: 1,
		onRenderBefore: null,
		onClickedGirdItem: null
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
		this.onRenderBefore = opts.onRenderBefore;
		this.onClickedGirdItem = opts.onClickedGirdItem;
	};

	Grid.prototype = {
		init: function() {
			this.bindEls();
			this.bindInfo();
			this.bindEvent();
			this.getData();
		},
		bindEls: function() {
			this.$grid = $('#' + this.gridWrapId);
			this.$gridTemplate = $('#' + this.gridTemplateId);
			this.$btnSearch = $('#' + this.btnSearchId);
			this.$tbSearch = $('#' + this.textboxSearch);
			this.$paging = $('#' + this.pagingWrapId);
			this.$pagingTemplate = $('#' + this.pagingTemplate);
		},
		bindInfo: function() {
			this.gridData = [];
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
			});

			this.$grid.on('click', '[data-action]', function() {
				let action = $(this).data('action'),
					id = $(this).data('id');
				self.clickedGirdItem(action, id)
			});

			this.$paging.on('click', '[data-action]', function() {
				if($(this).hasClass('disabled')) return;
				let action = $(this).data('action');
				self.gotoPage(action);
			});
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
				if(typeof self.onRenderBefore === 'function') {
					self.onRenderBefore.call(self, result);
				}
				console.log(result);
				self.gridData = result.data || [];
				self.buildList(result);
			});
		},
		buildList: function(result) {
			let output = Mustache.render(this.$gridTemplate.html(), {records: result.data || []});

			this.$grid.html(output);
			this.buildPaging(result.count || 0);
		},
		buildPaging: function(count) {
			let page = Math.ceil(count / this.pageSize),
				current = this.pageIndex;

			this.$paging.find('[data-field=current]').text(current);
			this.$paging.find('[data-field=records]').text(page);
			this.$paging.find('[data-field=total]').text(count);
			this.setDisableOperation(current, page, count);
		},
		setDisableOperation: function(current, page, count) {
			let pageSize = this.pageSize;

			this.$paging.find('.page').removeClass('disabled');

			if(count <= pageSize) {
				this.$paging.find('.page').addClass('disabled');
				return;
			}
			if(current == 1) {
				this.$paging.find('[data-action=first]').addClass('disabled');
				this.$paging.find('[data-action=prev]').addClass('disabled');
				return;
			}
			if(current == page) {
				this.$paging.find('[data-action=last]').addClass('disabled');
				this.$paging.find('[data-action=next]').addClass('disabled');
			}
		},
		gotoPage: function(action) {
			switch(action) {
				case 'first':
					this.pageIndex = 1;
					break;
				case 'prev':
					this.pageIndex--;
					break;
				case 'next':
					this.pageIndex++;
					break;
				case 'last':
					this.pageIndex = this.$paging.find('[data-field=records]').text();
					break;
				default:
					break;
			}

			this.getData();
		},
		clickedGirdItem: function(action, id) {
			let data = this.gridData.find((i) => i._id == id) || null;

			if(typeof this.onClickedGirdItem === 'function') {
				this.onClickedGirdItem.apply(this, [action, data])
			}
		}
	}

	module.exports = Grid;
});