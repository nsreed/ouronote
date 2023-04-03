import { Component, OnInit } from '@angular/core';
import { LogMessage, LogService } from 'log';
import { OuronoteLogService } from '../../services/ouronote-log.service';
import { map, scan, shareReplay, takeWhile, tap } from 'rxjs';

@Component({
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss'],
})
export class LogViewerComponent implements OnInit {
  messages$ = this.logger.logs$.pipe(
    tap((v) => console.log('what is', v)),
    map((messages) => messages.sort((a, b) => b.timestamp - a.timestamp)),
    takeWhile(() => true),
    shareReplay(1)
  );
  constructor(public logger: OuronoteLogService) {
    logger.error('log viewing, amazing', this.logger.name);
  }

  ngOnInit(): void {}

  onClearClick() {}
}
