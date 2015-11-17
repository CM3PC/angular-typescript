module app.home {
	'use strict';

	
	angular.module('home').config(config);
	
	function config($stateProvider: angular.ui.IStateProvider)
	{ 
		/**
		 * Note the use of Controller As
		 */
		
		$stateProvider.state('home',{
			url:'/home',
			controller:'HomeController',
			controllerAs:'ctrl',
			templateUrl:'home/home.tpl.html'
		})
	}
	
}