define(function(require, exports, module) {
	let $ = require('jquery'),
		$wrap = $('#page-prompt-wrap');

	$wrap.on('click', '[data-action]', function(e) {
		let action = $(this).data('action');

		if(action === 'close') {
			prompt.closeBefore();
			prompt.hide();
			prompt.closeAfter();
		} else {
			prompt.confirmBefore();
			prompt.hide();
			prompt.confirmAfter();
		}
	});

	let callbacks = null;		

	let prompt = {
		show: function(params) {
			$wrap.find('[data-field=title]').text(params.title);
			$wrap.find('[data-field=content]').text(params.message);

			callbacks = params.callbacks;
			$wrap.show();
		},
		hide: function() {
			$wrap.hide();
		},
		closeBefore: function() {
			if(callbacks && callbacks.closeBefore && typeof callbacks.closeBefore === 'function') {
				callbacks.closeBefore();
			}
		},
		closeAfter: function() {
			if(callbacks && callbacks.closeAfter && typeof callbacks.closeAfter === 'function') {
				callbacks.closeAfter();
			}
		},
		confirmBefore: function() {
			if(callbacks && callbacks.confirmBefore && typeof callbacks.confirmBefore === 'function') {
				callbacks.confirmBefore();
			}
		},
		confirmAfter: function() {
			if(callbacks && callbacks.confirmAfter && typeof callbacks.confirmAfter === 'function') {
				callbacks.confirmAfter();
			}
		}
	}

	/*
	*param {title} String - prompt title info
	*param {message} String - prompt content
	*param {callbacks} Object - closeBefore/closeAfter/confirmBefore/confirmAfter
	*/

	module.exports = function(params) {
		prompt.show(params)
	}
});