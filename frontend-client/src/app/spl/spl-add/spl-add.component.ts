import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
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
import {ActivatedRoute, Router} from "@angular/router";

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
  private id: number = null!;
  protected isEditMode: boolean = false;
  protected canSubmit: boolean = true;
  protected stopPoints: StopPoint[] = null!;
  protected lines: Line[] = null!;
  protected selectedStopPoint: StopPoint = null!;
  protected selectedLine: Line = null!;

  constructor(private splService: SplService,
              private stopPointService: StopPointService,
              private lineService: LineService,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializeEdit();
    this.initializeStopPointsArray();
    this.initializeLinesArray();
  }

  handleSubmit(): void {
    if (this.isEditMode) {
      this.handleEditSPL();
      return;
    }

    this.handleAddNewSPL();
  }

  handleSelectStopPoint(selectedStopPoint: StopPoint) {
    this.selectedStopPoint = selectedStopPoint;
  }

  handleSelectLine(lineItem: Line) {
    this.selectedLine = lineItem;
  }

  goBack(): void {
    this.router.navigate(['view/spl']).then();
  }

  private initializeEdit(): void {
    this.route.params.subscribe({
      next: params => {
        if (params['id']) {
          this.id = +params['id'];
          this.isEditMode = true;
          this.initializeEditModeValues();
        }
      }
    });
  }

  private initializeEditModeValues(): void {
    if (this.isEditMode) {
      this.splService.getSingleSpl(this.id).subscribe({
        next: value => {
          this.selectedStopPoint = value.data!.stopPoint!;
          this.selectedLine = value.data!.line!;
        },
        error: err => this.snackBar.open('Could not initialize edit mode. ' + err, 'OK')
      });
    }
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

  private handleAddNewSPL(): void {
    const splDto: SPLDTO = {
      lineId: this.selectedLine.id,
      stopPointId: this.selectedStopPoint.id
    }

    this.splService.addSpl(splDto).subscribe({
      complete: () => {
        this.snackBar.open('Successfully added SPL.', 'OK', {duration: 3000});
        this.goBack();
      },
      error: err => this.snackBar.open('Failed to add SPL. ' + err, 'OK')
    });
  }

  private handleEditSPL(): void {
    const splDto: SPLDTO = {
      lineId: this.selectedLine.id,
      stopPointId: this.selectedStopPoint.id
    }

    this.splService.updateSpl(this.id, splDto).subscribe({
      complete: () => {
        this.snackBar.open('Successfully updated SPL.', 'OK', {duration: 3000});
        this.goBack();
      },
      error: err => this.snackBar.open('Failed to update SPL. ' + err, 'OK')
    });
  }
}
