import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './route/route';

require('jQuery');
require('lodash');
import '../css/style.css';
require('../../../lib/bootstrap/css/bootstrap.css');

Vue.use(VueRouter);
import mainNav from './component/main-nav.vue';

Vue.component('main-nav', Vue.extend(mainNav));
const router = new VueRouter({
	routes
});

new Vue({
	router,
	mounted: function () {
		$(window).bind('mousewheel', function (event) {
			var $nav       = $('nav');
			if(!$nav[0]){
				return;
			}
			var	navpadding = parseInt($nav.css('padding').split(' ')[0]);
			var	navHeight  = navpadding * 2 + $nav.height();
			if (event.originalEvent.wheelDelta >= 0) {
				$nav.animate({
					top: '0'
				}, 100);
			}
			else {
				$nav.animate({
					top: '-' + navHeight + 'px'
				}, 100);
			}
		});
	}
}).$mount('#app');