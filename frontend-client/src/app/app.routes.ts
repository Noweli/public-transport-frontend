import {Routes} from '@angular/router';
import {LinesListComponent} from "./lines/lines-list/lines-list.component";
import {LineAddComponent} from "./lines/line-add/line-add.component";

export const routes: Routes = [
  {path: 'view/lines', component: LinesListComponent},
  {path: 'add/line', component: LineAddComponent},
  {path: 'edit/line/:id', component: LineAddComponent}
];
