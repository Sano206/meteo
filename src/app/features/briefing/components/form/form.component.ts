import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BriefingService } from '../../services/briefing.service';
import { UppercaseInputPipe } from '../../../../shared/pipes/uppercase-input-pipe';
import { BriefingRequest } from '../../types/briefing-model';
import { atLeastOneRequiredValidator } from '../../validators/at-least-one-required-validator';
import { requireOneCheckboxToBeCheckedValidator } from '../../validators/require-one-checkbock-to-be-checked-validator';

const REPORT_TYPES = ['METAR', 'SIGMET', 'TAF'];

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    UppercaseInputPipe,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  form: FormGroup;
  public readonly reportTypes = REPORT_TYPES;
  briefingService = inject(BriefingService);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        reportTypes: this.formBuilder.group(
          REPORT_TYPES.reduce(
            (acc, reportType) => {
              acc[reportType] = this.formBuilder.control(false, {
                nonNullable: true,
              });
              return acc;
            },
            {} as { [key: string]: FormControl<boolean> },
          ),
          { validators: [requireOneCheckboxToBeCheckedValidator()] },
        ),
        stations: [''],
        countries: [''],
      },
      { validators: [atLeastOneRequiredValidator] },
    );
  }

  private _stringToArray(value: string | null): string[] {
    if (!value || value.trim() === '') {
      return [];
    }
    return value.trim().toUpperCase().split(' ');
  }

  mapFormToRequest(form: FormGroup): BriefingRequest {
    const id = this.briefingService.counter();
    const formValue = form.value;

    const selectedReportTypes = Object.keys(formValue.reportTypes).filter(
      (key) => formValue.reportTypes[key],
    );

    return {
      id: `query${id}`,
      method: 'query',
      params: [
        {
          id: `briefing${id}`,
          reportTypes: selectedReportTypes,
          stations: this._stringToArray(formValue.stations),
          countries: this._stringToArray(formValue.countries),
        },
      ],
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.briefingService.getBriefing(this.mapFormToRequest(this.form));
  }
}
