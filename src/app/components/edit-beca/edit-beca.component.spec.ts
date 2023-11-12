import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBecaComponent } from './edit-beca.component';

describe('EditBecaComponent', () => {
  let component: EditBecaComponent;
  let fixture: ComponentFixture<EditBecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBecaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
