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
        this.nutrition = function (query) {
            console.log("Query: " + query.queryBody);
            var req = {
                method: 'POST',
                url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
                headers: {
                    'Content-Type': 'application/json',
                    'x-app-id': '562c28c5',
                    'x-app-key': 'eb369ef589737d49e03ed81c5722734f'
                },
                data: {
                    'query': query.queryBody
                }
            }
            return $http(req);
        }
    });
