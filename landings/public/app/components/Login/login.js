var app = angular.module('login',[]);

app.config(['$routeProvider',function($routeProvider){
$routeProvider.when('/index/',{
	templateUrl:'app/components/Login/login.html',
	controller:'loginCtrl'
})
}]);


app.controller('loginCtrl',['$scope','$http','$filter', function($scope,$http,$filter){

}]);