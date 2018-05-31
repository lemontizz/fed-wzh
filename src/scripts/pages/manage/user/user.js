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
				onRenderBefore: function(root) {
					root.data.map(function(i) {
						i.statusName = i.status == '0' ? '已禁用' : '已启用';
						i.roleName = i.role == 'user' ? '用户' : '管理员';
					});
				},
				onClickedGirdItem: function(action, data) {
					if(action === 'del') {
						self.confirmDel(data);
						return;
					}
					if(action === 'disable') {
						self.disableUser(data);
						return;
					}
					if(action === 'enable') {
						self.enableUser(data);
						return;
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
		},
		disableUser: function(data) {
			let self = this;

			ajax({
				url: '/user/disable/' + data._id,
				method: 'put',
			})
			.done(function() {
				msg({
					type: 'ok',
					text: '用户' + data.username +'禁用成功'
				});
				self.Grid.getData();
			})
		},
		enableUser: function(data) {
			let self = this;

			ajax({
				url: '/user/enable/' + data._id,
				method: 'put',
			})
			.done(function() {
				msg({
					type: 'ok',
					text: '用户' + data.username +'启用成功'
				});
				self.Grid.getData();
			})
		},
	};

	user.init();

});