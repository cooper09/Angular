var testApp = angular.module('testApp', [
  'ngRoute',
  'testController',
  'dateController'
]);

var testController = angular.module('testController', []);
var dateController = angular.module('dateController', []);

testApp.controller('testController', ['$scope', '$rootScope', '$filter', 'testFactory', function($scope, $rootScope, $filter, testFactory ) {


	$scope.init = function() {
		console.log("Test Controller in Control!!!");
		$scope.datevalue = new Date(2014, 9, 22);

	//	console.log("currentDate: " + currentDate );
	}

	$scope.clickMe = function() {
		console.log("I've been clicked...");
	}
// test out broadcasting - see how this works...

	$scope.startScanner = function() {
		console.log("start broadcast...");
		var test = "test me!";
		$rootScope.$broadcast('scanner-started', { any: test });
	}

	$scope.$on('scanner-started', function(event, args) {
		 var anyThing = args.any;
		// do what you want to do
		console.log("broadcast caught: " + args.any );

	});

	$scope.CreateDictionary = function () {
		var days = new Array();
		days['Sunday'] = 1;
		days['Monday'] = 2;
		days['Tuesday'] = 3;
		days['Wednesday'] = 4;
		days['Thursday'] = 5;
		days['Friday'] = 6;
		days['Saturday'] = 7;
		
		return days;
	}//end CreateDictionary



	
/*	 $scope.changeDate = function(newdate) {
	 //	console.log("change date: " + Date(newdate) );

	 }  */

}]);//end test controller 

testApp.controller('dateController', ['$scope', function($scope) {
       $scope.value = new Date(2014, 9, 22);
       console.log("set default date: " + $scope.datevalue );

        $scope.$watch('defaultvalue', function () { 
        	$scope.value = new Date(2014, 9, 22);
        	console.log('Date string change: '+ $scope.datevalue );

    	});  

     }]);//end date controller 
