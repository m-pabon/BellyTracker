angular.module('app')
    .service('DiarySvc', function ($http) {
        this.fetch = function () {
            return $http.get('/api/entries');
        }
        this.create = function (entry) {
            console.log(entry);
            return $http.post('/api/entries', entry);
        }
    });
