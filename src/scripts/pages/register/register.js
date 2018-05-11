require(['jquery', 'layer', 'ajax', 'prompt', 'domReady!'], function($, layer, ajax, prompt) {
	let register = {
		init: function() {
			this.bindEls();
			this.bindEvent();
			this.setRule();
		},
		bindEls: function() {
			this.$registerWrap = $('#register-body');
			this.$username = $('#username');
			this.$password = $('#password');
			this.$confirmPassword = $('#confirm-password');
			this.$email = $('#email');
			this.$submit = $('#submit');
			this.$character = $('#character');
			this.$number = $('#number');
			this.$letter = $('#letter');
			this.$specialCharacter = $('#special-character');
			this.$passwordEqual = $('#passwordEqual');
		},
		bindEvent: function() {
			let self = this;

			this.$submit.click(function() {
				self.submitInfo();
			});

			this.$password.keyup(function() {
				self.valiPasswordRule($(this).val());
			});

			this.$confirmPassword.keyup(function() {
				self.valiConfrimPasswordRule($(this).val())
			})
		},
		setRule: function() {
			this.emailRule = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			this.passwordRule = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
			this.passwordLengthRule = /^[A-Za-z0-9!@#$%^&*? ]{6,}$/;
			this.passwordSpecialRule = /[!@#$%^&*? ]+/;
			this.passwordLetter = /[A-Za-z]+/;
			this.passwordNumber = /[0-9]+/;
		},
		valiPasswordRule: function(val) {
			let rules = [{
				rule: this.passwordLengthRule,
				$el: this.$character
			}, {
				rule: this.passwordSpecialRule,
				$el: this.$specialCharacter
			}, {
				rule: this.passwordLetter,
				$el: this.$letter
			}, {
				rule: this.passwordNumber,
				$el: this.$number
			}];

			return this.toggleCls(rules, val)
		},
		valiConfrimPasswordRule: function(val) {
			let rules = [{
					rule: new RegExp(this.$password.val()),
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

			return rules.length === valiSuccessNum;
		},
		validate: function() {
			let email = this.$email.val(),
				username = this.$username.val(),
				password = this.$password.val(),
				confirmPassword = this.$confirmPassword.val();

			if(!email.length || !this.emailRule.test(email)) {
				layer.tips('Please enter the correct email', '#email');
				this.$email.focus();
				return false;
			}
			if(!username.length) {
				layer.tips('Please enter the username', '#username');
				this.$username.focus();
				return false;
			}
			if(!password.length) {
				layer.tips('Please enter the password', '#password');
				this.$password.focus();
				return false;
			}
			if(!this.valiPasswordRule(password)) {
				layer.tips('Password must consist of 6 or more special characters, numbers, letters', '#password');
				this.$password.focus();
				return false;
			}
			if(!confirmPassword.length) {
				layer.tips('Please enter the confirm password', '#confirm-password');
				this.$confirmPassword.focus();
				return false;
			}
			if(!this.valiConfrimPasswordRule(confirmPassword)) {
				layer.tips('The password and confirmation password must be the same', '#confirm-password');
				this.$confirmPassword.focus();
				return false;
			}
			return true;
		},
		submitInfo: function() {
			if(this.$submit.hasClass('disabled')) return;
			if(!this.validate()) return;

			this.$submit.addClass('disabled');

			ajax({
				url: '/register',
				method: 'POST'
			})
			.done(function() {
				console.log('werwrwer')
			})

		}
	};

	register.init();
})