var app = angular.module('login',[]);

app.config(['$routeProvider',function($routeProvider){
$routeProvider.when('/',{
	templateUrl:'app/components/Login/login.html',
	controller:'loginCtrl',
	css:'css/landing.css'
})

$routeProvider.when('/index',{
	templateUrl:'app/components/Login/login.html',
	controller:'loginCtrl',
	css:'css/landing.css'
})
}]);

