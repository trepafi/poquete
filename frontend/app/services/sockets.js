(function () {
    'use strict';
    angular.module('lt.services.sockets', [])
        .factory('sockets', ['$rootScope', '$q', function ($rootScope, $q) {
            var session, connecting,
                socket = {
                    connect: function (config) {
                        var defer = $q.defer();
                        ab.connect(config.api.websocketUrl,
                            // WAMP session was established
                            function (_session) {
                                // session["_session_id"] has the session id
                                _session.prefix("domain", config.api.domainName);
                                session = _session;

                                socket.on("domain:/sessionStateChange", function (uri, data) {
                                    console.log('sessionStateChange', data);
                                    if (data.code == 0) { // 0 means this user is logged-in
                                        eventBus.broadcast(eventBus.events.user.SIGN_IN, session["_session_id"]);
                                    } else {
                                        eventBus.broadcast(eventBus.events.user.SIGN_OUT);
                                    }
                                    if ($rootScope.$$phase) {
                                        defer.resolve(session);
                                    }
                                    else {
                                        $rootScope.$apply(function () {
                                            defer.resolve(session);
                                        });
                                    }
                                });
                                console.log('session was established ', session["_session_id"]);
                                if ($rootScope.$$phase) {
                                    defer.resolve(session);
                                }
                                else {
                                    $rootScope.$apply(function () {
                                        defer.resolve(session);
                                    });
                                }
                                connecting = null;
                            },
                            // WAMP session is gone
                            function (code, reason) {
                                console.log(code, reason);
                                session = null;
                                $rootScope.$apply(function () {
                                    defer.reject(reason);
                                });
                            }
                        );
                        return defer.promise;
                    },
                    call: function (eventName, data, options) {
                        if (!session) {
                            if (connecting) {
                                console.log('connecting...', eventName);
                                return connecting.then(function (config) {
                                    return socket.call(eventName, data, options);
                                });
                            }
                            else {
                                console.log('connect', eventName);
                                return connecting = socket.connect(config).then(function () {
                                    return socket.call(eventName, data, options);
                                });
                            }
                        }
                        else {
                            var defer = $q.defer(),
                                options = options || {},
                                storeKey = eventName + (options.key || '');
                            var cached = sessionRepo.get(storeKey);

                            console.log('call:', storeKey, data);

                            if (cached) {
                                console.log('cached:', storeKey, cached);
                                defer.resolve(cached);
                            } else {
                                session.call(eventName, data).then(
                                    function (result) {
                                        var filter = options.resultFilter;
                                        console.log('>', eventName, result);
                                        //Hook added to be able to filter the response data
                                        if (typeof filter === 'function') {
                                            result = filter(result);
                                        }
                                        if (options.cache) {
                                            sessionRepo.set(storeKey, result);
                                        }
                                        if ($rootScope.$$phase) {
                                            defer.resolve(session);
                                        } else {
                                            $rootScope.$apply(function () {
                                                defer.resolve(result);
                                            });
                                        }
                                    }, function (err) {
                                        // err.desc contains error description
                                        console.error('->', err.desc, err.uri);
                                        defer.reject(err);
                                    });
                            }
                            return defer.promise;
                        }
                    },
                    on: function (eventName, callback) {
                        session.subscribe(eventName, function () {
                            var args = arguments;
                            $rootScope.$apply(function () {
                                callback.apply(session, args);
                            });
                        });
                    },
                    off: function (eventName) {
                        session.unsubscribe(eventName);
                    }
                };
            //window.FALLBACK_API_URL = config.fallbackUrl;
            return socket;
        }]);
})();