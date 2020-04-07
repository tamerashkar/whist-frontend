import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerChipComponent } from './dealer-chip.component';

describe('DealerChipComponent', () => {
  let component: DealerChipComponent;
  let fixture: ComponentFixture<DealerChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
