import { Observable, of } from 'rxjs';
import { Message } from 'src/app/models/message';
import { catchError, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fadeIn } from 'src/app/containers/game/animations';
import { WhistService } from 'src/app/services/whist.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    trigger('message', [transition(':enter', useAnimation(fadeIn))]),
  ],
})
export class MessagesComponent implements OnInit {
  message = new FormControl('', [Validators.required]);

  messages$: Observable<Message[]> = this.whistService.messages$;

  constructor(
    protected snackBar: SnackBarService,
    protected whistService: WhistService
  ) {}

  ngOnInit(): void {}

  trackBy(index, message: Message) {
    return message.id;
  }

  onSend() {
    if (this.message.valid) {
      this.whistService
        .createMessage(this.message.value)
        .pipe(
          tap(() => this.message.patchValue('')),
          catchError((error) => {
            this.snackBar.serverError(error);
            return of(null);
          })
        )
        .subscribe();
    }
  }
}
