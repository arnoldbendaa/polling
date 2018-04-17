'use strict';

module.exports = function(Vote) {
    Vote.applyVote = function(req,cb){
        var body = req.body;
        var proposals = body.proposal;
        var userId = body.userId;
        var i = 0 ;
        var len = proposals.length;
        if(len<1){
            cb(null,"Invalid param");
            return;
        }

        proposals.forEach(function(proposal,index){
            i++;
            var voteInst;
            var date = new Date();
            var current_hour = date.getHours();
            var votingTime = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
            if(proposal.myVote>-1){
                voteInst = new Vote({
                    userId:userId,
                    votingResult:proposal.myVote,
                    proposalId:proposal.id,
                    voteTime:votingTime,
                    priority:proposal.myPriority
                });

            if(proposal.voteId!=null&&proposal.voteId!=''&&proposal.voteId!=undefined)
                voteInst.id = proposal.voteId;
            console.log(voteInst);
            // voteInst.save();
            Vote.upsert(voteInst,function(err,ins){

            })
            }
            if(len==i){
                cb(null,"success");
                return;
            }


        });
    }
    Vote.remoteMethod("applyVote",{
        http:{path:"/applyVote",verb:'post'},
        accepts:{arg:'req',type:'object',http:{source:'req'}},
        returns:{arg:'result',type:'string'}
      })

};
