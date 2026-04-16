import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaComponent } from './arena';

describe('ArenaComponent', () => {
  let component: ArenaComponent;
  let fixture: ComponentFixture<ArenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArenaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArenaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
