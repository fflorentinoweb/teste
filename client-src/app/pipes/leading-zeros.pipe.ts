import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'leadingZeros'})
export class LeadingZeros implements PipeTransform {
  transform(value:any): number {
    let newValue = value.replace(/^0+/, '')
    return newValue
  }
}
