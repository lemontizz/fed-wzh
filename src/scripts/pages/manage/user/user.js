require(['jquery', 'ajax', 'grid', 'domReady!'], function($, ajax, Grid) {

	let user = {

		init: function() {
			this.initGrid();
		},
		initGrid: function() {
			this.Grid = new Grid({
				url: '/user-list'
			});
			this.Grid.init();
		}
	};

	user.init();

});