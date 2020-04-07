import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCardsComponent } from './table-cards.component';

describe('TableCardsComponent', () => {
  let component: TableCardsComponent;
  let fixture: ComponentFixture<TableCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
