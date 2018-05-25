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
			this.$character = $('#character');
			this.$number = $('#number');
			this.$letter = $('#letter');
			this.$specialCharacter = $('#special-character');
			this.$newPassword = $('#new-password');
			this.$confirmPassword = $('#confirm-password');
			this.$passwordEqual = $('#password-equal');
			this.$oldPassword = $('#old-password');
			this.$newPassword = $('#new-password');
			this.$confirmPassword = $('#confirm-password');
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
			});

			$('[data-action=save-password]').click(function(){
				self.savePassword();
			});

			this.$oldPassword.keyup(function(e) {
				if(e.keyCode === 13) self.savePassword();
			});

			this.$newPassword.keyup(function(e) {
				if(e.keyCode === 13) {
					self.savePassword();
				} else {
					self.valiPasswordRule($(this).val());	
				}
			});

			this.$confirmPassword.keyup(function(e) {
				if(e.keyCode === 13) {
					self.savePassword();
				} else {
					self.valiConfrimPasswordRule($(this).val())
				}
			});

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
		valiPasswordRule: function(val) {
			let rules = [{
				rule: rule.passwordLengthRule,
				$el: this.$character
			}, {
				rule: rule.passwordSpecialRule,
				$el: this.$specialCharacter
			}, {
				rule: rule.passwordLetter,
				$el: this.$letter
			}, {
				rule: rule.passwordNumber,
				$el: this.$number
			}];

			return this.toggleCls(rules, val);
		},
		valiConfrimPasswordRule: function(val) {
			let rules = [{
					rule: new RegExp(this.$newPassword.val()),
					$el: this.$passwordEqual
				}];

			return this.toggleCls(rules, val)
		},
		toggleCls: function(rules, val) {
			let valiSuccessNum = 0;

			rules.map(function(item) {
				if(item.rule.test(val)) {
					valiSuccessNum++;
					if(!item.$el.hasClass('active')) {
						item.$el.addClass('active');
					}
				} else {
					if(item.$el.hasClass('active')) item.$el.removeClass('active')
				}
			});

			let isSuccessVali = rules.length === valiSuccessNum,
				$check = rules[0].$el.closest('.textbox').find('.check-item');

			if(isSuccessVali) {
				if(!$check.hasClass('active')) $check.addClass('active');
			} else {
				$check.removeClass('active');
			}

			return isSuccessVali;
		},
		validate: function() {
			if(!this.$oldPassword.val().length) {
				layer.tips('请输入旧密码', '#old-password');
				this.$oldPassword.focus();
				return false;
			}
			if(!this.$newPassword.val().length) {
				layer.tips('请输入新密码', '#new-password');
				this.$newPassword.focus();
				return false;
			}
			if(!this.valiPasswordRule(this.$newPassword.val())) {
				layer.tips('新密码必须包含字母，数字，特殊字符且6位以上', '#new-password');
				this.$newPassword.focus();
				return false;
			}
			if(!this.$confirmPassword.val().length) {
				layer.tips('请输入确认密码', '#confirm-password');
				this.$confirmPassword.focus();
				return false;
			}
			if(!this.valiConfrimPasswordRule(this.$confirmPassword.val())) {
				layer.tips('确认密码必须与新密码一致', '#confirm-password');
				this.$confirmPassword.focus();
				return false;
			}

			return true
		},
		savePassword: function() {
			let self = this;

			if(!this.validate()) return;

			ajax({
				url: '/account/change-password',
				method: 'POST',
				data: JSON.stringify({
					oldPassword: this.$oldPassword.val(),
					newPassword: this.$newPassword.val()
				})
			})
			.done(function() {
				msg({
					type: 'ok',
					text: '密码修改成功'
				});
				self.$newPassword.closest('.account-item').removeClass('active')
					.find('.active').removeClass('active');
				self.$oldPassword.val('');
				self.$newPassword.val('');
				self.$confirmPassword.val('');
			})
			.fail(function() {
				msg({
					type: 'error',
					text: '密码修改失败'
				});
			})
		}

	};

	accountInfo.init();
});