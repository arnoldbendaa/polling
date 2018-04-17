import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteGovProposalComponent } from './vote-gov-proposal.component';

describe('VoteGovProposalComponent', () => {
  let component: VoteGovProposalComponent;
  let fixture: ComponentFixture<VoteGovProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteGovProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteGovProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
