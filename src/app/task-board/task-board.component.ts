import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
  imports: [CommonModule, FormsModule, TaskItemComponent, TaskFormComponent]
})
export class TaskBoardComponent implements OnInit {
  statuses: Array<'To Do' | 'In Progress' | 'Done'> = ['To Do', 'In Progress', 'Done'];
  tasks: Task[] = [];
  draggedTask: Task | null = null;
  editingTask?: Task;
  showForm = false;

  constructor(private modalService: NgbModal, private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  onDragStart(task: Task) {
    this.draggedTask = task;
  }

  onDrop(status: 'To Do' | 'In Progress' | 'Done') {
    if (this.draggedTask) {
      const updatedTask = { ...this.draggedTask, status };
      this.taskService.updateTask(updatedTask).subscribe(() => {
        this.loadTasks();
      });
      this.draggedTask = null;
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  openNewTaskForm(content: any) {
    this.editingTask = undefined;
    this.showForm = true;
    this.modalService.open(content, { size: 'lg' });
  }

  editTask(task: Task, content: any) {
    this.editingTask = { ...task };
    this.showForm = true;
    this.modalService.open(content, { size: 'lg' });
  }

  saveTask(task: Task) {
    if (task.id === 0) {
      this.taskService.addTask(task).subscribe(() => {
        this.loadTasks();
      });
    } else {
      this.taskService.updateTask(task).subscribe(() => {
        this.loadTasks();
      });
    }

    this.showForm = false;
    this.modalService.dismissAll();
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  cancelForm() {
    this.showForm = false;
    this.modalService.dismissAll();
  }

  getTasksByStatus(status: 'To Do' | 'In Progress' | 'Done') {
    return this.tasks.filter(task => task.status === status);
  }
}
