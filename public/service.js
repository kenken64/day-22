(function () {
    angular.module("FilmApp")
        .service("dbService", dbService);

    function dbService($http, $q) {
        var vm = this;

        vm.list = function (limit, offset) {
            var defer = $q.defer();
            var params = {
                limit: limit || 10,
                offset: offset || 0
            };

            $http.get("/api/films", {
                params: params
            }).then(function (result) {
                defer.resolve(result.data);
            }).catch(function (err) {
                defer.reject(err);
            });

            return defer.promise;
        };

        vm.detail = function (filmId) {
            var defer = $q.defer();

            $http.get("/api/films/" + filmId)
                .then(function (result) {
                    defer.resolve(result.data);
                })
                .catch(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };
    }

    dbService.$inject = ["$http", "$q"];
})();

//0, false, null, undefined

// +1 / -1 , true,