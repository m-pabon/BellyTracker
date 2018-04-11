angular.module('app')
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        //$locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller: 'DiaryCtrl',
                templateUrl: 'diary.html'
            })
            .when('/insights', {
                controller: 'InsightsCtrl',
                templateUrl: 'insights.html'
            })
            .when('/settings', {
                controller: "SettingsCtrl",
                templateUrl: 'settings.html'
            })
            .when('/register', {
                controller: 'RegisterCtrl',
                templateUrl: 'register.html'
            })
            .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'login.html'
            })
    });
