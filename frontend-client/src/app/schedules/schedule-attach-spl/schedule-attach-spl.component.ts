import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ScheduleService} from "../../services/schedule.service";
import {SplService} from "../../services/spl.service";
import {StopPointLineCorrelation} from "../../services/models/public-transport-api";
import {ScheduleHelper} from "../../helpers/schedule-helper";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {CommonModule, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-schedule-attach-spl',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    NgForOf,
    NgIf,
    CommonModule,
    RouterLink
  ],
  templateUrl: './schedule-attach-spl.component.html',
  styleUrl: './schedule-attach-spl.component.scss'
})
export class ScheduleAttachSplComponent implements OnInit {
  private id: number = null!;
  protected splList: StopPointLineCorrelation[] = null!;
  protected selectedSpl: StopPointLineCorrelation = null!;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private scheduleService: ScheduleService,
              private splService: SplService) {
  }

  ngOnInit(): void {
    this.initializeId();
    this.getSPLs();
  }

  private initializeId() {
    this.route.params.subscribe({
      next: params => {
        if (params['id']) {
          this.id = +params['id'];
        } else {
          this.snackBar.open('Invalid path. Schedule id missing.', 'OK', {duration: 5000});
          this.router.navigate(['view/schedules']).then();
        }
      }
    });

    this.scheduleService.getScheduleById(this.id).subscribe({
      next: value => this.selectedSpl = value.data?.splCorrelation!,
      error: err => this.snackBar.open('Could not check current spl attach status. ' + err, 'OK')
    });
  }

  private getSPLs(): void {
    this.splService.getAllSpls().subscribe({
      next: value => this.splList = value.data!,
      error: err => this.snackBar.open('Could not load SPL list. ' + err, 'OK')
    });
  }

  protected readonly ScheduleHelper = ScheduleHelper;
}
