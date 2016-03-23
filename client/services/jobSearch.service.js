// var appName = "jobsearch";
// angular.module(appName)
//     .service('jobService', [
//         "$http", "jobFactory", 
//         function ($http, jobFactory) {
//             var publisher = "2878037053725137"
//             var channel = "FJR"; 
//             var location= jobFactory.getLocation;
//             this.list = function(){
//               $http({
//                     method  : 'GET',
//                     url: "http://localhost:3000/space/",
//                     //url     : "http://api.indeed.com/ads/apisearch?publisher=" + publisher + "&l=" + jobFactory.getLocation + "&start=" + jobFactory.getStart + "&limit=" + jobFactory.getLimit + "&chnl=" + channel + "&v=2",
//                     params  : {}  // Query Parameters (GET)                  
//                 }).success(function(data, status, headers, config) {
//                    // console.dir(data);  // XML document object
//                     return data;
//                 }).error(function(data, status, headers, config) {
//                     return "error";
//                 });
//         }
//         }])
         
//     //          $http.get         
//     //          ("http://api.indeed.com/ads/apisearch?publisher=" + publisher + "&l=" + jobFactory.getLocation + "&start=" + jobFactory.getStart + "&limit=" + jobFactory.getLimit + "&chnl=" + channel + "&v=2")
//     //          .success(function(data){
//     //              return data;
//     //          })
//     //          .error(function(data){
//     //              return data
//     //          })}
                
//     // }]);
     
    //"http://api.indeed.com/ads/apisearch?publisher=2878037053725137&l=48362&start=0&limit=5&chnl=FJR&v=2"
    
    var appName = "jobsearch";
        angular.module(appName)
        .service('jobService', [
            "$resource", "jobFactory", 
            function ($resource, jobFactory) {
               
                return $resource("http://localhost:3000/getJobs/:publisher/:jobTitle/:location/:start/:limit/:channel", {},
                    {
                        list: { method: "GET", params: { publisher: "2878037053725137", jobTitle: jobFactory.getJobTitle, channel: "FJR", location: jobFactory.getLocation, start: jobFactory.getStart, limit: jobFactory.getLimit } }
                    }
                );
        }]);
    
   // http://api.indeed.com/ads/apisearch?publisher=2878037053725137&q=java&l=48362%2C+tx&sort=&radius=&st=&jt=&start=0&limit=20&fromage=&filter=&latlong=1&co=us&chnl=FJR&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2"