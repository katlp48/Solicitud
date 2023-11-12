import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoTemasComponent } from './curso-temas.component';

describe('CursoTemasComponent', () => {
  let component: CursoTemasComponent;
  let fixture: ComponentFixture<CursoTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoTemasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
