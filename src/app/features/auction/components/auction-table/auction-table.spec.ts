import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionTableComponent } from './auction-table';

describe('AuctionTableComponent', () => {
  let component: AuctionTableComponent;
  let fixture: ComponentFixture<AuctionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
