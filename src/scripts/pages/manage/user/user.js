require(['jquery', 'ajax', 'grid', 'prompt', 'msg', 'domReady!'], function($, ajax, Grid, prompt, msg) {

	let user = {

		init: function() {
			this.initGrid();
		},
		initGrid: function() {
			let self = this;

			this.Grid = new Grid({
				url: '/user-list',
				searchFields: 'username,email',
				onClickedGirdItem: function(action, data) {
					if(action === 'del') {
						self.confirmDel(data);
					}
				}
			});
			this.Grid.init();
		},
		confirmDel: function(data) {
			let self = this;

			prompt({
				message: '是否确认删除' + data.username + '?',
				callbacks: {
					confirmAfter: function() {
						console.log('skfjksdjfksjdfkjdsk')
						self.del(data)
					}
				}
			})
		},
		del: function(data) {
			let self = this;

			ajax({
				url: '/user/' + data._id,
				method: 'delete',
			})
			.done(function() {
				msg({
					type: 'ok',
					text: '用户' + data.username +'删除成功'
				});
				self.Grid.getData();
			})
		}
	};

	user.init();

});