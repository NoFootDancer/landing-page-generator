var app = angular.module('login',[]);

app.config(['$routeProvider',function($routeProvider){
$routeProvider.when('/index',{
	templateUrl:'app/components/Login/login.html',
	controller:'loginCtrl',
	css:'css/landing.css'
})
}]);


app.controller('loginCtrl',['$scope','$http','$filter','$uibModal', function($scope,$http,$filter,$uibModal){
	//Funciones que solo sirven para trasladarse de un DIV a otro
	$scope.scrollAbout = function(){
		$(function(){
			$('.intro-header')[0].scrollIntoView(true);
		});
	}

	$scope.scrollServices = function(){
		$(function(){
		    $('.content-section-a')[0].scrollIntoView(true);
		});
	}

	$scope.scrollContact = function(){
		$(function(){
			$('.content-section-b')[0].scrollIntoView(true);
		});
	}

	//Abrir modal de registro
	$scope.showModal = function(){
		var modalInstance = $uibModal.open({
			templateUrl:'app/components/Login/register.modal.html',	
			controller:'loginCtrl',
			size:'md'

		});


	}


}]);