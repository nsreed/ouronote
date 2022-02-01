import { Injectable } from '@angular/core';
// import * as adjectives from './adjectives.json';
// import * as nouns from './nouns.json';
import adjectives from './adjectives.json';
import nouns from './nouns.json';

@Injectable({
  providedIn: 'root',
})
export class NameRandomizerService {
  constructor() {}

  getRandomName() {
    const ai = Math.floor(Math.random() * adjectives.length);
    const ni = Math.floor(Math.random() * nouns.length);

    const ra = adjectives[ai];
    const rn = nouns[ni];

    return `${ra} ${rn}`;
  }
}
