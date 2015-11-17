module app
{
	'use strict';
	
	angular
		.module('tsang')
		.config(config);
		
	function config($urlRouterProvider:angular.ui.IUrlRouterProvider)
	{
		$urlRouterProvider.otherwise('/home');
	}
}