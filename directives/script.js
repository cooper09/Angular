angular.module('animateApp', [])

.controller('AnimateCtrl', function($scope, $element ) {

   $scope.item = $element;

   console.log("item: " , $scope.item[0].childNodes[1].childNodes[5] );

    $scope.item[0].childNodes[1].childNodes[1].style.visibility = 'hidden';

    $scope.showNav = function () {
        $scope.item[0].childNodes[1].childNodes[1].style.visibility = 'visible';
        $scope.item[0].childNodes[1].childNodes[5].style.display = 'none';
    }

});//end controller..