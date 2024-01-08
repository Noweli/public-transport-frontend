import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {SplService} from "../../services/spl.service";
import {StopPointService} from "../../services/stoppoint.service";
import {LineService} from "../../services/line.service";
import {Line, SPLDTO, StopPoint} from "../../services/models/public-transport-api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {NgClass, NgForOf} from "@angular/common";
import {MatStepperModule} from "@angular/material/stepper";

@Component({
  selector: 'app-spl-add',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    NgForOf,
    NgClass,
    MatStepperModule
  ],
  templateUrl: './spl-add.component.html',
  styleUrl: './spl-add.component.scss'
})
export class SplAddComponent implements OnInit {
  protected canSubmit: boolean = true;
  protected stopPoints: StopPoint[] = null!;
  protected lines: Line[] = null!;
  protected selectedStopPoint: StopPoint = null!;
  protected selectedLine: Line = null!;

  constructor(private splService: SplService,
              private stopPointService: StopPointService,
              private lineService: LineService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initializeStopPointsArray();
    this.initializeLinesArray();
  }

  handleSubmit(splForm: NgForm): void {
    if (!splForm.valid) {
      return;
    }

    const splDto: SPLDTO = {
      lineId: this.selectedLine.id,
      stopPointId: this.selectedStopPoint.id
    }

    this.splService.addSpl(splDto);
  }

  handleSelectStopPoint(selectedStopPoint: StopPoint) {
    this.selectedStopPoint = selectedStopPoint;
  }

  handleSelectLine(lineItem: Line) {
    this.selectedLine = lineItem;
  }

  private initializeStopPointsArray(): void {
    this.stopPointService.getAllStopPoints().subscribe({
      next: value => this.stopPoints = value.data!,
      error: err => {
        this.snackBar.open('Could not load stop points. ' + err, 'OK');
        this.canSubmit = false;
      }
    });
  }

  private initializeLinesArray(): void {
    this.lineService.getAllLines().subscribe({
      next: value => this.lines = value.data!,
      error: err => {
        this.snackBar.open('Could not load lines. ' + err, 'OK');
        this.canSubmit = false;
      }
    });
  }
}
