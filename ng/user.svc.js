angular.module('app')
    .service('UserSvc', function ($http) {
        var svc = this
        svc.getUser = function () {
            console.log(this.token);
            return $http.get('/api/users', {
                    headers: {
                        'X-Auth': this.token
                    }
                })
                .then(function (response) {
                    console.log(response);
                    return response.data
                })
        }
        svc.login = function (username, password) {
            return $http.post('/api/sessions', {
                username: username,
                password: password
            }).then(function (response) {
                svc.token = response.data
                $http.defaults.headers.common['X-Auth'] = response.data
                console.log(response.data);
                return svc.getUser()
            })
        }
        svc.register = function (username, password) {
            return $http.post('/api/users', {
                username: username,
                password: password
            }).then(function () {
                return svc.login(username, password)
            })
        }
    })
