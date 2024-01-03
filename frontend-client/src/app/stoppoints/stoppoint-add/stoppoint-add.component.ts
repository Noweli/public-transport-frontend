import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Location} from "@angular/common";
import {StopPointService} from "../../services/stoppoint.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StopPoint, StopPointDTO} from "../../services/models/public-transport-api";

@Component({
  selector: 'app-stoppoint-add',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './stoppoint-add.component.html',
  styleUrl: './stoppoint-add.component.scss'
})
export class StopPointAddComponent implements OnInit {
  private id: number = null!;
  protected isEditMode: boolean = false;

  @ViewChild('stopPointForm') stopPointForm: NgForm = null!;

  constructor(private location: Location,
              private spService: StopPointService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.id = +params['id'];
        this.initializeForm();
      }
    });
  }

  handleSubmit(stopPointForm: NgForm): void {
    if (this.isEditMode) {
      this.updateLine(stopPointForm);
      return;
    }

    this.addLine(stopPointForm);
  }

  goBack(): void {
    this.location.back();
  }

  private updateLine(stopPointForm: NgForm): void {
    let dto: StopPointDTO = this.performCheckAndPrepareDto(stopPointForm);

    if (!dto) {
      return;
    }

    this.spService.updateStopPoint(this.id, dto).subscribe({
      complete: () => {
        this.snackBar.open('Successfully updated stop point.', 'OK', {duration: 3000});
        this.goBack();
      },
      error: err => this.snackBar.open(`Could not update stop point. ${err}`, 'OK')
    });
  }

  private addLine(stopPointForm: NgForm): void {
    let dto: StopPointDTO = this.performCheckAndPrepareDto(stopPointForm);

    if (!dto) {
      return;
    }

    this.spService.addStopPoint(dto).subscribe({
      complete: () => {
        this.snackBar.open('Successfully added stop point.', 'OK', {duration: 3000});
        this.goBack();
      },
      error: err => this.snackBar.open(`Could not add stop point. ${err}`, 'OK')
    });
  }

  private performCheckAndPrepareDto(stopPointForm: NgForm): StopPointDTO {
    if (!stopPointForm.valid) {
      return null!;
    }

    if ((!stopPointForm.value.lat || !stopPointForm.value.long) && !stopPointForm.value.streetName) {
      this.snackBar.open('Please provide either latitude and longitude or street name', 'OK');
      return null!;
    }

    return {
      name: stopPointForm.value.name,
      identifier: stopPointForm.value.identifier,
      lat: stopPointForm.value.lat,
      long: stopPointForm.value.long,
      streetName: stopPointForm.value.streetName
    };
  }

  private initializeForm(): void {
    if (!this.isEditMode) {
      return;
    }

    this.spService.getStopPoint(this.id).subscribe({
      next: value => {
        let stopPoint: StopPoint = value.data!;
        this.stopPointForm.setValue({
          name: stopPoint.name,
          identifier: stopPoint.identifier,
          lat: stopPoint.lat,
          long: stopPoint.long,
          streetName: stopPoint.streetName
        });
      },
      error: err => this.snackBar.open('Could not initialize form. ' + err, 'OK')
    });
  }
}
