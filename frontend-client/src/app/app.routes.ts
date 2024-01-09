import {Routes} from '@angular/router';
import {LinesListComponent} from "./lines/lines-list/lines-list.component";
import {LineAddComponent} from "./lines/line-add/line-add.component";
import {StopPointsListComponent} from "./stoppoints/stoppoints-list/stoppoints-list.component";
import {StopPointAddComponent} from "./stoppoints/stoppoint-add/stoppoint-add.component";
import {ScheduleListComponent} from "./schedules/schedule-list/schedule-list.component";
import {ScheduleAddComponent} from "./schedules/schedule-add/schedule-add.component";
import {SplListComponent} from "./spl/spl-list/spl-list.component";
import {SplAddComponent} from "./spl/spl-add/spl-add.component";
import {ScheduleAttachSplComponent} from "./schedules/schedule-attach-spl/schedule-attach-spl.component";

export const routes: Routes = [
  {path: 'view/lines', component: LinesListComponent},
  {path: 'add/line', component: LineAddComponent},
  {path: 'edit/line/:id', component: LineAddComponent},
  {path: 'view/stoppoints', component: StopPointsListComponent},
  {path: 'add/stoppoint', component: StopPointAddComponent},
  {path: 'edit/stoppoint/:id', component: StopPointAddComponent},
  {path: 'view/schedules', component: ScheduleListComponent},
  {path: 'add/schedule', component: ScheduleAddComponent},
  {path: 'edit/schedule/:id', component: ScheduleAddComponent},
  {path: 'edit/schedule/:id/attachspl', component: ScheduleAttachSplComponent},
  {path: 'view/spl', component: SplListComponent},
  {path: 'add/spl', component: SplAddComponent},
  {path: 'edit/spl/:id', component: SplAddComponent}
];
