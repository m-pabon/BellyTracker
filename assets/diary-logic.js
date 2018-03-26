//Declare a matching module (since we declared our <body> element as an Angular app).
var app = angular.module('app', []);
/*Declare a controller using .controller() on an instance of a module. Takes name of Controller and function used to build an instance of the controller. We stored the app module into variable 'app' then created a controller on it called DiaryCtrl.
This controller has an array that represents the diary entries we see in HTML. When a controller is declared we do what is called dependency inject $scope. $scope is an object you can access in the HTML and in the controller. When sharing controller data to the view, use $scope. When Referencing controller data from the view, leave out $scope
*/
app.controller('DiaryCtrl', function ($scope, DiarySvc) {
    //Get Diary Entries from /api/posts enpoint
    DiarySvc.fetch()
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
                calories: $scope.entryCalories
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

app.service('DiarySvc', function ($http) {
    this.fetch = function () {
        return $http.get('/api/entries');
    }
    this.create = function (entry) {
        return $http.post('/api/entries', entry);
    }
})
