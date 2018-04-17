import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationComponent} from "../../shared/modules/location/location.component";
import {Proposal} from "../../components/proposal.interfaces";
import {ProposalService} from "../../services/proposal.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {routerTransition} from "../../router.animations";
import {LocationService} from "../../services/location.service";
import {pageSize} from "../../config/globals";
import {PagerServiceService} from "../../services/pager-service.service";

@Component({
  selector: 'app-my-proposal',
  templateUrl: './my-proposal.component.html',
  styleUrls: ['./my-proposal.component.scss'],
  animations: [routerTransition()]
})
export class MyProposalComponent implements OnInit {
  dataSource=[{votingResult:78,title:"",count:0,priority:3}];
    OrgdataSourceSearch = [];
  displayedColumns = ['title','votingResult', 'count', 'priority'];
  @ViewChild(LocationComponent)locationComponent:LocationComponent;
    keyword : string;
    pager: any = {};
  constructor(
    private proposalService:ProposalService,
    private router:Router,
    private locationService:LocationService,
    private location:Location,
    private pagerService:PagerServiceService,

  ) { }

  ngOnInit() {
    this.getMyProposals();
    this.locationService.change.subscribe(locationChanged=> {
      let url = this.router.url;
      if(url.indexOf("my-proposal")>0){
        let locationId = this.locationService.getLocationIdFromLocation(this.locationComponent.location);
        var userId = JSON.parse(localStorage.user).userId;
        this.proposalService.getMyProposalsInLocation(userId,locationId).subscribe(res=>{
          let data:Proposal;
          data=<Proposal>res;
          this.dataSource = data.proposals;
        },error=>{});
      }
    });

      let locationId = JSON.parse(localStorage.user).locationId;
      this.locationComponent.preLocationId = locationId;
      this.locationComponent.selecteDisabled = true;

  }
  getMyProposals(){
    var userId = JSON.parse(localStorage.user).userId;
    this.proposalService.getMyProposals(userId).subscribe(res=>{
      let data:Proposal;
      data=<Proposal>res;
      this.dataSource = data.proposals;
    },error=>{});
  }
  selectRow(row){
    let proposalId = row.id;
    this.router.navigate(['/proposal-detail/'+proposalId]);
  }
  searchMyProposals(){
      console.log(this.keyword);
      if(this.keyword==undefined||this.keyword==""||this.keyword==null)
          return;
      let locationId = this.locationService.getLocationIdFromLocation(this.locationComponent.location);
      let userId = JSON.parse(localStorage.user).userId;
      this.proposalService.searchMyProposalforVote(this.keyword,locationId,userId).subscribe(res=>{
          let data:Proposal;
          data=<Proposal>res;
          this.OrgdataSourceSearch = data.proposals;
          this.pager = this.pagerService.getPager(this.OrgdataSourceSearch.length,1,pageSize);
          this.setPage(1);
      })
  }
  setPage(page:number){
    if(this.pager.totalPages==0){
      this.dataSource = [];
      return;
    }
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }
    this.pager = this.pagerService.getPager(this.OrgdataSourceSearch.length,page,pageSize);
    this.dataSource = this.OrgdataSourceSearch.slice(this.pager.startIndex,this.pager.endIndex+1);
  }

}
