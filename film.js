var q = require('q');
var mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "igdefault",
    database: "sakila",
    connectionLimit: 4
});


const findAllStmt = "select film_id, title, release_year from film";
const findOneStmt = "select * from film where film_id = ?";

var makeQuery = function (sql, pool) {
    return function (args) {

        var defer = q.defer();

        pool.getConnection(function (err, connection) {
            if (err) {
                return defer.reject(err);
            }
            connection.query(sql, args || [], function (err, result) {
                connection.release();
                if (err) {
                    return defer.reject(err);
                }
                defer.resolve(result);
            })
        });

        return defer.promise;
    };
};


module.exports.findAll = makeQuery(findAllStmt, pool);
module.exports.findOne = makeQuery(findOneStmt, pool);