import { Pipe, PipeTransform } from '@angular/core';

const TRESHOLD = 30;

@Pipe({
  name: 'highlightText',
  standalone: true,
})
export class HighlightTextPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
  ): { text: string; shouldHighlight: boolean; class?: string }[] {
    if (!value) {
      return [];
    }

    const regex = /(BKN|FEW|SCT)(\d{3})/gi;

    return value.split(' ').map((part) => {
      return {
        text: part,
        shouldHighlight: regex.test(part),
        class:
          parseInt(part.slice(3, 6), 10) <= TRESHOLD
            ? 'highlight-blue'
            : 'highlight-red',
      };
    });
  }
}
