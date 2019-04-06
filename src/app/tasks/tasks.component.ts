import { Component, OnInit } from "@angular/core";
import { EventEmitterService } from "../event-emitter.service";
import { CrudServiceService, Tasks } from "../crud.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"]
})
export class TasksComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  checked: string[] = [];
  tasks: Tasks[] = [];

  constructor(private CrudService: CrudServiceService, private modalService: NgbModal, private eventEmitterService: EventEmitterService) {
    if (localStorage.getItem("taskData") === null) {
      this.tasks.push(new Tasks(0, "Zadatak 1", "Zadatak 1 opis", new Date("December 11, 2018 03:24:00")));
      this.tasks.push(new Tasks(1, "Zadatak 2", "Zadatak 2 opis", new Date("December 12, 2018 04:24:00")));
      this.tasks.push(new Tasks(2, "Zadatak 3", "Zadatak 3 opis", new Date("December 13, 2018 12:24:00")));
      this.tasks.push(new Tasks(3, "Zadatak 4", "Zadatak 4 opis", new Date("December 14, 2018 16:24:00")));
      this.tasks.push(new Tasks(4, "Zadatak 5", "Zadatak 5 opis", new Date("December 15, 2018 18:24:00")));
      this.tasks.push(new Tasks(5, "Zadatak 6", "Zadatak 6 opis", new Date("December 16, 2018 20:24:00")));
      this.tasks.push(new Tasks(6, "Zadatak 7", "Zadatak 7 opis", new Date("December 17, 2018 22:24:00")));
    } else {
      //kada se doda novi task prebacuje se u local storage tako da se ne gubi odmah na refreshu
      this.getDataFromLocalStorage();
    }
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
      order: [1, "asc"],
      stateSave: true
    };
    // prosljeđivanje funkcije iz child u parent component
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeFirstComponentFunction.subscribe((name: string) => {
        JSON.parse(localStorage.getItem("taskData"));
      });
    }
  }

  //modal
  openFormModal() {
    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.name = "World";
    modalRef.result
      .then(result => {
        this.tasks.push(new Tasks(Math.floor(Math.random() * 200) + 1, result.task_name, result.task_desc, new Date()));
        localStorage.setItem("taskData", JSON.stringify(this.tasks));
      })
      .catch(error => {
        console.log(error);
      });
  }
  //get data from local storage
  getDataFromLocalStorage() {
    let tasksFromStorage = JSON.parse(localStorage.getItem("taskData"));
    for (let entry of tasksFromStorage) {
      this.tasks.push(new Tasks(entry.task_id, entry.task_name, entry.task_desc, entry.task_created));
    }
  }
  // Spremam u array sve checkirane taskove

  getCheckedItem(index: any, event) {
    this.checked.push(index);
  }

  onDelete(index: number) {
    this.CrudService.onDelete(index, this.tasks);
  }

  deleteCheckedItem() {
    if (window.confirm("Are you sure you want to delete this tasks?")) {
      let checkedIndex: any = this.checked;
      this.CrudService.deleteCheckedItem(checkedIndex, this.tasks);
    }
  }

  setTasksToLocalStorage() {
    localStorage.setItem("taskData", JSON.stringify(this.tasks));
  }

  clearLocalStorage() {
    this.CrudService.clearLocalStorage();
  }
}
