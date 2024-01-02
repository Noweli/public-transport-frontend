import {Component, OnInit} from '@angular/core';
import {LineService} from "../../services/line.service";
import {Line, LineListResult} from "../../services/models/public-transport-api";
import {NgForOf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";

@Component({
  selector: 'app-lines-list',
  standalone: true,
  imports: [
    NgForOf,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './lines-list.component.html',
  styleUrl: './lines-list.component.scss'
})
export class LinesListComponent implements OnInit {
  protected linesList: Line[] = null!;

  constructor(private lineService: LineService) {
  }

  ngOnInit(): void {
    this.lineService.getAllLines()
      .subscribe({
        next: (result: LineListResult) => {
          this.linesList = result.data!
        }
      });
  }

  protected handleEditLine(line: Line) {

  }

  protected handleDeleteLine(line: Line) {

  }
}
