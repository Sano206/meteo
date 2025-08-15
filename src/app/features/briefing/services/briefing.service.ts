import { inject, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { BriefingRequest, BriefingResponse } from '../types/briefing-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BriefingService {
  counter = signal(0);
  isLoading = signal(false);
  private dialog = inject(MatDialog);
  private http = inject(HttpClient);
  private apiUrl = process.env['API_URL'] ?? '';
  private briefingResponseWritable = signal<BriefingResponse | null>(null);
  public readonly briefingResponse = this.briefingResponseWritable.asReadonly();

  getBriefing(request: BriefingRequest): void {
    this.isLoading.set(true);
    this.http
      .post<BriefingResponse>(this.apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })
      .subscribe({
        next: (response) => {
          this.briefingResponseWritable.set(response);
          this.counter.update((prev) => prev + 1);
        },
        error: (error) => {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'An unknown error occurred';
          this.dialog.open(ErrorDialogComponent, {
            data: { message: errorMessage },
          });
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}
