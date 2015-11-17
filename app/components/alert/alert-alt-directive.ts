module app.components {

	interface IAlertScope extends angular.IScope {
		name:string;
	 }

	class AlertAltComponent implements angular.IDirective {
		constructor(private SampleService: services.sample.ISampleService) { }
		
		link = (scope: IAlertScope, element: angular.IAugmentedJQuery, attributes: angular.IAttributes) => {
			
			console.log(scope);
			element.on('click', () => {

				alert('ALERT ALT DIRECTIVE CLICK');

				this.SampleService.testPromiseCall().then((res) => {
					console.log('SAMPLE SERVICE CALLED IN DIRECTIVE');

				});

			})
		}
		
		static Factory(): angular.IDirectiveFactory {
			const directive = (SampleService:services.sample.ISampleService) => new AlertAltComponent(SampleService);
			directive.$inject = ['SampleService'];
			return directive;
		}
	}

	angular
		.module('app.components')
		.directive('alertAltComponent', AlertAltComponent.Factory());
}