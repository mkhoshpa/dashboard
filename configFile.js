angular.module("config", [])
.constant("local", {"EnvironmentConfig":{"api":"http://localhost/"}})
.constant("production", {"EnvironmentConfig":{"api":"https://api.production.com/"}});
