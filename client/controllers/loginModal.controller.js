var appName = "jobsearch";
angular.module(appName)
    .controller("loginModal.controller", ["$scope", "$uibModalInstance",
        function ($scope, $uibModalInstance) {
            $scope.username = "";
            $scope.password = "";        
            $scope.login = function login() {
                $uibModalInstance.close({username: $scope.username, password: $scope.password});
            };

            $scope.cancel = function cancel() {
                $uibModalInstance.close();
            };        
        }])


        