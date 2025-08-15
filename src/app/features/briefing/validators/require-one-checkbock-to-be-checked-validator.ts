import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export function requireOneCheckboxToBeCheckedValidator(): (
  control: AbstractControl,
) => ValidationErrors | null {
  return function (control: AbstractControl): ValidationErrors | null {
    if (!(control instanceof FormGroup)) {
      return null;
    }

    const formGroup = control as FormGroup;
    const isAtLeastOneChecked = Object.keys(formGroup.controls).some(
      (key) => formGroup.controls[key].value,
    );

    return isAtLeastOneChecked ? null : { requireOneCheckboxToBeChecked: true };
  };
}
