var app = angular.module('make_landing', []);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/Landing-make',{
		templateUrl:'app/components/Create_Landing/landingCreate.html',
		controller:'landingCtrl',
		css:'css/landing.css'

	});
}]);

app.controller('landingCtrl',['$scope','$http',function($scope,$http){

}])