var app = angular.module('Navbar',[]);


//Empieza controllador LoginCtrl
app.controller('loginCtrl',['$scope','$http','$filter','$uibModal','$rootScope','$location','$window', function($scope,$http,$filter,$uibModal,$rootScope,$location,$window){
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
				$rootScope.DUser = data;

				$http.get('Landing-count/'+$rootScope.DUser.id).success(function(data){
					$rootScope.DUser.landingcounter = data;
				});

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
			$window.location.reload();			
			$location.path('/index');



		});
	}

	$scope.$on('$routeChangeUpdate', that.CurrentUser);
    $scope.$on('$routeChangeSuccess', that.CurrentUser);



}]);
//Termina controlador LoginCtrl

//Empieza controlador Register
app.controller('registerCtrl', ['$scope','$http','$filter','$timeout','$uibModalInstance', function($scope, $http, $filter,$timeout,$uibModalInstance){
var that = $scope;
$scope.Reg = {fname:'', lname:'', uname:'', telephone:'', email:'', pw:'', rpw:'', switch:1}
$scope.alertmsg="";
$scope.alertmsg1="";
$scope.alertmsg2="";
$scope.alertmsg3="";

$scope.Register = function(){

	$http.post('register',$scope.Reg).success(function(data){
		if(data!= "Username in use"){
			that.Reg.switch = 2;
		$('#singlebutton').prop("disabled",true);

		$timeout(function(){
			$uibModalInstance.dismiss();
		},3000);

		}else{
			that.alertmsg="Username already in use, try another one.";
			$('#alert').show();

		}
		
		

	});

}

$scope.Validate = function(){

	if(!that.regForm.fname.$valid){
		that.alertmsg = "Names shouldn't use numbers, ";
		$('#alert').show();
	}else{ that.alertmsg = "";}

if(!that.regForm.lname.$valid){
		that.alertmsg = "Names shouldn't use numbers, ";
		$('#alert').show();
	}else{ that.alertmsg = "";}

	if(!that.regForm.phone.$valid){
		that.alertmsg1 = "Phone numbers shouldn't have letters, ";
	$('#alert').show();
}else{ that.alertmsg1 = "" }

	if(that.Reg.pw != that.Reg.rpw || that.Reg.rpw != that.Reg.pw){
		that.alertmsg2 = "Passwords don't match, ";
		$('#alert').show();
		$('#btns').prop('disabled',true);
	}else{ that.alertmsg2 = "";
		  $("#btns").prop('disabled',false);}

	if(that.regForm.fname.$valid && that.regForm.lname.$valid && that.regForm.phone.$valid){
		$('#alert').hide();
	}
	

}

$scope.CloseAlert = function(){

	$('#alert').hide();
}

}]);
//Termina controlador Register

//Empieza controlador Login
app.controller('logCtrl',['$scope','$http','$rootScope','$timeout','$uibModalInstance','$window', function($scope,$http,$rootScope,$timeout,$uibModalInstance,$window){
var that = $scope;
$scope.alertype = "Warning!";
$scope.alertmsg = "Invalid username or password, please try again."

$scope.Login = function(){
	$http.post('login',$scope.Log).success(function(data){ 
		if(data != "User doesn't exist / Invalid Pw"){
			$('#alert').removeClass();
			$('#alert').addClass('alert alert-success');
			$scope.alertype = "Success!";
			$scope.alertmsg = "You've successfully logged into your account, we'll redirect you in a moment."
			$('#alert').show();
			
			$timeout(function(){
				$uibModalInstance.dismiss();
				$window.location.reload();
			$rootScope.$broadcast('LoginSuccess');
			},3000)
		}else{
			$('#alert').removeClass();
			$('#alert').addClass('alert alert-danger');
			$scope.alertype = "Warning!";
			$scope.alertmsg = "Invalid username or password, please try again."
			$('#alert').show();
		}
	});
}

$scope.CloseAlert = function(){
	$('#alert').hide();
}

}]);
//Termina controlador Login