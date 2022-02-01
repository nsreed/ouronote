import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import adjectives from './adjectives.json';
import nouns from './nouns.json';
import { shareReplay, filter, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NameRandomizerService {
  blacklist$ = this.http
    .get('/assets/dictionary/blacklist.json')
    .pipe(shareReplay(1));
  adjectives$ = this.http
    .get('/assets/dictionary/adjectives.json')
    .pipe(shareReplay(1));

  adjective$ = this.blacklist$.pipe(
    switchMap((b: any) =>
      this.adjectives$.pipe(filter((a) => !b || !b.includes(a)))
    ),
    map((n: any) => n[Math.floor(Math.random() * n.length)])
  );
  nouns$ = this.http.get('/assets/dictionary/nouns.json').pipe(shareReplay(1));
  noun$ = this.nouns$.pipe(
    switchMap((b: any) =>
      this.nouns$.pipe(filter((n) => !b || !b.includes(n)))
    ),
    map((n: any) => n[Math.floor(Math.random() * n.length)])
  );

  constructor(private http: HttpClient) {}

  async getRandomName() {
    const bl = (await this.blacklist$.toPromise()) as any[];
    const appAdj = adjectives.filter((a) => !bl.includes(a));
    const appNoun = nouns.filter((n) => !bl.includes(n));
    const ra = appAdj[Math.floor(Math.random() * appAdj.length)];
    const rn = appNoun[Math.floor(Math.random() * appNoun.length)];
    return `${ra} ${rn}`;
  }
}
