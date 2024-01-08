import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {StopPointLineCorrelation} from "../../services/models/public-transport-api";
import {SplService} from "../../services/spl.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {ScheduleHelper} from "../../helpers/schedule-helper";

@Component({
  selector: 'app-spl-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    NgForOf,
    RouterLink,
    MatExpansionModule,
    NgIf
  ],
  templateUrl: './spl-list.component.html',
  styleUrl: './spl-list.component.scss'
})
export class SplListComponent implements OnInit {
  protected splList: StopPointLineCorrelation[] = null!;

  constructor(private splService: SplService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.refreshLines();
  }

  handleSplEdit(splItem: StopPointLineCorrelation): void {
    this.router.navigate([`edit/spl/${splItem.id}`]).then();
  }

  handleSplDelete(splItem: StopPointLineCorrelation): void {
    this.splService.deleteSpl(splItem.id!).subscribe({
      complete: () => {
        this.snackBar.open('Successfully removed SPL.', 'OK', {duration: 3000});
        this.refreshLines();
      },
      error: err => this.snackBar.open('Could not remove SPL. ' + err, 'OK')
    })
  }

  protected refreshLines(): void {
    this.splService.getAllSpls().subscribe({
      next: value => this.splList = value.data!,
      error: err => this.snackBar.open('Could not refresh spl list. ' + err, 'OK')
    });
  }

  protected readonly ScheduleHelper = ScheduleHelper;
}
