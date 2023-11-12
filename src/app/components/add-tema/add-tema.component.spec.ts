import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemaComponent } from './add-tema.component';

describe('AddTemaComponent', () => {
  let component: AddTemaComponent;
  let fixture: ComponentFixture<AddTemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
