require(['jquery', 'domReady!'], function($) {
	var register = {
		init: function() {
			this.bindEls();
			this.bindEvent();
		},
		bindEls: function() {
			this.$registerWrap = $('#register-body');
		},
		bindEvent: function() {
			var self = this;

		},
	};

	register.init();
})