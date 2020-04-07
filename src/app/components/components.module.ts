import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ChipComponent } from './chip/chip.component';
import { DeckComponent } from './deck/deck.component';
import { TeamComponent } from './team/team.component';
import { MaterialModule } from 'src/app/material.module';
import { PlayerComponent } from './player/player.component';
import { BidderComponent } from './bidder/bidder.component';
import { AvatarComponent } from './avatar/avatar.component';
import { CreditsComponent } from './credits/credits.component';
import { OdometerComponent } from './odometer/odometer.component';
import { CountdownComponent } from './countdown/countdown.component';
import { DealerChipComponent } from './dealer-chip/dealer-chip.component';
import { TableCardsComponent } from './table-cards/table-cards.component';
import { TablePlayersComponent } from './table-players/table-players.component';
import { AutofocusDirective } from 'src/app/components/autofocus/autofocus.directive';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    AutofocusDirective,
    CardComponent,
    PlayerComponent,
    CountdownComponent,
    BidderComponent,
    ChipComponent,
    DealerChipComponent,
    DeckComponent,
    TeamComponent,
    AvatarComponent,
    OdometerComponent,
    CreditsComponent,
    TableCardsComponent,
    TablePlayersComponent,
  ],
  exports: [
    AutofocusDirective,
    CardComponent,
    PlayerComponent,
    CountdownComponent,
    BidderComponent,
    ChipComponent,
    DealerChipComponent,
    DeckComponent,
    TeamComponent,
    AvatarComponent,
    OdometerComponent,
    CreditsComponent,
    TableCardsComponent,
    TablePlayersComponent,
  ],
})
export class ComponentsModule {}
