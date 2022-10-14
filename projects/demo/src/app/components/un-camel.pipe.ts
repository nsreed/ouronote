import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unCamel',
})
export class UnCamelPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value
      .replace(/([a-z][A-Z])/g, (substr, ...args: any[]) => {
        return substr.split('').join(' ');
      })
      .replace(/^[a-z]/, (substr, ...args: any[]) => {
        return substr.toLocaleUpperCase();
      });
  }
}
