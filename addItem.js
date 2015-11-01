(function() { 

	var controller = function($scope,$rootScope,$http) {
		$scope.clearInput = function() {
			$scope.input = {
				'todo_task':"",
				'todo_date': new Date(),
				'query': 'insert'
			}
		}

		$scope.clearInput();

		$scope.addItem = function() {
			var item = $scope.input;

			$http.post('db.php', item)
			.success(function(response) {
				console.log(response);
			})
			.error(function(response) {
				console.log(response);
			});

			console.log($scope.input);
			$scope.clearInput();
			
		}

		$scope.goDoStuff = function() {
			$rootScope.$broadcast('Input Submitted','todo');
		}
	};

	controller.$inject = ['$scope','$rootScope','$http'];

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
