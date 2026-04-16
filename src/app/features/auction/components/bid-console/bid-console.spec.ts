import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidConsole } from './bid-console';

describe('BidConsole', () => {
  let component: BidConsole;
  let fixture: ComponentFixture<BidConsole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidConsole],
    }).compileComponents();

    fixture = TestBed.createComponent(BidConsole);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
