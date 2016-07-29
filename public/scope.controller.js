(function (){
    angular.module("FilmApp")
        .controller("FirstController", function ($scope, $rootScope) {
            $scope.$on("SOME_EVENT" , function (e, value) {
                console.log("First COntroller", value);
            });
            $rootScope.$broadcast("SOME_EVENT", "FROM_FIRST - using root scope");
            $scope.$emit("SOME_EVENT", "FROM_FIRST - using scope")
        })
        .controller("SecondController", function ($scope, $rootScope) {
            $scope.$on("SOME_EVENT" , function (e, value) {
                console.log("SecondController", value );
            });
            $rootScope.$emit("SOME_EVENT", "FROM_SECOND - using root scope");
            $scope.$emit("SOME_EVENT", "FROM_SECOND - using scope")
        });
})();