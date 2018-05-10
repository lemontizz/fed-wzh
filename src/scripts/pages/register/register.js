require(['jquery', 'layer', 'domReady!'], function($, layer) {
	var register = {
		init: function() {
			this.bindEls();
			this.bindEvent();
			this.setRule();
		},
		bindEls: function() {
			this.$registerWrap = $('#register-body');
			this.$username = $('#username');
			this.$password = $('#password');
			this.$email = $('#email');
			this.$submit = $('#submit');
			this.$character = $('#character');
			this.$number = $('#number');
			this.$letter = $('#letter');
			this.$specialCharacter = $('#special-character');
		},
		bindEvent: function() {
			var self = this;

			this.$submit.click(function() {
				self.submitInfo();
			});

			this.$password.keyup(function() {
				self.setPasswordValCls($(this).val());
			});
		},
		setRule: function() {
			this.emailRule = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			this.passwordRule = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
			this.passwordLengthRule = /^[A-Za-z0-9!@#$%^&*? ]{6,}$/;
			this.passwordSpecialRule = /[!@#$%^&*? ]+/;
			this.passwordLetter = /[A-Za-z]+/;
			this.passwordNumber = /[0-9]+/;
		},
		setPasswordValCls: function(val) {
			console.log(val);
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

			rules.map(function(item) {
				if(item.rule.test(val)) {
					console.log('yeah')
					if(!item.$el.hasClass('active')) item.$el.addClass('active');
				} else {
					console.log('oops');
					if(item.$el.hasClass('active')) item.$el.removeClass('active')
				}
			});
		},
		toggleCls: function() {

		},
		validate: function() {
			var email = this.$email.val(),
				username = this.$username.val(),
				password = this.$password.val();

			console.log('validate')
			if(!email.length || !this.emailRule.test(email)) {
				console.log('sfewrewr')
				layer.tips('Please enter the correct email', '#email');
				return;
			}
			if(!username.length) {
				layer.tips('请输入', '吸附元素选择器，如#id');
			}
		},
		submitInfo: function() {
			if(!this.validate()) return;
		}
	};

	register.init();
})