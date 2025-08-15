import { Component } from '@angular/core';
import { FormComponent } from './features/briefing/components/form/form.component';
import { TableComponent } from './features/briefing/components/table/table.component';

@Component({
  selector: 'app-root',
  imports: [FormComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'meteo-v2';
}
