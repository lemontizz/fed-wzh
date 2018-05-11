define(function(require, exports, module) {
	let $ = require('jquery'),
		$el = $('#page-loading'),
		loading = {
			show: function() {
				$el.show();
			},
			hide: function() {
				$el.hide();
			}
		};

	module.exports = loading;
})