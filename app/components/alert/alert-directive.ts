module app.components {
	
	//Extend Scope if needed
	interface IAlertScope extends angular.IScope { }

	componentAlert.$inject = ['SampleService'];
	function componentAlert(SampleService: services.sample.ISampleService): angular.IDirective {
		return {
			restrict: 'EA',
			scope: {
				title:'='
			},
			replace: false,
			controller: function() {
				var vm = this;
			},
			link: (scope: IAlertScope, element: angular.IAugmentedJQuery, attributes: angular.IAttributes) => {

				element.on('click', () => {
					
					alert('ALERT DIRECTIVE CLICK');
					
					SampleService.testPromiseCall().then((res) => {
						console.log('SAMPLE SERVICE CALLED IN DIRECTIVE');

					});

				});
			}
		}
	}

	angular
		.module('app.components')
		.directive('componentAlert', componentAlert);
}