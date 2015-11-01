(function() {

	// initialize app
	var app = angular.module('app',['todoItem','addItem']);

	var controller = function($scope) {
		$scope.state = 'input';
		console.log($scope.state);
		$scope.changeState = function(state) {
			$scope.state = state;
		}

		$scope.$on('Input Submitted', function(event,data) {
            console.log('Page received Input Submitted event.');
            console.log(data);
            $scope.changeState(data);
        });

        $scope.$on('Add Item', function(event,data) {
        	console.log('Page received Add Item event.');
        	$scope.changeState(data);
        })
	};

	controller.$inject = ['$scope'];

	app.controller('viewCtrl',controller);

})();