import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, MatSidenavModule, MatListModule, MatButtonModule, RouterLinkActive, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
