define(function(require, exports, module) {
	let $ = require('jquery'),
		$wrap = $('#page-msg'),
		count = 0,
		timer = {};

	$wrap.on('click', '.close', function(e) {
		let count = $(this).data('count');
		$(this).parent().remove();
		delete timer[count];
	}).on('mouseenter', '.msg', function() {
		let count = $(this).data('count');
		clearTimeout(timer[count].handle);
	}).on('mouseleave', '.msg', function() {
		let count = $(this).data('count'),
			id = $(this).parent().attr('id');
		msg.setTimer(id, timer[count].time);
	});

	let msg = {
		addMsg: function(params) {
			count++;
			let id = 'page-msg-' + count,
				html = `
					<div data-count="${count}" class="msg ${params.type}" id="${id}">
						<p>${params.text || 'no msg'}</p>
						<a href="javascript:;" class="close" data-count="${count}">×</a>
					</div>
				`;

			$wrap.append(html);

			this.setTimer(id, params.time);
		},
		setTimer: function(id, time = 3000) {
			let handle = setTimeout(function() {
				$('#' + id).remove();
			}, time);

			timer[count] = {
				time: time,
				handle: handle
			};
		}
	}

	/*
	*param {params} Object
	*param {type} String - ok/error/warning/info
	*param {text} String
	*param {showClose} Boolean
	*param {time} Number
	*/

	module.exports = function(params) {
		msg.addMsg(params);
	}
});