import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CrudServiceService {
  TasksComponent: any;
  constructor() {}

  submitForm(formData) {
    let savedDataToLocalStorage = [];
    let newTask = formData;
    //uzmi taskove iz local storagea i pushaj novi
    let tasksFromStorage = JSON.parse(localStorage.getItem("taskData"));
    //postojeci taskovi
    savedDataToLocalStorage.push(tasksFromStorage);
    //pushanje novog taska
    savedDataToLocalStorage.push(new Tasks(newTask.task_name, newTask.task_desc));
    localStorage.setItem("taskData", JSON.stringify(savedDataToLocalStorage));
  }

  editForm(editTask) {
    let tasksFromStorage = JSON.parse(localStorage.getItem("taskData"));
    let foundIndex = tasksFromStorage.findIndex(x => x.task_id === editTask.task_id);

    tasksFromStorage[foundIndex].task_name = editTask.task_name;
    tasksFromStorage[foundIndex].task_desc = editTask.task_desc;
    tasksFromStorage[foundIndex].task_created = editTask.task_created;
    localStorage.removeItem("taskData");
    localStorage.setItem("taskData", JSON.stringify(tasksFromStorage));
  }

  onDelete(index: number, tasks) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      tasks.splice(index, 1);
      localStorage.setItem("taskData", JSON.stringify(tasks));
    }
  }

  deleteCheckedItem(checkedIndex: any[], tasks: any) {
    for (var i = checkedIndex.length - 1; i >= 0; i--) tasks.splice(checkedIndex[i], 1);
    localStorage.setItem("taskData", JSON.stringify(tasks));
    location.reload();
  }

  clearLocalStorage() {
    localStorage.removeItem("selectedTask");
    localStorage.removeItem("taskData");
    //postavljen reload zato što neki browseri zazaju kod pozivanja direktno iz local storagea,
    //na ovaj nacin osiguram da se u viewu prikaže podatak
    location.reload();
  }
}
export class Tasks {
  constructor(public task_id: number, public task_name: string = "", public task_desc: string = "", public task_created: Date = new Date()) {}
}
