import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {StopPointLineCorrelation} from "../../services/models/public-transport-api";
import {SplService} from "../../services/spl.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
export class SplListComponent implements OnInit {
  protected splList: StopPointLineCorrelation[] = null!;

  constructor(private splService: SplService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.refreshLines();
  }

  handleSplEdit(splItem: StopPointLineCorrelation): void {

  }

  handleSplDelete(splItem: StopPointLineCorrelation): void {

  }

  protected refreshLines(): void {
    this.splService.getAllSpls().subscribe({
      next: value => this.splList = value.data!,
      error: err => this.snackBar.open('Could not refresh spl list. ' + err, 'OK')
    });
  }
}
