'use strict';

module.exports = function(Proposal) {
  function getProposalList(proposals,cb){
    var proposal ;
    var Vote = Proposal.app.models.Vote;
    var Client = Proposal.app.models.Client;
    var len = proposals.length;
    var sum = 0 ;
    if(len<1){
      cb(null,[]);
      return;
    }
    var i = 0;
    proposals.forEach(function(proposal,index){
      Client.findById(proposal.createdUser,function(err,instance){
        proposals[index].userName = instance.username;
      });
      Vote.count({proposalId: proposal.id}, function(err, count) {
        proposals[index].count = count;

        Vote.count({proposalId:proposal.id,votingResult:1},function (err,count) {
          if(proposals[index].count>0){
            var yespro = Math.round(100*count/proposals[index].count);
            var nopro = 100 - yespro;
            proposals[index].votingResult = "Yes : " + yespro+ "% , " +"No : " + nopro+"%";
          }else { //any body votted.
            proposals[index].votingResult = "Yes : 0% , No : 0%";
          }
          // i++;
          // if(i==len)
          //   cb(null,proposals);
          
          var f = Vote.find({where :{proposalId:proposal.id},fields:{priority:true}},function(err,instance){
            sum = instance.reduce(function(last,d){return d.priority+last},0);
            proposals[index].avgPriority = sum/proposals[index].count;

            i++;
            if(i==len)
              cb(null,proposals);
  
          });


        })

      });
    });
  }

  function getProposalListForVote(proposals,cb,userId){
    // console.log("proposals is ");
    // console.log(proposals);
    console.log("userId is " + userId);


    var Vote = Proposal.app.models.Vote;
    var Client = Proposal.app.models.Client;
    var i = 0;
    var len = proposals.length;
    if(len<1){
      cb(null,[]);
      return;
    }

    proposals.forEach(function(proposal,index){
        Client.findById(proposal.createdUser,function(err,instance){
            proposals[index].userName = instance.username;
        });
      var sum = 0 ;
      Vote.count({proposalId: proposal.id}, function(err, count) {
        proposals[index].count = count;
        Vote.count({proposalId:proposal.id,votingResult:1},function (err,count) {
          if(proposals[index].count>0){
            var yespro = Math.round(100*count/proposals[index].count);
            var nopro = 100 - yespro;
            proposals[index].votingResult = "Yes : " + yespro+ "% , " +"No : " + nopro+"%";
          }else { //any body votted.
            proposals[index].votingResult = "Yes : 0% , No : 0%";
          }
        });

        Vote.find({where:{proposalId: proposal.id,userId:userId}},function(error,voteProposal){
          console.log("proposal Id is ");
          console.log(voteProposal);
          if(voteProposal.length>0){
            proposals[index].myVote = voteProposal[0].votingResult;
            proposals[index].voteId = voteProposal[0].id;
            proposals[index].myPriority = voteProposal[0].priority;
          }
          else
            proposals[index].myVote = -1;

            var f = Vote.find({where :{proposalId:proposal.id},fields:{priority:true}},function(err,instance){
              sum = instance.reduce(function(last,d){return d.priority+last},0);
              proposals[index].avgPriority = sum/proposals[index].count;

              i++;
              if(i==len)
                cb(null,proposals);
    
            });
      
          })
        });
    });

  }
//********************************* */
  Proposal.getPropoals = function(cb){
    Proposal.find({},function(err,proposals){
      getProposalList(proposals,cb);
    })
  };
  Proposal.getTopMonthProposals = function(cb){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    month = "0" + month;
    var startMonthDate = year +"-"+ month + "-01 00:00:00";
    var Vote = Proposal.app.models.Vote;

    Vote.find({where:{"voteTime" : {gt:startMonthDate}},fields:{proposalId:true}},function(err,votes){
      var voteLen = votes.length;
      var proposalIds = [];
      for(var i= 0 ; i < voteLen; i++)
        proposalIds.push(votes[i].proposalId);
      console.log(proposalIds);
      Proposal.find({where:{id:{inq:proposalIds}},order:'date desc'},function(err,proposals){
        getProposalList(proposals,cb);
      });
    })
  }
//********************************* */
  Proposal.getProposalsInLocation = function(locationId,cb){
    if(locationId>0){



      Proposal.find({where:{"locationId" : locationId},order:'date desc'},function(error,proposals){
        getProposalList(proposals,cb);
      });
    }else if(locationId==0){
      Proposal.find({order:'date desc'},function(err,proposals){
        getProposalList(proposals,cb);
      })
    }
  }
//********************************* */
  Proposal.getProposalDetail = function(req,cb){
    var proposalId = req.query.proposalId;
    var userId = req.query.token;
    if(proposalId>0){
      Proposal.find({where:{"id" : proposalId}},function(error,proposals){
        if(userId>0)
          getProposalListForVote(proposals,cb,userId);
        else
          getProposalList(proposals,cb);
      });
    }else
      cb(null,"invalid");
  };
  //********************************* */
  Proposal.getProposalsForVote = function (req,cb) {
    var accessToken = req.query.access_token;
    var userId = req.query.userId;
   if(accessToken==''||accessToken==null||accessToken==undefined||userId==''||userId==undefined||userId==null) {
     cb(null,"invalid token");
     return;
   }
   Proposal.find({order:'date desc'},function(error,proposals) {
    getProposalListForVote(proposals,cb,userId);
   })
  }
  //********************************* */
  Proposal.getProposalsInLocationForVote = function(req,cb){
    var locationId = req.query.locationId;
    var userId = req.query.userId;
    if(locationId==''||locationId==null||locationId==undefined||userId==''||userId==undefined||userId==null) {
      cb(null,"invalid token");
      return;
    }
    if(locationId>0){
      
      Proposal.find({where:{locationId:locationId},order:'date desc'},function(error,proposals) {
        getProposalListForVote(proposals,cb,userId);
      });
    }else if(locationId==0){
      Proposal.find({order:'date desc'},function(error,proposals) {
        getProposalListForVote(proposals,cb,userId);
      });
    }
  }
  //********************************* */
Proposal.getMyPropoals = function(userId,cb){
  if(userId<1) {
    cb(null,"invalid param");
    return;
  }
  Proposal.find({where:{createdUser:userId},order:'date desc' },function(err,proposals){
    getProposalList(proposals,cb);
  })
}
  //********************************* */
Proposal.getMyProposalsInLocation = function(req,cb){
  var userId = req.query.userId;
  var locationId = req.query.locationId;
  if(locationId==''||locationId==null||locationId==undefined||userId==''||userId==undefined||userId==null) {
    cb(null,"invalid token");
    return;
  }
  if(locationId>0){
    Proposal.find({where:{locationId:locationId,createdUser:userId},order:'date desc'},function(error,proposals) {
      getProposalList(proposals,cb);
    });
  }else{
    Proposal.find({where:{createdUser:userId},order:'date desc'},function(error,proposals) {
      getProposalList(proposals,cb);
    });
  }
}
//*************************************** */
Proposal.searchProposal = function(req,cb){
  var keyword = req.query.keyword;
  var locationId = req.query.locationId;
  var userId = req.query.userId;
  var ds = Proposal.dataSource;

    if(locationId>0){
    var query = "CALL getLocationIds("+locationId+");"
    var params = [locationId];
    console.log(query);
    ds.connector.execute(query,params,function(err,data){
      if(err){
        console.log(err);
      }else {
        console.log("quering data result is ");
        var string=JSON.stringify(data);
        var json =  JSON.parse(string);
        var locationIds = json[0][0].result;

        var arrLocationIds = locationIds.split(",");

        var query = "SELECT proposal.* FROM proposal LEFT JOIN `client` ON proposal.`createdUser` = `client`.`userId`"+
        "LEFT JOIN `location` ON proposal.`locationId` = location.`id` WHERE " +
        "(title LIKE '%"+keyword+"%' OR details LIKE '%"+keyword+"%' OR `client`.`username` LIKE '%"+keyword+"%')"+
        "AND proposal.`locationId` IN ("+arrLocationIds+") order by `date` desc ";
        ds.connector.execute(query,params,function (err,instnaces) {
            if(userId>0)
                getProposalListForVote(instnaces,cb,userId);
            else
                getProposalList(instnaces,cb);
        });

      }
    })
  }else{
      var params = [];
      var query = "SELECT proposal.* FROM proposal LEFT JOIN `client` ON proposal.`createdUser` = `client`.`userId`"+
          "LEFT JOIN `location` ON proposal.`locationId` = location.`id` WHERE " +
          "(title LIKE '%"+keyword+"%' OR details LIKE '%"+keyword+"%' OR `client`.`username` LIKE '%"+keyword+"%') order by `date` desc ";
      ds.connector.execute(query,params,function (err,instnaces) {
          if(userId>0)
              getProposalListForVote(instnaces,cb,userId);
          else
              getProposalList(instnaces,cb);
      });
  }
}

Proposal.voteOne = function(req,cb){
  var proposalId = parseInt(req.query.proposalId);
  var voteValue = parseInt(req.query.voteValue);
  var priority = parseInt(req.query.priority);
  var userId = parseInt(req.query.userId);
  var Vote = Proposal.app.models.Vote;
  var voteInst;
  var date = new Date();
  var current_hour = date.getHours();
  var votingTime = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

  if(isNaN(priority))
    priority = 0 ;
  voteInst = new Vote({
      userId:userId,
      votingResult:voteValue,
      proposalId:proposalId,
      voteTime:votingTime,
      priority:priority
  });
Vote.find({where:{proposalId: proposalId,userId:userId}},function(error,voteProposal){
  if(voteProposal.length>0){
      Vote.upsertWithWhere({proposalId: proposalId,userId:userId},voteInst,function(err,ins){
          cb(null,null);
      })
  }else{
    Vote.create(voteInst,function (err,inst) {
        cb(null,null);
    })
  }
  // console.log(voteInst.id);
  //   Vote.upsertWithWhere({proposalId: proposalId,userId:userId},voteInst,function(err,ins){
  //     cb(null,null);
  //   })
  });
}
Proposal.searchMyProposalforVote = function(req,cb){
  var locationId = req.query.locationId;
  var userId = req.query.userId;
  var keyword = req.query.keyword;
  if(locationId>0){
    var ds = Proposal.dataSource;
    var query = "CALL getLocationIds("+locationId+");"
    var params = [locationId];
    console.log(query);
    ds.connector.execute(query,params,function(err,data){
      if(err){
        console.log(err);
      }else {
        console.log("quering data result is ");
        var string=JSON.stringify(data);
        var json =  JSON.parse(string);
        var locationIds = json[0][0].result;
        var arrLocationIds = locationIds.split(",");
        console.log(arrLocationIds);
        Proposal.find({
          where:{and:
            [
              {"locationId":{inq:arrLocationIds}},
              {"createdUser":userId},
              { or: [
                  {"title":{"like":"%"+keyword+"%"}},
                  {"details":{"like":"%"+keyword+"%"}}
                ]
              }
            ] 
          },order:'date desc'
        },function(err,instnaces){
            getProposalListForVote(instnaces,cb,userId);
        })
      }
    })
  }
}


Proposal.remoteMethod("getPropoals",{
  http:{path:"/getPropoals",verb:'get'},
  returns:{arg:'proposals',type:'string'}
});  
Proposal.remoteMethod("getTopMonthProposals",{
  http:{path:"/getTopMonthProposals",verb:'get'},
  returns:{arg:'proposals',type:'string'}
});
  Proposal.remoteMethod("getProposalsInLocation",{
    http:{path:"/getProposalsInLocation",verb:'get'},
    accepts: {arg: 'locationId', type: 'number', http: { source: 'query' } },
    returns:{arg:'proposals',type:'string'}
  })
  Proposal.remoteMethod("getProposalDetail",{
    http:{path:"/getProposalDetail",verb:'get'},
    accepts:{arg:'req',type:'object',http:{source:'req'}},
    returns:{arg:'proposals',type:'string'}
  })
  Proposal.remoteMethod("getProposalsForVote",{
    http:{path:"/getProposalsForVote",verb:'get'},
    accepts: {arg: 'req', type: 'object', 'http': {source: 'req'}},
    returns:{arg:'proposals',type:'string'}
  })
  Proposal.remoteMethod("getProposalsInLocationForVote",{
    http:{path:"/getProposalsInLocationForVote",verb:'get'},
    accepts:{arg:'req',type:'object',http:{source:'req'}},
    returns:{arg:'proposals',type:'string'}
  })
  Proposal.remoteMethod("getMyPropoals",{
    http:{path:"/getMyPropoals",verb:"get"},
    accepts:{arg:'userId',type:'number',http:{source:'query'}},
    returns:{arg:'proposals',type:'string'}
  })
  Proposal.remoteMethod("getMyProposalsInLocation",{
    http:{path:"/getMyProposalsInLocation",verb:"get"},
    accepts:{arg:'req',type:"object","http":{source:'req'}},
    returns:{arg:'proposals',type:'string'}
  })
  Proposal.remoteMethod("searchProposal",{
    http:{path:"/searchProposal",verb:"get"},
    accepts:{arg:'req',type:'object',http:{source:'req'}},
    returns:{arg:'proposals',type:'string'}
  })
  Proposal.remoteMethod("voteOne",{
    http:{path:"/voteOne",verb:"get"},
    accepts:{arg:'req',type:'object',http:{source:'req'}},
    returns:{arg:'proposals',type:'string'}
  })
  Proposal.remoteMethod("searchMyProposalforVote",{
    http:{path:"/searchMyProposalforVote",verb:"get"},
    accepts:{arg:'req',type:'object',http:{source:'req'}},
    returns:{arg:'proposals',type:'string'}
  })
};
