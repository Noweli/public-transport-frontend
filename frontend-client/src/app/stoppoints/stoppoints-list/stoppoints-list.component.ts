import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {StopPointService} from "../../services/stoppoint.service";
import {StopPoint} from "../../services/models/public-transport-api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-stoppoints-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './stoppoints-list.component.html',
  styleUrl: './stoppoints-list.component.scss'
})
export class StopPointsListComponent implements OnInit {
  protected stopPoints: StopPoint[] = null!;

  constructor(private spService: StopPointService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.refreshStopPoints();
  }

  refreshStopPoints(): void {
    this.spService.getAllStopPoints().subscribe({
      next: value => this.stopPoints = value.data!,
      error: err => this.snackBar.open('Could not refresh stop points.' + err, 'OK')
    });
  }

  handleEditStopPoint(stopPoint: StopPoint) {
    this.router.navigate([`/edit/stoppoint/${stopPoint.id}`]).then();
  }

  handleDeleteStopPoint(stopPoint: StopPoint) {
    this.spService.deleteStopPoint(stopPoint.id!).subscribe({
      complete: () => {
        this.snackBar.open(`Successfully deleted stop point ${stopPoint.name}`, 'OK', {duration: 3000});
        this.refreshStopPoints();
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(`Could not delete ${stopPoint.name}. ${error}`, 'OK');
      }
    })
  }
}
