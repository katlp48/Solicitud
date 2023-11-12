import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetalleComponent } from './post-detalle.component';

describe('PostDetalleComponent', () => {
  let component: PostDetalleComponent;
  let fixture: ComponentFixture<PostDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
