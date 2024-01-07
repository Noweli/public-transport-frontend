import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {StopPointLineCorrelation} from "../../services/models/public-transport-api";

@Component({
  selector: 'app-spl-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './spl-list.component.html',
  styleUrl: './spl-list.component.scss'
})
export class SplListComponent {
  protected splList: StopPointLineCorrelation[] = null!;

  handleSplEdit(splItem: StopPointLineCorrelation): void {

  }

  handleSplDelete(splItem: StopPointLineCorrelation): void {

  }
}
