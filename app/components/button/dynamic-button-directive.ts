module app.components {

	export interface IDynamicButton {
		clickFunc(): void;
	}


	class DynamicButtonController implements IDynamicButton {
		
		public static $inject = ['$scope'];		
		constructor(private $scope:IButtonScope) {
		}

		clickFunc() {
			alert('CLICKED : ' + this.$scope.title);
		}

	}

	export interface IButtonScope extends angular.IScope { 
		title:string;
	}

	function dynamicButton(): angular.IDirective {
		return {
			restrict: 'E',
			scope: {
				title: '@'
			},
			replace: false,
			controller: DynamicButtonController,
			controllerAs: 'ctrl',
			templateUrl:'components/button/dynamic-button.tpl.html',
			link: (scope: IButtonScope, element: angular.IAugmentedJQuery, attributes: angular.IAttributes) => {
				console.log(scope.title);
			}
		}
	}

	angular
		.module('app.components')
		.directive('dynamicButton', dynamicButton);
}