import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  taskData: Task = {
    id: 0,
    title: '',
    description: '',
    status: 'To Do'
  };

  ngOnInit() {
    if (this.task) {
      this.taskData = { ...this.task };
    }
  }

  onSave() {
    this.save.emit(this.taskData);
  }

  onCancel() {
    this.cancel.emit();
  }
}