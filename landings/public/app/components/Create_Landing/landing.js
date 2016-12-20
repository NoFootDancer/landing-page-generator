var app = angular.module('make_landing', []);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/Landing-make',{
		templateUrl:'app/components/Create_Landing/landingCreate.html',
		controller:'landingCtrl',
		css:'css/business-casual.css'

	});

	$routeProvider.when('/landing/:nombre_landing',{
		templateUrl:'app/components/Create_Landing/landingPage.html',
		controller:'landCtrl',
		css:'css/landing.css'
	});

	$routeProvider.when('/edit/:nombre_landing',{
		templateUrl:'app/components/Create_Landing/landingEdit.html',
		controller:'landEditCtrl',
		css:'css/business-casual.css'

	});

	$routeProvider.when('/Landing-lists',{
		templateUrl:'app/components/Create_Landing/landingList.html',
		controller:'ListCtrl',
		css:'css/business-casual.css'	
	});

}]);

//Crear landing
app.controller('landingCtrl',['$scope','$http','$location', '$timeout',function($scope,$http,$location,$timeout){
var that = $scope;
$scope.Landing = {'userid':0};
$scope.alertype = "Warning!";
$scope.alertmsg = "That landing page is already in use, choose another one."

$scope.CloseAlert = function(){

	$("#alert").hide();
}

$scope.Init = function(){
$http.get('current').success(function(data){
	that.Landing.username = data.username;
	that.Landing.userid = data.id;

	});
}
$scope.Init();

$scope.Submit = function(){

	$http.post('make-landing',that.Landing).success(function(data){
		console.log(data);
		if(data != "Landing in use"){
			$scope.alertype = "Success!";
			$scope.alertmsg = "You'll be redirected to your new landing page."
			$("#alert").removeClass();
			$("#alert").addClass("alert alert-success");
			$('#alert').show();

			$timeout(function(){
				$location.path('/landing/'+that.Landing.name);	
			},5000)

		}else{
			$scope.alertype = "Warning!";
			$scope.alertmsg = "That landing page is already in use, choose another one."
			$("#alert").removeClass();
			$("#alert").addClass("alert alert-danger");
			$('#alert').show();

		}
		
	});

}

}]);

//Visualizar Landing
app.controller('landCtrl',['$scope','$http','$routeParams','$location','$window', function($scope,$http,$routeParams,$location,$window){
var that = $scope;
$scope.Landing = {'switch':1,Details:{}};
$scope.Contact = {};




if($routeParams){

	$http.get('Landing-Page/'+$routeParams.nombre_landing).success(function(data){
		
		if(data != "This landing page doesn't exists"){
			that.Landing.Details = data; 
			that.Contact.landingID = data.id;
		}else{
			that.Landing.switch = 2;


			console.log(data);}
		

	})
}

$scope.GoEdit = function(ruta){

	$location.path('/edit/'+ruta);

}

$scope.Submit = function(){

	$http.post('Landing-Contact',that.Contact).success(function(data){
		that.contact = {};
		$window.location.href(that.Landing.Details.hyperlink);
	})
}


}]);

//Editar Landing
app.controller('landEditCtrl',['$scope','$http','$routeParams','$location','$route','$rootScope', function($scope,$http,$routeParams,$location,$route,$rootScope){

var that = $scope;
$scope.LandingData = {'number':0,'data':$routeParams};


$scope.IsThisYourLanding = function(){
$http.get('currentid').success(function(data){
	that.LandingData.number = data;

	if(that.LandingData.number == 0){
		//No esta loggeado
		$location.path('/index');
	}else{
		//Esta loggeado
		$http.post('Verify',that.LandingData).success(function(data){
			if(data != "It's not his landing"){
			$scope.Landing = {
				'id':data.id,
				'name':data.nombre_landing,
				'title':data.titulo_landing,
				'link':data.hyperlink,
				'username':$rootScope.DUser.username,
				'cphone':data.contact_telefono,
				'cname':data.contact_nombre,
				'cemail':data.contact_correo,
				'fb':data.redes_facebook,
				'tw':data.redes_twitter,
				'yt':data.redes_youtube,
				}		

			}else{

				$location.path('/index');				
			}
		});
	}

	});
}

$scope.Edit = function(){

	$http.put('updatelanding',that.Landing).success(function(data){
		$location.path('/landing/'+that.Landing.name);
	});

}

$scope.IsThisYourLanding();
}]);


app.controller('ListCtrl',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
var that = $scope;
that.Landings = {}
that.User = JSON.parse(localStorage.DUser);

$scope.BringThem = function(){

	$http.get('my-landings/'+that.User.id).success(function(data){

		that.Landings = data;

	});

}
$scope.BringThem();

$scope.GoEdit = function(nombre){
	$location.path('/edit/'+nombre)
}


}]);