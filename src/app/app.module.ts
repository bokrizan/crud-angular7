import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { EventEmitterService } from "./event-emitter.service";

import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { TasksComponent } from "./tasks/tasks.component";
import { FormModalComponent } from "./modal/modal.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditComponent } from "./edit/edit.component";
import { EditModalComponent } from "./edit-modal/edit-modal.component";
import { SlimLoadingBarModule } from "ng2-slim-loading-bar";

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, TasksComponent, FormModalComponent, EditComponent, EditModalComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule.forRoot(), FormsModule, DataTablesModule, ReactiveFormsModule, SlimLoadingBarModule],
  providers: [EventEmitterService],
  bootstrap: [AppComponent],
  entryComponents: [FormModalComponent, EditModalComponent]
})
export class AppModule {}
