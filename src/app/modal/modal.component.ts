import { Component, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EventEmitterService } from "../event-emitter.service";
import { CrudServiceService } from "../crud.service";

@Component({
  selector: "app-form-modal",
  templateUrl: "./modal.component.html"
})
export class FormModalComponent {
  @Input() id: number;

  myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private CrudService: CrudServiceService,
    private eventEmitterService: EventEmitterService
  ) {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      task_id: "",
      task_name: "",
      task_desc: "",
      task_created: ""
    });
  }

  submitForm() {
    this.CrudService.submitForm(this.myForm.value);
    this.eventEmitterService.onSaveAddNewTaskButtonClick();
    this.activeModal.close(this.myForm.value);
    //postavljen reload zato što neki browseri zazaju kod pozivanja direktno iz local storagea,
    //na ovaj nacin osiguram da se u viewu prikaže podatak
    location.reload();
  }
}
