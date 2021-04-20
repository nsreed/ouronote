import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor() {}

  log(message: string, ...args: any[]) {
    console.log(message, ...args);
  }
}
