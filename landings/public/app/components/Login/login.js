var app = angular.module('login',[]);

app.config(['$routeProvider',function($routeProvider){
$routeProvider.when('/index',{
	templateUrl:'app/components/Login/login.html',
	controller:'loginCtrl',
	css:'css/landing.css'
})
}]);

//Empieza controllador LoginCtrl
app.controller('loginCtrl',['$scope','$http','$filter','$uibModal','$rootScope', function($scope,$http,$filter,$uibModal,$rootScope){
	var that = $scope;

	$scope.User = {'switch':1, current:{}};

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
	$scope.ModalRegister = function(){
		var modalInstance = $uibModal.open({
			templateUrl:'app/components/Login/register.modal.html',	
			controller:'registerCtrl',
			size:'lg'

		});


	}

	$scope.ModalLogin = function(){
		var modalInstance = $uibModal.open({
			templateUrl:'app/components/Login/login.modal.html',
			controller:'logCtrl',
			size:'md'
		});
	}

	$scope.CurrentUser = function(){
		$http.get('current').success(function(data){
			
			if(data != "Not logged in"){
				that.User.switch = 2;
				that.User.current = data;
			}

		});

	}

	$rootScope.$on('LoginSuccess',function(){
		that.CurrentUser();
	});

	$scope.Logout = function(){
		$http.get('logout').success(function(data){
			that.User.switch = 0;
			that.User.current = {}


		});
	}

	$scope.$on('$routeChangeUpdate', that.CurrentUser);
    $scope.$on('$routeChangeSuccess', that.CurrentUser);



}]);
//Termina controlador LoginCtrl

//Empieza controlador Register
app.controller('registerCtrl', ['$scope','$http','$filter','$timeout','$uibModalInstance', function($scope, $http, $filter,$timeout,$uibModalInstance){
var that = $scope
$scope.Reg = {fname:'', lname:'', uname:'', telephone:'', email:'', pw:'', rpw:'', switch:1}

$scope.Register = function(){

	$http.post('register',$scope.Reg).success(function(data){
		that.Reg.switch = 2;
		$('#singlebutton').prop("disabled",true);

		$timeout(function(){
			$uibModalInstance.dismiss();
		},3000);
		

	});

}

}]);
//Termina controlador Register

//Empieza controlador Login
app.controller('logCtrl',['$scope','$http','$rootScope','$timeout','$uibModalInstance', function($scope,$http,$rootScope,$timeout,$uibModalInstance){

$scope.Login = function(){

	$http.post('login',$scope.Log).success(function(data){ 
		if(data != "User doesn't exist / Invalid Pw"){
			$rootScope.$broadcast('LoginSuccess');

			$timeout(function(){
				$uibModalInstance.dismiss();
			})
		}
	});
}

}]);
//Termina controlador Login