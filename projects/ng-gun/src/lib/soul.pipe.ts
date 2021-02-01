import { Pipe, PipeTransform } from '@angular/core';
import * as Gun from 'gun';

@Pipe({
  name: 'soul',
})
export class SoulPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return Gun.node.is(value) ? Gun.node.soul(value) : undefined;
  }
}
