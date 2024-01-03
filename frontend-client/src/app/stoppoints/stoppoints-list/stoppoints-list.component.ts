import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {StopPointService} from "../../services/stoppoint.service";
import {StopPoint} from "../../services/models/public-transport-api";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private spService: StopPointService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.refreshLines();
  }

  refreshLines(): void {
    this.spService.getAllStopPoints().subscribe({
      next: value => this.stopPoints = value.data!,
      error: err => this.snackBar.open('Could not refresh stop points.' + err, 'OK')
    });
  }

  handleEditStopPoint(stopPoint: StopPoint) {

  }

  handleDeleteStopPoint(stopPoint: StopPoint) {

  }
}
