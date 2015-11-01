(function() {

	var controller = function($scope,$rootScope) {
		$scope.todo = [
			{
				'text': 'CS pset'
			},
			{
				'text': 'stat pset'
			}
		]

		$scope.topPriority = 0;

		$scope.addItem = function() {
			$rootScope.$broadcast('Add Item', 'input');
		}

		$scope.completeItem = function() {
			if ($scope.topPriority >= $scope.todo.length) {
				$scope.addItem();
			} else {
				$scope.topPriority++;
			}

			// make DB change
		}
	};

	controller.$inject = ['$scope','$rootScope'];

	var directive = function() {
        return {
            restrict: 'E',
            templateUrl: 'todo-item.html',
            controller: controller
        };
    };

    angular.module('todoItem',[])
    .directive('todoItem', directive)
})();
