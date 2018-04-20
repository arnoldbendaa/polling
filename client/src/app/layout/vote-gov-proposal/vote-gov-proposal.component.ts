import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../router.animations";
import {LocationService} from "../../services/location.service";
import {LocationComponent} from "../../shared/modules/location/location.component";
import {ProposalService} from "../../services/proposal.service";
import {Proposal} from "../../components/proposal.interfaces";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-vote-gov-proposal',
  templateUrl: './vote-gov-proposal.component.html',
  styleUrls: ['./vote-gov-proposal.component.scss'],
  animations: [routerTransition()]
})
export class VoteGovProposalComponent implements OnInit {
  dataSource=[];
  displayedColumns = ['myPriority','myVote','effective','votingResult',  'priority'];
  @ViewChild(LocationComponent)locationComponent:LocationComponent;
  effectiveColumnName = "Select a Country or Province";
  canVote = true;
  constructor(
    private proposalService:ProposalService,
    private locationService:LocationService,
    private router:Router,

  ) {
    this.locationService.change.subscribe(locationChanged=> {
      let url = this.router.url;
      if(url.indexOf("vote-gov-proposal")>0){

      console.log("change called");
      let userLocationId = JSON.parse(localStorage.user).locationId;
      let locationId = this.locationService.getLocationIdFromLocation(this.locationComponent.location);
      this.locationService.checkLocationContains(userLocationId, locationId).subscribe(res=> {
        let data:Proposal;
        data=<Proposal>res;
        this.canVote = data.proposals;
        });


      let url = this.router.url;
      if (url.indexOf("vote-gov-proposal") > 0) {
        this.getGovProposalInLocation();
        let depth = this.locationService.getLocationDepthFromLocation(this.locationComponent.location);
        if (depth == 0)
          this.effectiveColumnName = "Federal Government is doing a good job in these areas:";
        else if (depth == 1)
          this.effectiveColumnName = "Prov/State Government is doing a good job in these areas:";
        else if (depth == 2)
          this.effectiveColumnName = "City Government is doing a good job in these areas:";
        else if (depth == 3)
          this.effectiveColumnName = "Community is doing a good job in these areas";
      }
    }
    })

  }

  ngOnInit() {
    // this.locationComponent.location.country = 1;
    // this.getGovProposalInLocation();
    this.locationComponent.voteGov = true;
  }
  setCanVote(res){
    this.canVote = res.checkResult;
  }
  getGovProposalInLocation(){
    let locationId = this.locationService.getLocationIdFromLocation(this.locationComponent.location);
    var userId = JSON.parse(localStorage.user).userId;
    if(locationId<1||userId<1) return;
    // this
    this.proposalService.getGovProposalsInLocation(userId,locationId).subscribe(res=>{
      let data:Proposal;
      data=<Proposal>res;
      this.dataSource = data.proposals;
    },err=>{
      console.log(err);
    })
  }
  Vote(){
    // console.log(this.dataSource);
    let userId = JSON.parse(localStorage.user).userId;
    let locationId = this.locationService.getLocationIdFromLocation(this.locationComponent.location);
    this.proposalService.voteGov(this.dataSource,userId,locationId).subscribe(data=>{
      this.getGovProposalInLocation();
      Swal('Success Voted');
    },error=>{
      console.log(error);
    })
  }
}
