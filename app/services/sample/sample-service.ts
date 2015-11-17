module services.sample {

	export interface ISampleService {
		testServiceMethod(value: string): string;
		testPromiseCall(value?: string): angular.IPromise<any>;
	}

	class SampleService implements ISampleService {

		public static $inject = ['$http', '$q', '$timeout'];
		
		/**
		 * Declaring private will automagically attach reference
		 */
		constructor(private $http: angular.IHttpService,
			private $q: angular.IQService,
			private $timeout: angular.ITimeoutService) {

		}

		testServiceMethod(value: string) {
			return "Called service method with: " + value;
		}

		
		/**
		 * Values can be optional by appending ?
		 */
		testPromiseCall(value?: string): angular.IPromise<any> {
			var defer = this.$q.defer();

			this.$timeout(() => {
				defer.resolve({ data: "Called Promise: " + value });
			}, 2000);

			return defer.promise;
		}


	}

	angular
		.module('services')
		.service('SampleService', SampleService);
}