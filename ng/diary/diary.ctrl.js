angular.module('app')
    .directive('datepicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                $(element).datepicker({
                    dateFormat: 'mm/dd/yy',
                    onSelect: function (date) {
                        ctrl.$setViewValue(date);
                        ctrl.$render();
                        scope.$apply();
                    }
                });
            }
        };
    });
angular.module('app')
    .controller('DiaryCtrl', function ($scope, DiarySvc) {
        //Predicate for filtering
        $scope.date = getCurrentDate();
        $scope.filterDate = function (entry) {
            var date = $scope.date;
            return (date == ISODateToString(entry.date));
        }
        //Get Diary Entries from /api/posts enpoint
        DiarySvc.fetch($scope.currentUser)
            .then(function (response) {
                $scope.entries = response.data;
            }, function (error) {
                console.log(error, 'can not get data');
            });
        //Post a diary entry to /api/posts endpoint
        $scope.addEntry = function () {
            var dateString = "";
            if ($scope.entryDescription != null && $scope.entryAmount != null && $scope.entryUnit != null && $scope.tod != null) {
                if ($scope.date) {
                    var dateString = $scope.date;
                    var split = dateString.split("/");
                    var currentTime = new Date().getTime();
                    console.log("Date String 1: " + split);
                    $scope.date = new Date(split[2], (split[0] - 1), split[1]);
                    $scope.date.setTime(currentTime);
                    console.log("Scope Date: " + $scope.date);
                } else {
                    console.log("Date String 2: " + $scope.date);
                    $scope.date = Date.now();
                }
                var queryBody = $scope.entryAmount + " " + $scope.entryUnit + " " + $scope.entryDescription;
                DiarySvc.nutrition({
                    queryBody: queryBody
                }).then(function (res) {
                    $scope.nutrients = JSON.stringify(res.data.foods[0]);
                    if (res.data.foods[0].hasOwnProperty("nf_calories")) {
                        $scope.entryCalories = res.data.foods[0].nf_calories;
                    }
                    console.log("Date point 2: " + $scope.date);
                    DiarySvc.create({
                        description: $scope.entryDescription,
                        amount: $scope.entryAmount,
                        unit: $scope.entryUnit,
                        calories: $scope.entryCalories,
                        date: $scope.date,
                        username: $scope.currentUser.username,
                        tod: $scope.tod,
                        nutrients: $scope.nutrients
                    }).then(function (entry) {
                        if (dateString == "") {
                            var result = "";
                            var d = new Date();
                            result += (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
                            $scope.date = result;
                        } else
                            $scope.date = dateString;
                        $scope.entries.unshift(entry.data);
                        $scope.entryDescription = null;
                        $scope.entryAmount = null;
                        $scope.entryUnit = null;
                        $scope.entryCalories = null;
                        $scope.tod = null;
                    }, function (error) {
                        console.log(error, 'can not post data');
                    });
                    $scope.entryDescription = null;
                    $scope.entryAmount = null;
                    $scope.entryUnit = null;
                    $scope.entryCalories = null;
                    $scope.tod = null;

                    if (dateString == "") {
                        var result = "";
                        var d = new Date();
                        result += (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
                        $scope.date = result;
                    } else
                        $scope.date = dateString;
                }, function (error) {
                    console.log(error, 'can not post data to nutrionix');
                });
            }
        }

        function getCurrentDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = mm + '/' + dd + '/' + yyyy;
            return today;
        }

        function ISODateToString(ISODate) {
            date = new Date(ISODate);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            dt = date.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }

            var date = month + '/' + dt + '/' + year;
            return date;
        }
    });
