require(['jquery', 'layer', 'ajax', 'prompt', 'domReady!'], function ($, layer, ajax, prompt) {
	let login = {
		init: function() {
			this.bindEls();
			this.bindEvents();
		},
		bindEls: function() {
			this.$loginWrap = $('#login-body')
			this.$username = $('#username');
			this.$password = $('#password');
			this.$submit = $('#submit');
		},
		bindEvents: function() {
			let self = this;

			this.$submit.click(function() {
				self.submitInfo();
			});

			this.$loginWrap.on('keyup', 'input', function(e) {
				if(e.keyCode === 13) self.submitInfo();
			});
		},
		validate: function () {
			let username = this.$username.val(),
				password = this.$password.val();

			if(!username.length) {
				layer.tips('Please enter the Username', '#username');
				return false;
			}
			if(!password.length) {
				layer.tips('Please enter the Username', '#password');
				return false;
			}
			return true;
		},
		submitInfo: function() {
			let self = this;

			if(this.$submit.hasClass('disabled')) return;
			if(!this.validate()) return;

			this.$submit.addClass('disabled');

			ajax({
				url: 'login',
				method: 'post',
				data: JSON.stringify({
					username: this.$username.val(),
					password: escape(this.$password.val())
				})
			})
			.done(function() {
				window.location.href = '/home';
			})
			.always(function() {
				self.$submit.removeClass('disabled');
			})
		}
	};

	login.init();
});