angular.module('app')
    .service('DiarySvc', function ($http) {
        this.fetch = function (user) {
            if (user)
                console.log("User: " + user.username);
            else
                console.log("User: " + user);
            if (user) {
                var req = {
                    method: 'GET',
                    url: '/api/entries',
                    headers: {
                        'Content-Type': 'application/json',
                        'username': user.username
                    }
                }
                return $http(req);
            } else {
                return $http.get('/api/entries');
            }

        }
        this.create = function (entry) {
            console.log(entry);
            return $http.post('/api/entries', entry);
        }
    });
