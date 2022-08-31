import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWindowComponent } from './input-window.component';

describe('InputWindowComponent', () => {
  let component: InputWindowComponent;
  let fixture: ComponentFixture<InputWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
