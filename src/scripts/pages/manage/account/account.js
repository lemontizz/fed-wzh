require(['jquery', 'ajax', 'prompt', 'domReady!'], function($, ajax, prompt) {
	let accountInfo = {

		init: function() {
			this.bindEls();
			this.bindEvent();
		},
		bindEls: function() {

		},
		bindEvent: function() {
			$('.edit-inline').on('click', '.fa-edit', function(e) {
				$(this).parent().addClass('active')
							.find('input').focus();
			}).on('blur', 'input', function(e) {
				$(this).parent().removeClass('active');
			});

			$('.password').on('click', '.fa-edit', function(e) {
				$(this).closest('.account-item').toggleClass('active');
			});

			$('[data-action=cancel]').on('click', function(e) {
				$(this).closest('.account-item').removeClass('active');
			})
		}

	};

	accountInfo.init();
});