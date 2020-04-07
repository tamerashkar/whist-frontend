import {
  OnInit,
  ViewChild,
  Component,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from 'src/app/models/card';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { WhistService } from 'src/app/services/whist.service';
import { StateService } from 'src/app/services/state.service';
import { slideInDown } from 'src/app/containers/game/animations';
import { useAnimation, transition, trigger } from '@angular/animations';
import { CardsComponent } from 'src/app/containers/cards/cards.component';
import { TableComponent } from 'src/app/containers/table/table.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [transition(':enter', useAnimation(slideInDown))]),
  ],
})
export class GameComponent implements OnInit {
  status$: Observable<string> = this.stateService.status$;
  game$: Observable<any> = this.whistService.game$;

  creditsWereRequested$: Observable<boolean> = this.stateService.name$.pipe(
    map((name) => name === 'CreditsWereRequested')
  );

  @ViewChild(TableComponent)
  tableComponent: TableComponent;

  @ViewChild(CardsComponent)
  cardsComponent: CardsComponent;

  constructor(
    protected ref: ElementRef,
    protected stateService: StateService,
    protected whistService: WhistService
  ) {}

  ngOnInit(): void {
    this.whistService.setContainer(this);
  }

  onCardDropped(event: CdkDragDrop<Card[]>) {
    this.cardsComponent.onCardPlayed(event.item.data);
  }
}
