import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViraComponent } from './vira.component';

describe('ViraComponent', () => {
  let component: ViraComponent;
  let fixture: ComponentFixture<ViraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
