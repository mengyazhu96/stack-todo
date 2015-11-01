(function() { 
	// set up the controller for the accounts display
	var controller = function($scope) {
		var blank_input = {
			'item':"",
			'impValues': 0,
			'time': 0
		}

		$scope.input = blank_input;

		$scope.clearInput = function() {
			$scope.input = blank_input
		}

		$scope.addItem = function() {
			console.log($scope.input);
			$scope.clearInput();
		}
	};

	controller.$inject = ['$scope'];

	// set up the accounts display directive
	var directive = function() {
        return {
            restrict: 'E',
            templateUrl: 'add-item.html',
            controller: controller
        };
    };

    angular.module('addItem',[])
    .directive('addItem', directive)
})();