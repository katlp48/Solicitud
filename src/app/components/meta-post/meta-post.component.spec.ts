import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaPostComponent } from './meta-post.component';

describe('MetaPostComponent', () => {
  let component: MetaPostComponent;
  let fixture: ComponentFixture<MetaPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
