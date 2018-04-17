'use strict';

module.exports = function(Govproposal) {


  Govproposal.getGovProposals = function(req,cb){
    var Location = Govproposal.app.models.Location;
    var GovVote = Govproposal.app.models.Govvote;

    var locationId = req.query.locationId;
    var userId = req.query.userId;
    var depth = -1;
    Location.findById(locationId,function(error,instance){
      depth = instance.depth;
      var i = 0;
      Govproposal.find({where:{depth:depth}},function(error,proposals) {
        var len = proposals.length;
        if(len==0)
          cb(null,proposals);
        proposals.forEach(function(proposal,index){
          var sum = 0 ;
          GovVote.count({proposalId: proposal.id,locationId:locationId}, function(err, count) {
            proposals[index].count = count;

            GovVote.count({proposalId:proposal.id,votingResult:1,locationId:locationId},function (err,count) {
              if(proposals[index].count>0){
                var yespro = Math.round(100*count/proposals[index].count);
                var nopro = 100 - yespro;
                proposals[index].votingResult = "Yes : " + yespro+ "% , " +"No : " + nopro+"%";
              }else { //any body votted.
                proposals[index].votingResult = "Yes : 0% , No : 0%";
              }

            });

            GovVote.find({where:{proposalId: proposal.id,userId:userId,locationId:locationId}},function(error,voteProposal){
              if(voteProposal.length>0){
                proposals[index].myVote = voteProposal[0].votingResult;
                proposals[index].voteId = voteProposal[0].id;
                proposals[index].myPriority = voteProposal[0].priority;
              }
              else{
                proposals[index].myVote = -1;
                proposals[index].myPriority == -1;
              }

                var f = GovVote.find({where :{proposalId:proposal.id,locationId:locationId},fields:{priority:true}},function(err,instance){
                  sum = instance.reduce(function(last,d){return d.priority+last},0);
                  proposals[index].avgPriority = sum/proposals[index].count;

                  i++;
                  if(i==len)
                    cb(null,proposals);

                });

              })
            });
        });









      });

    })
  }
  Govproposal.remoteMethod("getGovProposals",{
    http:{path:"/getGovProposals",verb:"get"},
    accepts:{arg:'req',type:"object","http":{source:'req'}},
    returns:{arg:'proposals',type:'string'}
  })

};
