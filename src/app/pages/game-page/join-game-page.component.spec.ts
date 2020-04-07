import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGamePageComponent } from './join-game-page.component';

describe('JoinGamePageComponent', () => {
  let component: JoinGamePageComponent;
  let fixture: ComponentFixture<JoinGamePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoinGamePageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
