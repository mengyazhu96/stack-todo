(function () {

    // set up addWish control that will control the add wish display and post the HTTP request
    var controller = function ($scope,$http,$rootScope,getWish,getAccountInfo) {

        // link to account service
        $scope.data = getAccountInfo.data;
        
        $scope.$on('Account ID updated',function(event,data) {
            console.log('addWish got account event');
            $scope.cancelWish();
            $scope.account = true;
        });

        // display control for add wish form
        $scope.doWish = false;

        // controls start/end on time options
        $scope.startEnd = true;

        // controls series options
        $scope.seriesOptions = false;

        // default input for wish submission
        $scope.input = {
            'earlyStartTime':0,
            'lateEndTime':0,
            'newOnly':false,
            'selectedChannelOnly':true,
            'keepForever': false,
            'wishType': 'Single',
            'isProtected': false
        };

        // toggles the display for the add wish form
        $scope.makeWish = function() {
            $scope.doWish = true;
            $scope.input = {
                'earlyStartTime':0,
                'lateEndTime':0,
                'newOnly':false,
                'selectedChannelOnly':true,
                'keepForever': false,
                'wishType': 'Single',
                'isProtected': false
            };
            $scope.startEnd = true;
            $scope.seriesOptions = false;
        }

        // cancels wish, setting input back to default
        $scope.cancelWish = function() {
            $scope.makeWish();
            $scope.doWish = false;
        } 

        // if the start/end checkbox is clicked or unclicked 
        $scope.setMinutes = function() {

            // if start/end on-time is set to true
            if ($scope.startEnd) {

                // reset the number of early and late minutes, in case changed by user
                $scope.input.earlyStartTime = 0;
                $scope.input.lateEndTime = 0;
            }
        }

        // toggles series options
        $scope.setSeries = function () {
            if ($scope.input.wishType == "Series") {
                $scope.seriesOptions = true;
            } else {
                $scope.seriesOptions = false;
                $scope.input.newOnly = false;
                $scope.input.selectedChannelOnly = true;
            }
        }

        // adds a wish
        $scope.addWish = function(mapID,airing) {

            // update input based on mapID and airing inputs
            $scope.input.channelMapId = mapID;
            $scope.input.airingId = airing.assetId;
            $scope.input.channelId = airing.c.ci;

            // determine title or wish recording
            if ($scope.input.wishType == 'Single') {
                $scope.input.titleId = airing.titleId;
            } else if ($scope.input.wishType == 'Series') {
                $scope.input.seriesId = airing.seriesId;
            }

            var url = dvr + "dvr/accounts/" + $scope.data.accountID + "/profiles/" + $scope.data.accountID + "-1/wishes?deviceId=111&tranId=222";
            var wish = $scope.input;
            console.log(wish);

            // post the addWish request
            $http.post(url, wish)
            .success(function(response) {

                if (response.msg != 'Success') {
                    alert(response.msg);
                    console.log(response.conflicts)
                }

                console.log(response);
                
                // hides the add wish form
                $scope.cancelWish();

                // send an event out
                $rootScope.$broadcast('Wish Added');

            })
            .error(function(response) {
                console.log('Error: addWish');
                console.log($scope.input)
            });
        };
    };

    controller.$inject = ['$scope','$http','$rootScope','getWish','getAccountInfo'];

    // set up the addWishForm directive
    var directive = function() {
        return {
            restrict: 'E',
            templateUrl: 'js/templates/add-wish.html',
            controller: controller,
            controllerAs: 'addWish'
        };
    };

    // set up the module for addWish
    angular.module('addWish',[])
    .directive('addWishForm',directive);

})();
