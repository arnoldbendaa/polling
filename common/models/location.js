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
    Location.getProvinces = function(req,cb){
      var countryId = req.query.countryId;
      var countryName = req.query.countryName;
      if(countryId==-1){
        Location.findOrCreate({where:{name:countryName,parentId:0,depth:0}},{name:countryName,parentId:0,depth:0},function(err,instance){
          Location.getCountries(cb);
        })
      }else{
        Location.find({where:{depth:1,parentId:countryId},fields:{id:true,name:true}},function(err,instance){
          cb(null,instance);
        })
      }
    }
    Location.getCities = function(req,cb){
      var countryId = req.query.countryId;
      var provinceId = req.query.provinceId;
      var provinceName = req.query.provinceName;
      if(provinceId==-1){
        Location.findOrCreate({where:{name:provinceName,parentId:countryId,depth:1}},{name:provinceName,parentId:countryId,depth:1},function(err,instance){
          Location.find({where:{depth:1,parentId:countryId},fields:{id:true,name:true}},function(err,instance){
            cb(null,instance);
          })
        })
      }else{
        Location.find({where:{depth:2,parentId:provinceId},fields:{id:true,name:true}},function(err,instance){
          cb(null,instance);
        })
      }
    }
    Location.getCommunities = function(req,cb){
      var provinceId = req.query.provinceId;
      var cityId = req.query.cityId;
      var cityName = req.query.cityName;
      if(cityId==-1){
        Location.findOrCreate({where:{name:cityName,parentId:provinceId,depth:2}},{name:cityName,parentId:provinceId,depth:2},function(err,instance){
          Location.find({where:{depth:2,parentId:provinceId},fields:{id:true,name:true}},function(err,instance){
            cb(null,instance);
          })
        });
      }else{
        Location.find({where:{depth:3,parentId:cityId},fields:{id:true,name:true}},function(err,instance){
          cb(null,instance);
        })
      }
    }

    Location.createCommunity = function(req,cb){
      var cityId = req.query.cityId;
      var communityName = req.query.communityName;
      if(cityId>0){
        Location.findOrCreate({where:{name:communityName,parentId:cityId,depth:3}},{name:communityName,parentId:cityId,depth:3},function(err,instance){
          Location.find({where:{depth:3,parentId:cityId},fields:{id:true,name:true}},function(err,instance){
            cb(null,instance);
          })
        });
      }else{
        cb(null,"Invalid Parameter");
      }
    }

    Location.getCountries = function(cb){
      Location.find({where:{depth:0},fields:{id:true,name:true},order:'name'},function(err,instance){
        console.log(instance);
        cb(null,instance);
      })
    }

    Location.remoteMethod("checkLocationContains",{
        http:{path:"/checkLocationContains",verb:"get"},
        accepts:{arg:'req',type:'object',http:{source:'req'}},
        returns:{arg:'proposals',type:'string'}
    })
    Location.remoteMethod("getProvinces",{
        http:{path:"/getProvinces",verb:"get"},
        accepts:{arg:'req',type:'object',http:{source:'req'}},
        returns:{arg:'proposals',type:'string'}
    })
    Location.remoteMethod("getCountries",{
      http:{path:"/getCountries",verb:"get"},
      returns:{arg:'proposals',type:'string'}
    })
    Location.remoteMethod("getCities",{
      http:{path:"/getCities",verb:"get"},
      accepts:{arg:'req',type:'object',http:{source:'req'}},
      returns:{arg:'proposals',type:'string'}
    })
    Location.remoteMethod("getCommunities",{
      http:{path:"/getCommunities",verb:"get"},
      accepts:{arg:'req',type:'object',http:{source:'req'}},
      returns:{arg:'proposals',type:'string'}
    })
    Location.remoteMethod("createCommunity",{
      http:{path:"/createCommunity",verb:"get"},
      accepts:{arg:'req',type:'object',http:{source:'req'}},
      returns:{arg:'proposals',type:'string'}
    })
    

};
