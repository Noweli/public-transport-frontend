import {Component, OnInit} from '@angular/core';
import {LineService} from "../../services/line.service";
import {Line, LineListResult} from "../../services/models/public-transport-api";
import {NgForOf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {Router, RouterLink} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-lines-list',
  standalone: true,
  imports: [
    NgForOf,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    RouterLink
  ],
  templateUrl: './lines-list.component.html',
  styleUrl: './lines-list.component.scss'
})
export class LinesListComponent implements OnInit {
  protected linesList: Line[] = null!;

  constructor(private lineService: LineService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.refreshLines();
  }

  protected handleEditLine(line: Line) {
    this.router.navigate([`/edit/line/${line.id}`]).then();
  }

  protected handleDeleteLine(line: Line) {
    this.lineService.deleteLine(line.id!)
      .subscribe({
        complete: () => {
          this.snackBar.open(`Successfully deleted line ${line.name}`, 'OK', {duration: 3000});
          this.refreshLines();
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(`Could not delete ${line.name}. ${error}`, 'OK');
        }
      });
  }

  protected refreshLines(): void {
    this.lineService.getAllLines()
      .subscribe({
        next: (result: LineListResult) => {
          this.linesList = result.data!
        }
      });
  }
}
