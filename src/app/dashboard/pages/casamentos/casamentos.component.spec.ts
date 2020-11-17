import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasamentosComponent } from './casamentos.component';

describe('CasamentosComponent', () => {
  let component: CasamentosComponent;
  let fixture: ComponentFixture<CasamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
