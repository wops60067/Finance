import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsiCrossComponent } from './rsi-cross.component';

describe('RsiCrossComponent', () => {
  let component: RsiCrossComponent;
  let fixture: ComponentFixture<RsiCrossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsiCrossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsiCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
