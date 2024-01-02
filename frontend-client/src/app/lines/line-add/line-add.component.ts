import {Component} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {Location} from "@angular/common";
import {LineDTO} from "../../services/models/public-transport-api";
import {LineService} from "../../services/line.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-line-add',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './line-add.component.html',
  styleUrl: './line-add.component.scss'
})
export class LineAddComponent {

  constructor(private location: Location, private lineService: LineService, private snackBar: MatSnackBar) {
  }

  handleSubmit(lineForm: NgForm) {
    if (!lineForm.valid) {
      return;
    }

    let lineDto: LineDTO = {
      name: lineForm.value.name,
      identifier: lineForm.value.identifier
    }

    this.lineService.addLine(lineDto).subscribe({
      complete: () => {
        this.snackBar.open('Successfully added line.', 'OK', {duration: 3000});
        this.goBack();
      },
      error: err => this.snackBar.open('Could not add line' + err, 'OK', {duration: 3000})
    })
  }

  goBack() {
    this.location.back();
  }
}
