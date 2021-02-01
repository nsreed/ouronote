import { Pipe, PipeTransform } from '@angular/core';
import * as Gun from 'gun';

@Pipe({
  name: 'updated',
})
export class UpdatedPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    const updates = Gun.node.is(value) ? (value as any)._['>'] : null;
    if (!updates) {
      return null;
    }
    return Object.values(updates).reduce(
      (latest: any, time: any) => (time > latest ? time : latest),
      0
    );
  }
}
