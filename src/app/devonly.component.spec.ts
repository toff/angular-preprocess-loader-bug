import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevonlyComponent } from './devonly.component';

describe('DevonlyComponent', () => {
  let component: DevonlyComponent;
  let fixture: ComponentFixture<DevonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
