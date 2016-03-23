    
    var appName = "jobsearch";
        angular.module(appName)
        .service('gaqService', [
            "$resource", "jobFactory", 
            function ($resource, jobFactory) {
               console.log("got to gaqservice");
                return $resource("http://localhost:3000/gaq/:action", {},
                    {
                        create : { method: "POST", params: { action: "Post"}},
                        get : { method: "GET", params: { action: "Get"}}
                    }
                );
        }]);