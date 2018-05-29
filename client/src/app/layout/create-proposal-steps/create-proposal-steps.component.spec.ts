import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProposalStepsComponent } from './create-proposal-steps.component';

describe('VoteGovProposalComponent', () => {
  let component: CreateProposalStepsComponent;
  let fixture: ComponentFixture<CreateProposalStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProposalStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProposalStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
