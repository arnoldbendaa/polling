import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ProposalService} from "../../services/proposal.service";
import {routerTransition} from "../../router.animations";
import {Proposal} from "../../components/proposal.interfaces";
import {CreateProposalComponent} from "../create-proposal/create-proposal.component";
import {Location} from '@angular/common';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.scss'],
  animations: [routerTransition()]
})
export class ProposalDetailComponent implements OnInit {
  @ViewChild(CreateProposalComponent)proposalView:CreateProposalComponent;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private proposalService : ProposalService,
    private _location: Location
  ) {
    console.log("constructor");
    this.route.params.subscribe( params => {
      let token = JSON.parse(localStorage["user"]).userId;
      this.proposalService.getDetails(params.id,token).subscribe(res=>{
        let data:Proposal;
        data=<Proposal>res;
        console.log(data.proposals[0])
        // date setting
        this.proposalView.proposal = data.proposals[0];
        let date = data.proposals[0].date;
        let year = date.substring(0,4);
        let month = date.substring(5,7);
        let day = date.substring(8,10);
        this.proposalView.proposal.dates = {"year":parseInt(year),"month":parseInt(month),"day":parseInt(day)};
        this.proposalView.locationComponent.preLocationId = data.proposals[0].locationId;
        this.proposalView.detailWindow = true;
          let locationId = JSON.parse(localStorage.user).locationId;
        if(locationId == data.proposals[0].locationId)
          this.proposalView.canvote = true;
        else
          this.proposalView.canvote = false;

      },error=>{
        console.log(error);
      });
      console.log(params.id);
    } );
  }
  backClicked(){
    console.log("back");
    this._location.back();
  }
  ngOnInit() {
    console.log("init");
  }
  voteProposal(){
    console.log("detail submit called");
  }

}
