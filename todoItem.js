(function() {

	var weightItem = function(item) {
		console.log('duedate:'+ new Date(item.todo_date).getTime());
		console.log('today?' + new Date().getTime())
		var dateDiff = (new Date(item.todo_date).getTime() / 1000) - (new Date().getTime() / 1000);
		var denom = (item.todo_importance * item.todo_importance * (item.todo_time + 1))
		return dateDiff / denom;
	}

	var importanceWeighting = function(item1, item2) {
		var weighting1 = weightItem(item1);
		var weighting2 = weightItem(item2);
		item1.weighting = weighting1;
		item2.weighting = weighting2;
		if (weighting1 < 0 && weighting2 < 0) {
			if (weighting1 > weighting2) {
				return -1;
			} else if (weighting1 < weighting2) {
				return 1;
			}
		} else if (weighting1 < weighting2) {
			return -1;
		} else if (weighting1 > weighting2) {
			return 1;
		}
		return 0;
	}

	var controller = function($scope,$rootScope,$http) {
		$scope.todo = []

		$scope.topPriority = 0;

		$scope.addItem = function() {
			$rootScope.$broadcast('Add Item', 'input');
		}

		$scope.dbSelect = function(){
			$http.post('db.php', {'query':'select'})
			.success(function(response){
				console.log(response);
				response = response.replace('Connected successfully<br />','');
				$scope.todo = JSON.parse(response);
				$scope.todo.sort(importanceWeighting);
				console.log($scope.todo);
				if ($scope.todo.length == 0) {
					$scope.done = true;
				}
			})
			.error(function(response){
				console.log("DB Select Error! noooooooooooo");
			})
		}

		$scope.dbSelect();

		$scope.completeItem = function() {
			var req = {
				'query':'delete',
				'todo_id':$scope.todo[$scope.topPriority].todo_id
			}
			$http.post('db.php', req)
			.success(function(response) {
				console.log(response);
				$scope.topPriority++;
				if ($scope.topPriority >= $scope.todo.length) {
					$scope.done = true;
				}
			})
			.error(function(response) {
				console.log('DB Delete Failure. noooooooooooo')
				console.log(response);
			})
		}

		
	};

	controller.$inject = ['$scope','$rootScope','$http'];

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
