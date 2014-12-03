'use strict';

var adminApp = angular.module('adminApp', []);

adminApp.controller('mainController', ['$scope', '$rootScope', '$sce', function( $scope, $rootScope, $sce ) 
{
	
	$scope.isAuthenticated = false;
	$scope.isListView = false;
	$scope.isDetailsView = false;
	$scope.login_username = "";
	$scope.login_password = "";
	$scope.sectionName = "";
	$scope.listData = [];
	
	$scope.onCampaignsClick = function()
	{
		$scope.sectionName = "campaigns";
		$scope.isListView = true;
		$scope.isDetailsView = false;
		$scope.listItemClass = "campaignitem";
		$scope.listItemType = "campaign";
		$scope.listData = ["campaign 1","campaign 2","campaign 3","campaign 4"];
	}
	$scope.onMSPsClick = function()
	{
		$scope.sectionName = "msps";
		$scope.isListView = true;
		$scope.isDetailsView = false;
		$scope.listItemClass = "mspitem";
		$scope.listItemType = "msp";
		$scope.listData = ["msp 1","msp 2","msp 3","msp 4"];
	}
	$scope.onCitiesClick = function()
	{
		$scope.sectionName = "cities";
		$scope.isListView = true;
		$scope.isDetailsView = false;
		$scope.listItemClass = "cityitem";
		$scope.listItemType = "city";
		$scope.listData = ["city 1","city 2","city 3","city 4"];
	}
	$scope.onImagesClick = function()
	{
		$scope.sectionName = "images";
		$scope.isListView = true;
		$scope.isDetailsView = false;
		$scope.listItemClass = "imageitem";
		$scope.listItemType = "image";
		$scope.listData = ["image 1","image 2","image 3","image 4"];
	}
	$scope.onAdsClick = function()
	{
		$scope.sectionName = "ads";
		$scope.isListView = true;
		$scope.isDetailsView = false;
		$scope.listItemClass = "aditem";
		$scope.listItemType = "ad";
		$scope.listData = ["ad 1","ad 2","ad 3","ad 4"];
		
	}
	
	$scope.onLegalsClick = function()
	{
		$scope.sectionName = "legals";
		$scope.isListView = true;
		$scope.isDetailsView = false;
		$scope.listItemClass = "legalitem";
		$scope.listItemType = "legal";
		$scope.listData = ["legal 1","legal 2","legal 3","legal 4"];
	}
	
	$scope.onLogin = function()
	{
		$scope.isAuthenticated = true;
	/*	if($scope.login_password === "admin" && $scope.login_username === "admin")
		{
		    $scope.isAuthenticated = true;
			console.log("login success");
		}else{
			console.log("login failure");
		} */
	}
	
	$scope.renderListItemHtml = function(item_class, item)
	{
		if(item_class == "campaign" )
		{
			return $sce.trustAsHtml("<div>Campaign:"+item+"</div>");
		}else if(item_class == "msp" )
		{
			return $sce.trustAsHtml("<div>MSP:"+item+"</div>");
		}else if(item_class == "city" )
		{
			return $sce.trustAsHtml("<div>"+item+"</div>");
		}else if(item_class == "image" )
		{
			return $sce.trustAsHtml("<div>"+item+"</div>");
		}else if(item_class == "legal" )
		{
			return $sce.trustAsHtml("<div>"+item+"</div>");
		}else if(item_class == "ad" )
		{
			return $sce.trustAsHtml("<div>"+item+"</div>");
		}
	}
	
	$scope.renderFormHtml = function(form_class, item)
	{
		console.log("form class: " + form_class+" item: " + item );
		if(form_class == "campaign" )
		{
			return $sce.trustAsHtml("<div>Campaign: "+item+"</div>");
		}else if(form_class == "msp" )
		{
			return $sce.trustAsHtml("<div>MSP: "+item+"</div>");
		}else if(form_class == "city" )
		{
			return $sce.trustAsHtml("<div>"+item+"</div>");
		}else if(form_class == "image" )
		{
			return $sce.trustAsHtml("<div>"+item+"</div>");
		}else if(form_class == "legal" )
		{
			return $sce.trustAsHtml("<div>"+item+"</div>");
		}else if(form_class == "ad" )
		{
			return $sce.trustAsHtml("<div>"+item+"</div>");
		}
	}

	$scope.showDetail = function (item ) {
		alert("Show the details...");
		$scope.isDetailsView = true;
	}

}]);
