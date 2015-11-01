(function() { 
	// set up the controller for the accounts display
	var controller = function($scope) {
		$scope.todo = [
			{
				'text': 'CS pset'
			},
			{
				'text': 'stat pset'
			}
		]
	};

	controller.$inject = ['$scope'];

	// set up the accounts display directive
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
