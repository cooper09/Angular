var testApp = angular.module('testApp', [
  'ngRoute',
  'testController', 
  'dataController'
]);

var testController = angular.module('testController', []);
var dataController = angular.module('dataController', []);

//set up routing only

testApp.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.
		when('/item', {
			templateUrl: 'partials/campaign-list.html',
			controller: 'CampaignListController'
		}).
		
		when('/item/:itemId', {
			templateUrl: 'partials/campaign-details.html',
			controller: 'CampaignDetailsController'
		}).

		when('/new', {
			templateUrl: 'partials/city-create.html',
			controller: 'CityCreateController'
		}).

		otherwise({
			redirectTo: '/'
		});
	}]);

testApp.controller('testController', ['$scope', '$rootScope', '$filter', 'testFactory', function($scope, $rootScope, $filter, testFactory ) {

	$scope.init = function() {
		console.log("Test Controller in Control!!!");
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

}]);//end test controller 
 

testApp.controller('dataController', ['$scope','$http', function($scope, $http ) {
    console.log("lets get some data:  ");

    $scope.items = Array();

    	$http.get('http://localhost:3000/').success(function(data) {
			console.log("getData data:  ",data);
			$scope.items = data;
			console.log("an item: " + $scope.items );
			$scope.itemid = data[0]._id;
			$scope.item = data[0].item;
		});

     }]);//end date controller 
