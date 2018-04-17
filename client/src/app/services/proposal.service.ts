import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {serverUrl} from "../config/globals";
import {Headers} from "@angular/http";

@Injectable()
export class ProposalService {

  constructor(
    private http:HttpClient  )
  {

  };
  createProposal(proposal){
   return this.http.post(serverUrl+"api/proposals",proposal).map(res=>res);
  }
  getProposals(){
    return this.http.get(serverUrl+"api/proposals/getPropoals").map(res=>res);
  }
  getProposalsInLocation(locationId){
    return this.http.get(serverUrl+"api/proposals/getProposalsInLocation?locationId="+locationId).map(res=>res);
  }
  getDetails(proposalId,token){
    return this.http.get(serverUrl + "api/proposals/getProposalDetail?proposalId="+proposalId+"&token="+token).map(res=>res);
  }
  getProposalsForVote(token,userId){
    return this.http.get(serverUrl+"api/proposals/getProposalsForVote?access_token="+token+"&userId="+userId).map(res=>res);
  }
  getProposalsInLocationForVote(locationId,userId){
    return this.http.get(serverUrl+"api/proposals/getProposalsInLocationForVote?locationId="+locationId+"&userId="+userId).map(res=>res);
  }
  vote(proposals,userId){
    return this.http.post(serverUrl+"api/votes/applyVote",{'userId':userId,'proposal':proposals}).map(res=>res);
  }
  voteGov(proposals,userId,locationId){
    return this.http.post(serverUrl + "api/govvotes/applyVote",{'userId':userId,'proposal':proposals,'locationId':locationId}).map(res=>res);
  }
  getMyProposals(userId){
    return this.http.get(serverUrl+"api/proposals/getMyPropoals?userId="+userId).map(res=>res);
  }
  getMyProposalsInLocation(userId,locationId){
    return this.http.get(serverUrl+"api/proposals/getMyProposalsInLocation?userId="+userId+"&locationId="+locationId).map(res=>res);
  }
  getGovProposalsInLocation(userId,locationId){
    return this.http.get(serverUrl+"api/govProposals/getGovProposals?userId="+userId+"&locationId="+locationId).map(res=>res);
  }
  getTopMonthProposals(){
    return this.http.get(serverUrl+"api/proposals/getTopMonthProposals").map(res=>res);
  }
  searchProposals(keyword,locationId){
    return this.http.get(serverUrl + "api/proposals/searchProposal?keyword="+keyword+"&locationId="+locationId+"&userId=0").map(res=>res);
  }
  searchProposalforVote(keyword,locationId,userId){
    return this.http.get(serverUrl + "api/proposals/searchProposal?keyword="+keyword+"&locationId="+locationId+"&userId="+userId).map(res=>res);
  }
  searchMyProposalforVote(keyword,locationId,userId){
      return this.http.get(serverUrl + "api/proposals/searchMyProposalforVote?keyword="+keyword+"&locationId="+locationId+"&userId="+userId).map(res=>res);
  }
  voteOne(proposalId,voteValue,priority,userId){
    return this.http.get(serverUrl + "api/proposals/voteOne?proposalId="+proposalId+"&voteValue="+voteValue+"&priority="+priority+"&userId="+userId).map(res=>res);
  }
}
