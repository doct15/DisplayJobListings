var appName = "jobsearch";
angular.module(appName)
    .factory('jobFactory', function(){
         
        var publisher;
        var location;
        var start;
        var limit;
        //q
        var jobTitle;

            return {
                getPublisher : function () {
                    return publisher; 
                },
                setPublisher:function(aPublisher){
                    publisher = aPublisher;
                },
                 getStart : function () {
                    return start; 
                },
                setStart:function(aStart){
                    start = aStart;
                },
                 getLocation : function () {
                    return location; 
                },
                setLocation:function(aLocation){
                    location = aLocation;
                },
                 getLimit : function () {
                    return limit; 
                },
                setLimit:function(aLimit){
                    limit = aLimit;
                },
                getJobTitle : function () {
                    return jobTitle; 
                },
                setJobTitle : function(aJobTitle){
                    jobTitle = aJobTitle;
                }
            }               
        });
