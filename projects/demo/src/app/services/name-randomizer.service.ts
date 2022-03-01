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

  constructor(private http: HttpClient) {}

  async getRandomName() {
    let bl: any = [];
    try {
      bl = (await this.blacklist$.toPromise()) as any[];
    } catch (e: any) {}
    const appAdj = adjectives.filter((a) => !bl.includes(a));
    const appNoun = nouns.filter((n) => !bl.includes(n));
    const ra = appAdj[Math.floor(Math.random() * appAdj.length)];
    const rn = appNoun[Math.floor(Math.random() * appNoun.length)];
    return `${ra} ${rn}`;
  }
}