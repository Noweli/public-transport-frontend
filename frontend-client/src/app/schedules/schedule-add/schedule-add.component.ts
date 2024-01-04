import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from "@angular/common";
import {ScheduleHelper} from "../../helpers/schedule-helper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

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
    MatNativeDateModule
  ],
  templateUrl: './schedule-add.component.html',
  styleUrl: './schedule-add.component.scss'
})
export class ScheduleAddComponent implements OnInit {
  private isEditMode: boolean = false;
  private id: number = null!;
  protected recipeForm: FormGroup = null!;
  protected readonly ScheduleHelper = ScheduleHelper;

  constructor() {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      isRecurring: new FormControl(false),
      recurringDays: this.getDaysFormArray(),
      date: new FormControl(),
      time: new FormControl()
    });
  }

  private getDaysFormArray(): FormArray {
    let formArray: FormArray = new FormArray<any>([]);
    for (let i = 0; i < ScheduleHelper.dayMap.size; i++) {
      formArray.push(new FormControl(false))
    }

    return formArray;
  }
}
