import {
  Component,
  ViewChild,
  ElementRef,
  HostBinding,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Typewriter from 'typewriter-effect/dist/core';
import { WhistService } from 'src/app/services/whist.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent implements AfterViewInit {
  @HostBinding('class.close-curtains')
  closeCurtains = false;

  @ViewChild('creditsText')
  creditsText: ElementRef;

  typewriter;

  homeTeamPoints$ = this.whistService.game$.pipe(
    map((game) => game.homeTeamPoints)
  );

  guestTeamPoints$ = this.whistService.game$.pipe(
    map((game) => game.guestTeamPoints)
  );

  constructor(
    protected router: Router,
    protected cdr: ChangeDetectorRef,
    protected whistService: WhistService
  ) {}

  ngAfterViewInit(): void {
    this.typewriter = new Typewriter(this.creditsText.nativeElement);

    this.typewriter
      .pauseFor(1000)
      .typeString('Thanks for playing')
      .pauseFor(1000)
      .deleteAll()
      .typeString('For my family; who I built this game to play with.')
      .pauseFor(500)
      .typeString(
        '<br><strong>Danna, Essam, Raeda, Marwan</strong> and my extended family'
      )
      .pauseFor(500)
      .typeString('<br><br>Built with <span style="color:red">♥</span>')
      .callFunction(() => {
        setTimeout(() => {
          this.closeCurtains = true;
          this.cdr.markForCheck();

          setTimeout(() => this.router.navigate(['/']), 5000);
        }, 5000);
      })
      .start();
  }
}
