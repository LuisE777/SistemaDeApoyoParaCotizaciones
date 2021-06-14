import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter10'
})
export class Filter10Pipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
