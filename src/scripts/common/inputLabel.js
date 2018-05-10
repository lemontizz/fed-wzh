require(['jquery', 'domReady!'], function($) {

	$('.form-item').on('focus', 'input', function(e) {
		toggleFocusCls(e);
	}).on('blur', 'input', function(e) {
		toggleBlurCls(e);
	});

	function toggleFocusCls(e) {
		let $target = $(e.target);

		if($target.val().length) return;

		$target.closest('.form-item').find('label').addClass('top');
	}

	function toggleBlurCls(e) {
		let $target = $(e.target);

		if($target.val().length) return;

		$target.closest('.form-item').find('label').removeClass('top');
	}
})