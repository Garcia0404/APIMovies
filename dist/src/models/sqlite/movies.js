function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import { createClient } from "@libsql/client";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();
var db = createClient({
    url: process.env.SQLITE_URL,
    authToken: process.env.SQLITE_TOKEN
});
export var MovieModel = function MovieModel() {
    "use strict";
    _class_call_check(this, MovieModel);
};
_define_property(MovieModel, "getAll", /*#__PURE__*/ _async_to_generator(function() {
    var movies, moviesr, movieUpdated;
    return _ts_generator(this, function(_state) {
        switch(_state.label){
            case 0:
                return [
                    4,
                    db.execute("\n      SELECT * FROM movie  \n    ")
                ];
            case 1:
                movies = _state.sent();
                moviesr = movies.rows;
                return [
                    4,
                    Promise.all(moviesr.map(function() {
                        var _ref = _async_to_generator(function(movie) {
                            var genres_id, genres_idr, genres, updated;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            db.execute({
                                                sql: "SELECT genre_id FROM movie_genre WHERE movie_id=?",
                                                args: [
                                                    movie.id
                                                ]
                                            })
                                        ];
                                    case 1:
                                        genres_id = _state.sent();
                                        genres_idr = genres_id.rows;
                                        return [
                                            4,
                                            Promise.all(genres_idr.map(function() {
                                                var _ref = _async_to_generator(function(id) {
                                                    var gnrs;
                                                    return _ts_generator(this, function(_state) {
                                                        switch(_state.label){
                                                            case 0:
                                                                return [
                                                                    4,
                                                                    db.execute({
                                                                        sql: "SELECT name FROM genre WHERE id=?",
                                                                        args: [
                                                                            id.genre_id
                                                                        ]
                                                                    })
                                                                ];
                                                            case 1:
                                                                gnrs = _state.sent();
                                                                return [
                                                                    2,
                                                                    gnrs.rows[0].name
                                                                ];
                                                        }
                                                    });
                                                });
                                                return function(id) {
                                                    return _ref.apply(this, arguments);
                                                };
                                            }()))
                                        ];
                                    case 2:
                                        genres = _state.sent();
                                        updated = _object_spread_props(_object_spread({}, movie), {
                                            genres: genres
                                        });
                                        return [
                                            2,
                                            updated
                                        ];
                                }
                            });
                        });
                        return function(movie) {
                            return _ref.apply(this, arguments);
                        };
                    }()))
                ];
            case 2:
                movieUpdated = _state.sent();
                return [
                    2,
                    movieUpdated
                ];
        }
    });
}));
_define_property(MovieModel, "create", function() {
    var _ref = _async_to_generator(function(param) {
        var movie, title, year, description, director, duration, image, genres, id, uuid;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    movie = param.movie;
                    title = movie.title, year = movie.year, description = movie.description, director = movie.director, duration = movie.duration, image = movie.image, genres = movie.genres;
                    return [
                        4,
                        db.execute({
                            sql: "INSERT INTO movie(title,year,description,director,duration,image) VALUES (?,?,?,?,?,?)",
                            args: [
                                title,
                                year,
                                description,
                                director,
                                duration,
                                image
                            ]
                        })
                    ];
                case 1:
                    _state.sent();
                    return [
                        4,
                        Promise.all(genres.map(function() {
                            var _ref = _async_to_generator(function(genre) {
                                return _ts_generator(this, function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            return [
                                                4,
                                                db.execute({
                                                    sql: "INSERT INTO movie_genre(movie_id,genre_id) VALUES ((SELECT id FROM movie WHERE title=?),(SELECT id FROM genre WHERE name=?));",
                                                    args: [
                                                        title,
                                                        genre
                                                    ]
                                                })
                                            ];
                                        case 1:
                                            _state.sent();
                                            return [
                                                2
                                            ];
                                    }
                                });
                            });
                            return function(genre) {
                                return _ref.apply(this, arguments);
                            };
                        }()))
                    ];
                case 2:
                    _state.sent();
                    return [
                        4,
                        db.execute({
                            sql: "SELECT id FROM movie WHERE title=?",
                            args: [
                                title
                            ]
                        })
                    ];
                case 3:
                    id = _state.sent();
                    uuid = id.rows[0].id;
                    return [
                        2,
                        _object_spread({
                            id: uuid
                        }, movie)
                    ];
            }
        });
    });
    return function(_) {
        return _ref.apply(this, arguments);
    };
}());
_define_property(MovieModel, "getById", function() {
    var _ref = _async_to_generator(function(param) {
        var id, movie;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    id = param.id;
                    return [
                        4,
                        db.execute({
                            sql: "SELECT * FROM movie WHERE id=?",
                            args: [
                                id
                            ]
                        })
                    ];
                case 1:
                    movie = _state.sent();
                    if (movie.length === 0) {
                        return [
                            2,
                            null
                        ];
                    }
                    return [
                        2,
                        movie.rows[0]
                    ];
            }
        });
    });
    return function(_) {
        return _ref.apply(this, arguments);
    };
}());
_define_property(MovieModel, "update", function() {
    var _ref = _async_to_generator(function(param) {
        var id, update, movie, movieUpdated;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    id = param.id, update = param.update;
                    return [
                        4,
                        db.execute({
                            sql: "SELECT * FROM movie WHERE id=?",
                            args: [
                                id
                            ]
                        })
                    ];
                case 1:
                    movie = _state.sent();
                    if (movie.length === 0) {
                        return [
                            2,
                            null
                        ];
                    }
                    movieUpdated = _object_spread({}, movie.rows[0], update);
                    return [
                        4,
                        db.execute({
                            sql: "UPDATE movie \n      SET title=?,\n      year=?,\n      description=?,\n      director=?,\n      duration=?,\n      image=?\n      WHERE id=?;",
                            args: [
                                movieUpdated.title,
                                movieUpdated.year,
                                movieUpdated.description,
                                movieUpdated.director,
                                movieUpdated.duration,
                                movieUpdated.image,
                                id
                            ]
                        })
                    ];
                case 2:
                    _state.sent();
                    return [
                        2,
                        movieUpdated
                    ];
            }
        });
    });
    return function(_) {
        return _ref.apply(this, arguments);
    };
}());
