require(['jquery', 'ajax', 'layer', 'msg', 'prompt', 'rule', 'domReady!'], function($, ajax, layer, msg, prompt, rule) {
	let accountInfo = {

		init: function() {
			this.bindEls();
			this.bindEvent();
		},
		bindEls: function() {
			this.$tbUsername = $('#textbox-username');
			this.$tbEmail = $('#textbox-email');
			this.$oldUsername = $('#old-username');
			this.$oldEmail = $('#old-email');
		},
		bindEvent: function() {
			let self = this;

			$('.edit-inline').on('click', '.fa-edit', function(e) {
				$(this).parent().addClass('active')
						.find('input').val($(this).parent().prev().find('p').text()).focus();
			});

			$('.password').on('click', '.fa-edit', function(e) {
				$(this).closest('.account-item').toggleClass('active');
			});

			$('[data-action=cancel]').on('click', function(e) {
				$(this).closest('.account-item').removeClass('active');
			});

			$('[data-action=save-username]').click(function() {
				self.saveUsername();
			});
			$('[data-action=save-email]').click(function() {
				self.saveEmail();
			})
		},
		validateUsername: function() {
			let username = this.$tbUsername.val();

			if(!username.length) {
				layer.tips('请输入用户名', '#textbox-username');
				return false;
			}
			if(username === this.$oldUsername.text()) {
				this.$tbUsername.parent().removeClass('active')
				return false;
			}
			return true;
		},
		saveUsername: function() {
			let self = this;

			if(!self.validateUsername()) return;

			ajax({
				url: '/account/update',
				method: 'POST',
				data: JSON.stringify({
					username: this.$tbUsername.val()
				})
			})
			.done(function(result) {
				self.$oldUsername.text(self.$tbUsername.val())
					.closest('.account-item').find('.edit-inline')
					.removeClass('active');
				window.location.reload();
			});
		},
		validateEmail: function() {
			let email = this.$tbEmail.val();

			if(!email.length) {
				layer.tips('请输入Email', '#textbox-email');
				return false;
			}
			if(email === this.$oldEmail.text()) {
				this.$tbEmail.parent().removeClass('active')
				return false;
			}
			if(!rule.emailRule.test(email)) {
				layer.tips('请输入合法的Email', '#textbox-email');
				return false;
			}
			return true;
		},
		saveEmail: function() {
			let self = this;

			if(!self.validateEmail()) return;

			ajax({
				url: '/account/update',
				method: 'POST',
				data: JSON.stringify({
					email: this.$tbEmail.val()
				})
			})
			.done(function(result) {
				self.$oldEmail.text(self.$tbEmail.val())
					.closest('.account-item').find('.edit-inline')
					.removeClass('active');
				window.location.reload();
			});
		},
		savePassword: function() {

		}

	};

	accountInfo.init();
});