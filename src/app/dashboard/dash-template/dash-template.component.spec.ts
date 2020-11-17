import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTemplateComponent } from './dash-template.component';

describe('DashTemplateComponent', () => {
  let component: DashTemplateComponent;
  let fixture: ComponentFixture<DashTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
