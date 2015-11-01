(function(){
	var fetch angular.module('fetch', []);

	var controller =  function ($scope, $http){

	$scope.dbSelect = function{$http.post('db.php', {'query':'select'})
	.success(function(data){
		$scope.data = data;
	})
	.error(function(data){
		$scope.data = "error in fecting data";
		console.log("noooooooooooo");
	})
	}
	})();
