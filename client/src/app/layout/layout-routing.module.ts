import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {CreateProposalComponent} from "./create-proposal/create-proposal.component"
import {Auth1Guard} from "../shared/guard/auth1.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProposalDetailComponent} from "./proposal-detail/proposal-detail.component";
import {VoteProposalComponent} from "./vote-proposal/vote-proposal.component";
import {MyProposalComponent} from "./my-proposal/my-proposal.component";
import {VoteGovProposalComponent} from "./vote-gov-proposal/vote-gov-proposal.component";
import {CreateProposalStepsComponent} from "./create-proposal-steps/create-proposal-steps.component";
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
      { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
    ]
  },
  { path: 'create-proposal', component: CreateProposalComponent,canActivate:[Auth1Guard] },
  {path:'proposal-detail/:id',component:ProposalDetailComponent,canActivate:[Auth1Guard]},
  {path:'vote-proposal',component:VoteProposalComponent,canActivate:[Auth1Guard]},
  {path:'my-proposal',component:MyProposalComponent,canActivate:[Auth1Guard]},
  {path:'vote-gov-proposal',component:VoteGovProposalComponent,canActivate:[Auth1Guard]},
  {path:'create-proposal-steps',component:CreateProposalStepsComponent,canActivate:[Auth1Guard]}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
