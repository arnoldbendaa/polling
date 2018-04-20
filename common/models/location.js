'use strict';

module.exports = function(Location) {
    

    Location.checkLocationContains = function(req,cb){
        var proposalId = req.query.proposalId;
        var myId = req.query.myId;
        var locationId = req.query.locationId;
        
        var ds = Location.dataSource;
        var query = "select checkLocationContains('"+myId+"','"+locationId+"') as result";
        var params = [locationId];
        console.log(query);
        ds.connector.execute(query,params,function(err,data){
          if(err){
            console.log(err);
          }else {
            console.log("quering data result is ");
            var string=JSON.stringify(data);
            var json =  JSON.parse(string);
            console.log(json[0]);
            var result = json[0].result;
            cb(null,result);
          }
        });
    
    }    


    Location.remoteMethod("checkLocationContains",{
        http:{path:"/checkLocationContains",verb:"get"},
        accepts:{arg:'req',type:'object',http:{source:'req'}},
        returns:{arg:'proposals',type:'string'}
    })
};
