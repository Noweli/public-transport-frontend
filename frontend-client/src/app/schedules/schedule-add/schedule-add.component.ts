import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule, Location} from "@angular/common";
import {ScheduleHelper} from "../../helpers/schedule-helper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {ScheduleEntryDTO} from "../../services/models/public-transport-api";
import {ScheduleService} from "../../services/schedule.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-schedule-add',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  templateUrl: './schedule-add.component.html',
  styleUrl: './schedule-add.component.scss'
})
export class ScheduleAddComponent implements OnInit {
  private id: number = null!;
  protected isEditMode: boolean = false;
  protected scheduleForm: FormGroup = null!;
  protected readonly ScheduleHelper = ScheduleHelper;

  constructor(private scheduleService: ScheduleService,
              private snackBar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.id = +params['id'];
      }
    });
    this.initializeForm();
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateSchedule();
      return;
    }

    this.addSchedule();
  }

  private initializeForm() {
    this.scheduleForm = new FormGroup({
      isRecurring: new FormControl(false),
      recurringDays: this.getDaysFormArray(),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
    });

    if (this.isEditMode) {
      this.initializeEditForm();
      return;
    }
  }

  private initializeEditForm(): void {
    this.scheduleService.getScheduleById(this.id).subscribe({
      next: (result) => {
        const schedule = result.data!;
        const time = this.getTimeFromString(schedule.dateTime!);

        this.scheduleForm = new FormGroup({
          isRecurring: new FormControl(schedule.isRecurring),
          recurringDays: this.initializeDaysForEdit(schedule.recurringDays!),
          date: new FormControl(schedule.dateTime!),
          time: new FormControl(time)
        });
      },
      error: err => {
        this.snackBar.open('Error occurred while fetching schedule. ' + err, 'OK');
        return null!;
      }
    });
  }

  private getDaysFormArray(): FormArray {
    let formArray: FormArray = new FormArray<any>([]);
    for (let i = 0; i < ScheduleHelper.dayMap.size; i++) {
      formArray.push(new FormControl(false))
    }

    return formArray;
  }

  private initializeDaysForEdit(daysString: string): FormArray {
    if (!daysString) {
      return this.getDaysFormArray();
    }

    let formArray: FormArray = new FormArray<any>([]);
    let formObject: { [key: number]: FormControl } = {};
    for (let i = 0; i < ScheduleHelper.dayMap.size; i++) {
      if (daysString.includes(i.toString())) {
        formObject[i] = new FormControl(true);
      } else {
        formObject[i] = new FormControl(false);
      }

      formArray.push(formObject[i]);
    }

    return formArray;
  }

  private addSchedule(): void {
    if (!this.scheduleForm.valid) {
      return;
    }

    const scheduleDto = this.prepareDto();

    this.scheduleService.addSchedule(scheduleDto).subscribe({
        complete: () => {
          this.snackBar.open('Schedule added successfully', 'OK', {duration: 3000});
          this.goBack();
        },
        error: (error) => this.snackBar.open('Failed to add schedule. ' + error, 'OK')
      }
    );
  }

  private updateSchedule(): void {
    if (!this.scheduleForm.valid) {
      return;
    }

    const scheduleDto = this.prepareDto();

    this.scheduleService.updateSchedule(this.id, scheduleDto).subscribe({
        complete: () => {
          this.snackBar.open('Schedule updated successfully', 'OK', {duration: 3000});
          this.goBack();
        },
        error: (error) => this.snackBar.open('Failed to update schedule. ' + error, 'OK')
      }
    );
  }

  private prepareDto(): ScheduleEntryDTO {
    const formValue = this.scheduleForm.value;

    return {
      isRecurring: formValue.isRecurring,
      recurringDays: this.convertDaysCheckboxList(formValue.recurringDays),
      dateTime: this.getDateTime(new Date(formValue.date), formValue.time)
    };
  }

  private convertDaysCheckboxList(input: boolean[]): string {
    return input.map((value: boolean, index: number) => {
      if (value) {
        return index.toString();
      }

      return null;
    }).filter(value => value !== null).join(',');
  }

  private getDateTime(date: Date, time: string): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${time}`;
  }

  private getTimeFromString(input: string): string {
    const dateObject = new Date(input);

    return dateObject.getHours().toString().padStart(2, '0') + ':' +
      dateObject.getMinutes().toString().padStart(2, '0') + ':' +
      dateObject.getSeconds().toString().padStart(2, '0');
  }

  protected goBack() {
    this.location.back();
  }
}
