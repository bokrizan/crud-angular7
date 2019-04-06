import { Component, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CrudServiceService } from "../crud.service";

@Component({
  selector: "app-edit-modal",
  templateUrl: "./edit-modal.component.html",
  styleUrls: ["./edit-modal.component.css"]
})
export class EditModalComponent {
  @Input() id: number;
  taskForEdit = JSON.parse(localStorage.getItem("selectedTask"));
  formEdit: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private CrudService: CrudServiceService) {
    this.createForm();
  }
  private createForm() {
    this.formEdit = this.formBuilder.group({
      task_id: this.taskForEdit.task_id,
      task_name: this.taskForEdit.task_name,
      task_desc: this.taskForEdit.task_desc,
      task_created: new Date()
    });
  }

  editForm() {
    this.CrudService.editForm(this.formEdit.value);
    this.activeModal.close(this.formEdit.value);
    //postavljen reload zato što neki browseri zazaju kod pozivanja direktno iz local storagea,
    //na ovaj nacin osiguram da se u viewu prikaže podatak
    location.reload();
  }
}
