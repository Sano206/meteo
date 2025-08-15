import { Component, computed, inject } from '@angular/core';
import { BriefingService } from '../../services/briefing.service';
import { BriefingResponseItem } from '../../types/briefing-model';
import { MatTableModule } from '@angular/material/table';
import { HighlightTextPipe } from '../../../../shared/pipes/highlight-text-pipe';
import { DatePipe } from '@angular/common';

export type Group = {
  stationId: string;
  isGroup: true;
};

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, HighlightTextPipe, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  private briefingService = inject(BriefingService);
  public briefingResponse = this.briefingService.briefingResponse;

  displayedColumns: string[] = ['queryType', 'reportTime', 'text'];

  groupedData = computed(() => {
    const result = this.briefingService.briefingResponse()?.result;
    return this.groupBy(result || []);
  });

  isGroup = (_: any, item: any): boolean => {
    return item.isGroup;
  };

  isDataRow = (_: any, item: any): boolean => {
    return !this.isGroup(_, item);
  };

  private groupBy(
    data: BriefingResponseItem[],
  ): (BriefingResponseItem | Group)[] {
    const a = data.reduce(
      (acc, curr) => {
        const station = acc.find((item) => item.stationId === curr.stationId);
        if (station) {
          station.reports.push(curr);
        } else {
          acc.push({ stationId: curr.stationId, reports: [curr] });
        }
        return acc;
      },
      [] as { stationId: string; reports: BriefingResponseItem[] }[],
    );

    return a.reduce((acc: (BriefingResponseItem | Group)[], curr) => {
      return acc.concat([
        { stationId: curr.stationId, isGroup: true },
        ...curr.reports,
      ]);
    }, []);
  }
}
