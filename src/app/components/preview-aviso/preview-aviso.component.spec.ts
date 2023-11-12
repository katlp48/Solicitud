import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAvisoComponent } from './preview-aviso.component';

describe('PreviewAvisoComponent', () => {
  let component: PreviewAvisoComponent;
  let fixture: ComponentFixture<PreviewAvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAvisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
