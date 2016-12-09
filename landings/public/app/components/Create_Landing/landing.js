var app = angular.module('make_landing', []);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/Landing-make',{
		templateUrl:'app/components/Create_Landing/landingCreate.html',
		controller:'landingCtrl',
		css:'css/landing.css'

	});

	$routeProvider.when('/landing/:nombre_landing',{
		templateUrl:'app/components/Create_Landing/landingPage.html',
		controller:'landCtrl',
		css:'css/landing.css'
	});

	$routeProvider.when('/edit/:nombre_landing',{
		templateUrl:'app/components/Create_Landing/landingEdit.html',
		controller:'landEditCtrl',
		css:'css/landing.css'

	});

	$routeProvider.when('/Landing-lists',{
		templateUrl:'app/components/Create_Landing/landingList.html',
		controller:'ListCtrl',
		css:'css/landing.css'	
	});

}]);

//Crear landing
app.controller('landingCtrl',['$scope','$http',function($scope,$http){
var that = $scope;
$scope.Landing = {'userid':0};

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
	});

}

}]);

//Visualizar Landing
app.controller('landCtrl',['$scope','$http','$routeParams', function($scope,$http,$routeParams){
var that = $scope;
$scope.Landing = {'switch':1,Details:{}};
$scope.Contact = {};

if($routeParams){

	$http.get('Landing-Page/'+$routeParams.nombre_landing).success(function(data){
		
		if(data != "This landing page doesn't exists"){
			that.Landing.Details = data; 
			that.Contact.landingID = data.id;
		}else{that.Landing.switch = 2;
			console.log(data);}
		

	})
}

$scope.Submit = function(){

	$http.post('Landing-Contact',that.Contact).success(function(data){
		that.contact = {};
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
		console.log(data);
	});

}

$scope.IsThisYourLanding();
}]);


app.controller('ListCtrl',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){



}]);