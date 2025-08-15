import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseInput',
  standalone: true,
})
export class UppercaseInputPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value ? value.toUpperCase() : '';
  }
}
