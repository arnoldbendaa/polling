import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProposalComponent } from './my-proposal.component';

describe('MyProposalComponent', () => {
  let component: MyProposalComponent;
  let fixture: ComponentFixture<MyProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
