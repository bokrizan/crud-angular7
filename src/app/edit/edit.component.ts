import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CrudServiceService } from "../crud.service";
import { EditModalComponent } from "../edit-modal/edit-modal.component";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  taskovi: any[] = [];
  getTasks: any[] = [];
  title: string;
  id: number;
  index: number;
  private sub: any;
  selectedTask: [] = [];

  constructor(private CrudService: CrudServiceService, private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params["id"]; // (+) converts string 'id' to a number

      this.getTasks = JSON.parse(localStorage.getItem("taskData"));
      this.taskovi = this.getTasks.find(x => x.task_id === this.id);
      localStorage.removeItem("selectedTask");
      localStorage.setItem("selectedTask", JSON.stringify(this.taskovi));
      //index za delete
      this.index = this.getTasks.indexOf(this.taskovi);
    });
  }

  //modal
  openEditModal() {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.result.catch(error => {
      console.log(error);
    });
  }

  onDelete() {
    this.CrudService.onDelete(this.index, this.getTasks);
    this.router.navigate(["tasks"]);
  }

  clearLocalStorage() {
    localStorage.removeItem("selectedTask");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
