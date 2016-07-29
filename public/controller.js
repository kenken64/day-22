(function () {
    angular.module("FilmApp")
        .controller("ListCtrl", ListCtrl)
        .controller("DetailCtrl", DetailCtrl)
        .controller("LoginCtrl", LoginCtrl);

    function ListCtrl(dbService, $stateParams, $scope, $state) {
        var vm = this;

        $scope.$on("event:auth-loginRequired", function () {
            $state.go("login");
        });

        $scope.$on("event:auth-loginConfirmed", function () {
            console.log("Login Confirmed")
        });

        $scope.$on("event:auth-forbidden", function () {
            console.log("Forbidden");
        });

        dbService.list()
            .then(function (films) {
                vm.films = films;
            })
            .catch(function (err) {
                console.log("Some Error Occured", err);
            });
    }

    ListCtrl.$inject = ["dbService", "$stateParams", "$scope", "$state"];

    function DetailCtrl($stateParams, dbService) {
        var vm = this;

        dbService.detail($stateParams.filmId)
            .then(function (film) {
                vm.film = film;
            })
    }

    DetailCtrl.$inject = ["$stateParams", "dbService"];


    function LoginCtrl($http, authService, $state){
        var vm = this;

        vm.login = function () {
            $http.post("/login", vm.user)
                .then(function () {
                    $state.go("list");
                    authService.loginConfirmed();
                })
                .catch(function () {
                    vm.message = "Login not successful"
                });
        };

    }

    LoginCtrl.$inject = ["$http", "authService", "$state"];


}());