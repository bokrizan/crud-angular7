import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { TasksComponent } from "./tasks/tasks.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "tasks",
    component: TasksComponent
  },
  {
    path: "edit/:id",
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
