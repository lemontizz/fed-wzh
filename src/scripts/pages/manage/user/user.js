require(['jquery', 'ajax', 'mustache', 'domReady!'], function($, ajax, Mustache) {

	let user = {

		init: function() {
			this.setInfo();
			this.bindEls();
			this.bindEvent();
			this.getData();
		},
		setInfo: function() {
			this.pageIndex = 1;
			this.pageSize = 10;
		},
		bindEls: function() {
			this.$userListTemplate = $('#user-list-template');
			this.$userListWrap = $('#user-list-wrap');
		},
		bindEvent: function() {

		},
		getData: function() {
			let self = this;

			ajax({
				url: '/user-list',
				method: 'GET',
				data: {
					pageSize: this.pageSize,
					pageIndex: this.pageIndex
				}
			})
			.done(function(result) {
				self.buildList(result);
			});
		},
		buildList: function(result) {
			let output = Mustache.render(this.$userListTemplate.html(), {records: result.data});

			this.$userListWrap.html(output);
		}

	};

	user.init();

});