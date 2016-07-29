(function () {

    angular
        .module("FilmApp")
        .config(FilmConfig);

    function FilmConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("list", {
                url: "/list",
                templateUrl: "/views/list.html",
                controller: "ListCtrl as ctrl"
            })
            .state("detail", {
                url: "/detail/:filmId",
                templateUrl: "/views/detail.html",
                controller: "DetailCtrl as ctrl"
            })
            .state("login", {
                url: "/login",
                templateUrl: "/views/login.html",
                controller: "LoginCtrl as ctrl"
            });

        $urlRouterProvider.otherwise("/list");
    }

    FilmConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

})();
