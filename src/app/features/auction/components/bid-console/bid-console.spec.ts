import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidConsoleComponent } from './bid-console';

describe('BidConsoleComponent', () => {
  let component: BidConsoleComponent;
  let fixture: ComponentFixture<BidConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidConsoleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BidConsoleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
