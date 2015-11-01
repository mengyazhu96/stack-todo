(function() {

	// initialize app
	var app = angular.module('app',['todoItem','addItem']);

	var controller = function($scope) {
		$scope.showInput = true;
		$scope.changeInput = function() {
			$scope.showInput = !$scope.showInput;
		}
	};

	controller.$inject = ['$scope'];

	app.controller('viewCtrl',controller);

})();