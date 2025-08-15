import { AbstractControl, ValidationErrors } from '@angular/forms';

export function atLeastOneRequiredValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const stations = control.get('stations');
  const countries = control.get('countries');

  if (!stations || !countries) {
    return null;
  }

  const stationsValue = stations.value;
  const countriesValue = countries.value;

  if (
    (stationsValue && stationsValue.trim() !== '') ||
    (countriesValue && countriesValue.trim() !== '')
  ) {
    return null;
  }

  return { atLeastOneRequired: true };
}
