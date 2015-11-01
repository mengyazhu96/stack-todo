(function() { 

	var controller = function($scope,$rootScope) {
		$scope.clearInput = function() {
			$scope.input = {
				'item':"",
				'importance': 0,
				'time': 0
			}
		}

		$scope.clearInput();

		$scope.addItem = function() {
			console.log($scope.input);
			$scope.clearInput();
			$rootScope.$broadcast('Input Submitted','todo');
		}
	};

	controller.$inject = ['$scope','$rootScope'];

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