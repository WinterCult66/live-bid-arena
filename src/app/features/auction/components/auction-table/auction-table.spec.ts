import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionTable } from './auction-table';

describe('AuctionTable', () => {
  let component: AuctionTable;
  let fixture: ComponentFixture<AuctionTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionTable],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
