module app.home {
	'use strict';
	
	/**
	 * Use Interfaces to show intent
	 */

	interface IHomeController {
		test(): void;
		aMethodOnHomeController(): void;
		aMethodOnHomeControllerPromise(): void;
	}

	class HomeController implements IHomeController {
		
		/**
		 * Example of Controller injecting a service
		 */
		
		public static $inject = ['SampleService'];

		constructor(private SampleService: services.sample.ISampleService) {

		};


		/**
		 * Simple method illustrating use of es6 template strings
		 */
		test(): void {

			let fname = "FirstName";
			let lname = "LastName";

			let fullName = `Hello my anme is ${fname} ${lname}`;
			alert(fullName);

		}

		aMethodOnHomeController() {
			alert(this.SampleService.testServiceMethod("Woot"));

		}

		aMethodOnHomeControllerPromise() {
			
			this.SampleService.testPromiseCall("Woot").then((res) => {
				this.test();
			}).catch(() => {
				alert('Rejection');
			})
		}

	}

	angular.module('home').controller('HomeController', HomeController);
}