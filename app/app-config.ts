module app {
	'use strict';

	angular
		.module('tsang')
		.config(config);

	config.$inject = [];

	function config() {
	}

	angular.module('tsang').run(() => {});
}