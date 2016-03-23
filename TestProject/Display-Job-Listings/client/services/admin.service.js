    
    var appName = "jobsearch";
        angular.module(appName)
        .service('adminService', [
            "$resource", "jobFactory", 
            function ($resource, jobFactory) {
               console.log("got to adminservice");
                return $resource("http://104.236.240.201:3000/admin", {},
                    {
                        login: { method: "POST", params: {}, isArray: true }
                    }
                );
        }]);