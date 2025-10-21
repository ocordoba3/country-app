import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanPipe',
})
export class BooleanPipe implements PipeTransform {
  transform(value: boolean, args?: { trueLabel: string; falseLabel: string }): unknown {
    return value ? args?.trueLabel ?? 'Yes' : args?.falseLabel ?? 'No';
  }
}
