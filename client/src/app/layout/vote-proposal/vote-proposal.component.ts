import {Component, OnInit, ViewChild} from '@angular/core';
import { routerTransition } from '../../router.animations';
import {ProposalService} from "../../services/proposal.service";
import {Proposal} from "../../components/proposal.interfaces";
import {LocationService} from "../../services/location.service";
import {LocationComponent} from "../../shared/modules/location/location.component";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'
import {Location} from "@angular/common";
import {PagerServiceService} from "../../services/pager-service.service";
import {pageSize} from "../../config/globals";
import {MatRadioChange} from "@angular/material";

@Component({
  selector: 'app-vote-proposal',
  templateUrl: './vote-proposal.component.html',
  styleUrls: ['./vote-proposal.component.scss'],
  animations: [routerTransition()]

})
export class VoteProposalComponent implements OnInit {
    dataSource=[{votingResult:78,title:"",count:0,priority:3}];
    dataSourceSearch:any=[];
    OrgdataSourceSearch:any=[];
    displayedColumns = ['title','votingResult', 'count', 'priority'];
    keyword : string;
    pager: any = {};
    login = localStorage.getItem('is_login')=='1';
    userLocationId = -1;
    pagedItems: any[];

    constructor(
        private proposalService:ProposalService,
        private locationService:LocationService,
        private router:Router,
        private pagerService:PagerServiceService,
        private location:Location
    ) {

    }
    @ViewChild(LocationComponent)locationComponent:LocationComponent;
    ngOnInit() {
        if(this.login){
            this.userLocationId = JSON.parse(localStorage.user).locationId;
            this.locationComponent.preLocationId = this.userLocationId;
        }

        this.searchProposals();
        this.locationService.change.subscribe(locationChanged=>{
            let url = this.router.url;
            if(url.indexOf("vote-proposal")>0)

                this.searchProposals();
        })
    }
    selectRow(row){
        let proposalId = row.id;
        this.router.navigate(['/proposal-detail/'+proposalId]);
    }
    searchProposals(){
        console.log(this.keyword);
        if(this.keyword==undefined||this.keyword==""||this.keyword==null)
            this.keyword ="";
        let locationId = this.locationService.getLocationIdFromLocation(this.locationComponent.location);
        if(this.login){
            let userId = JSON.parse(localStorage.user).userId;
            this.proposalService.searchProposalforVote(this.keyword,locationId,userId).subscribe(res=>{
                let data:Proposal;
                data=<Proposal>res;
                this.OrgdataSourceSearch = data.proposals;
                this.pager = this.pagerService.getPager(this.OrgdataSourceSearch.length,1,pageSize);
                this.setPage(1);
            })
        }else{
            this.proposalService.searchProposals(this.keyword,locationId).subscribe(res=>{
                let data:Proposal;
                data=<Proposal>res;
                this.OrgdataSourceSearch = data.proposals;
                this.pager = this.pagerService.getPager(this.OrgdataSourceSearch.length,1,pageSize);
                this.setPage(1);

            })
        }
    }

    setPage(page:number){
        if(this.pager.totalPages==0){
            this.dataSourceSearch=[];
        }

        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.OrgdataSourceSearch.length,page,pageSize);
        this.dataSourceSearch = this.OrgdataSourceSearch.slice(this.pager.startIndex,this.pager.endIndex+1);

    }
    vote(event: MatRadioChange,proposalId,priority){
        console.log(event.value);
        console.log(proposalId);
        console.log(priority);
        var userId = JSON.parse(localStorage.user).userId;
        this.proposalService.voteOne(proposalId,event.value,priority,userId).subscribe(res=>{
            Swal('Success Voted');

        })
    }
    changePriority(proposalId,priority,voteValue){
        console.log("change priority");
        console.log(proposalId);
        console.log(priority);
        console.log(voteValue);
        var userId = JSON.parse(localStorage.user).userId;
        this.proposalService.voteOne(proposalId, voteValue,priority,userId).subscribe(res=>{
            Swal('Success Voted');
        });
    }

}
