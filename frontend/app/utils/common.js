(function () {
    'use strict';
    angular.module('lt.utils.common', [])
        .factory('cookies', function () {
            return {
                write: function (name, value, days) {
                    var expires;
                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                        expires = "; expires=" + date.toGMTString();
                    }
                    else expires = "";
                    document.cookie = name + "=" + value + expires + "; path=/";
                },
                read: function (name) {
                    var nameEQ = name + "=";
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') {
                            c = c.substring(1, c.length);
                        }
                        if (c.indexOf(nameEQ) == 0) {
                            return c.substring(nameEQ.length, c.length);
                        }
                    }
                    return null;
                },
                erase: function (name) {
                    this.write(name, "", -1);
                },
                check: function () {
                    this.create("poqueteCookiesEnabled", "poquete");
                    if (this.read("poqueteCookiesEnabled") != null) {
                        this.erase("poqueteCookiesEnabled");
                        return false;
                    }
                    return true;
                },
                exists: function(name){
                    return this.read(name) !== null;
                }
            };
        })
        .factory('tryParseJson', function () {
            return function (str) {
                try {
                    return JSON.parse(str);
                } catch (e) {
                    return str;
                }
            }
        })
        .factory('isJson', function () {
            return function (str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }
        })
})();