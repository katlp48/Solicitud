import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaztePremiumComponent } from './hazte-premium.component';

describe('HaztePremiumComponent', () => {
  let component: HaztePremiumComponent;
  let fixture: ComponentFixture<HaztePremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaztePremiumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaztePremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
