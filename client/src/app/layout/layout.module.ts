import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Auth1Guard } from '../shared/guard/auth1.guard';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import {LocationService} from "../services/location.service";
import {ProposalService} from "../services/proposal.service";
import { MatRadioModule } from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {MatTableModule} from "@angular/material";
import {MatPaginatorModule} from '@angular/material/paginator';
import { PageHeaderModule } from '../shared';
import {LocationModule} from "../shared/modules/location/location.module";
import { ProposalDetailComponent } from './proposal-detail/proposal-detail.component';
import { VoteProposalComponent } from './vote-proposal/vote-proposal.component';
import { MyProposalComponent } from './my-proposal/my-proposal.component';
import { VoteGovProposalComponent } from './vote-gov-proposal/vote-gov-proposal.component';
import {PagerServiceService} from '../services/pager-service.service';
@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    NgbDropdownModule.forRoot(),
    NgbModule.forRoot(),
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    LocationModule,
    PageHeaderModule,
    FlashMessagesModule,

    MatSliderModule
  ],
  declarations: [LayoutComponent,  CreateProposalComponent, DashboardComponent, ProposalDetailComponent, VoteProposalComponent, MyProposalComponent, VoteGovProposalComponent, ],
    providers:[Auth1Guard,LocationService,ProposalService,PagerServiceService]
})
export class LayoutModule {}
