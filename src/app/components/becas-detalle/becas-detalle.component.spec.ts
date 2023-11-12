import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecasDetalleComponent } from './becas-detalle.component';

describe('BecasDetalleComponent', () => {
  let component: BecasDetalleComponent;
  let fixture: ComponentFixture<BecasDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecasDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
