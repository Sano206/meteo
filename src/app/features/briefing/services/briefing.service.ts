import { inject, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { BriefingRequest, BriefingResponse } from '../types/briefing-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BriefingService {
  counter = signal(0);
  isLoading = signal(false);
  private dialog = inject(MatDialog);
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private briefingResponseWritable = signal<BriefingResponse | null>(null);
  public readonly briefingResponse = this.briefingResponseWritable.asReadonly();

  getBriefing(request: BriefingRequest): void {
    this.isLoading.set(true);
    this.http.post<BriefingResponse>(this.apiUrl, request).subscribe({
      next: (response) => {
        if (response.error) {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: response.error.message },
          });
        } else {
          this.briefingResponseWritable.set(response);
        }
        this.counter.update((prev) => prev + 1);
      },
      error: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
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
