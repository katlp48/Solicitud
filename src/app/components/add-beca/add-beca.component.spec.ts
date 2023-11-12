import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBecaComponent } from './add-beca.component';

describe('AddBecaComponent', () => {
  let component: AddBecaComponent;
  let fixture: ComponentFixture<AddBecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBecaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
