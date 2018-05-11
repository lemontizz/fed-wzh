define(function(require, exports, module) {
	var $ = require('jquery'),
		loading = require('loading');

	module.exports = function({
			url = '',
			method = 'get',
			contentType = 'application/json',
			headers = {},
			alertErrorInfo = true,
			showLoading = true
		}) {

		let finalHeaders = Object.assign({}, headers),
			$loading = $('#page-loading');

		return $.ajax({
			url,
			method,
			contentType,
			headers: finalHeaders,
			beforeSend: function() {
				console.log(loading);
				if(showLoading) loading.show();
			},
			complete: function() {
				if(showLoading) loading.hide();
			},
			error: function() {
				if(alertErrorInfo) {

				}
			}
		})
	}
});