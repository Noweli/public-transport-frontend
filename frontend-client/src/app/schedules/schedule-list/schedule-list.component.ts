import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ScheduleEntry, ScheduleEntryListResult} from "../../services/models/public-transport-api";
import {ScheduleHelper} from "../../helpers/schedule-helper";
import {ScheduleService} from "../../services/schedule.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-schedule-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.scss'
})
export class ScheduleListComponent implements OnInit {
  protected scheduleList: ScheduleEntry[] = null!;
  protected readonly ScheduleHelper = ScheduleHelper;

  constructor(private scheduleService: ScheduleService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.refreshSchedules();
  }

  refreshSchedules(): void {
    this.scheduleService.getAllSchedules()
      .subscribe({
          next: (result: ScheduleEntryListResult) => this.scheduleList = result.data!,
          error: (error) => this.snackBar.open('Failed to refresh schedules' + error, 'OK')
        }
      );
  }

  handleEditSchedule(scheduleItem: ScheduleEntry): void {
    this.router.navigate([`edit/schedule/${scheduleItem.id}`]).then();
  }

  handleDeleteSchedule(scheduleItem: ScheduleEntry): void {
    this.scheduleService.deleteSchedule(scheduleItem.id!).subscribe({
      complete: () => {
        this.snackBar.open('Successfully deleted schedule.', 'OK', {duration: 3000});
        this.refreshSchedules();
      },
      error: err => this.snackBar.open('Could not delete schedule. ' + err, 'OK')
    })
  }

  handleAttachSpl(scheduleItem: ScheduleEntry) {
    this.router.navigate([`edit/schedule/${scheduleItem.id}/attachspl`]).then();
  }
}
