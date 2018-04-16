angular.module('app')
    .controller('DiaryCtrl', function ($scope, DiarySvc) {
        //Get Diary Entries from /api/posts enpoint
        DiarySvc.fetch($scope.currentUser)
            .then(function (response) {
                $scope.entries = response.data;
            }, function (error) {
                console.log(error, 'can not get data');
            });
        //Post a diary entry to /api/posts endpoint
        $scope.addEntry = function () {
            if ($scope.entryDescription != null && $scope.entryAmount != null && $scope.entryUnit != null && $scope.entryCalories != null) {
                DiarySvc.create({
                    description: $scope.entryDescription,
                    amount: $scope.entryAmount,
                    unit: $scope.entryUnit,
                    calories: $scope.entryCalories,
                    username: $scope.currentUser.username
                }).then(function (entry) {
                    $scope.entries.unshift(entry.data);
                    $scope.entryDescription = null;
                    $scope.entryAmount = null;
                    $scope.entryUnit = null;
                    $scope.entryCalories = null;
                }, function (error) {
                    console.log(error, 'can not post data');
                });
                $scope.entryDescription = null;
                $scope.entryAmount = null;
                $scope.entryUnit = null;
                $scope.entryCalories = null;
            }
        }
    });
