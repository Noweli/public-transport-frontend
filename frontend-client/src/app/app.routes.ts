import {Routes} from '@angular/router';
import {LinesListComponent} from "./lines/lines-list/lines-list.component";
import {LineAddComponent} from "./lines/line-add/line-add.component";
import {StopPointsListComponent} from "./stoppoints/stoppoints-list/stoppoints-list.component";
import {StopPointAddComponent} from "./stoppoints/stoppoint-add/stoppoint-add.component";
import {ScheduleListComponent} from "./schedules/schedule-list/schedule-list.component";

export const routes: Routes = [
  {path: 'view/lines', component: LinesListComponent},
  {path: 'add/line', component: LineAddComponent},
  {path: 'edit/line/:id', component: LineAddComponent},
  {path: 'view/stoppoints', component: StopPointsListComponent},
  {path: 'add/stoppoint', component: StopPointAddComponent},
  {path: 'edit/stoppoint/:id', component: StopPointAddComponent},
  {path: 'view/schedules', component: ScheduleListComponent}
];
