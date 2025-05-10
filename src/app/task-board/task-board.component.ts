import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
  imports: [DragDropModule, ReactiveFormsModule, CommonModule],
})
export class TaskBoardComponent implements OnInit {
  newTaskForm: FormGroup;
  tasks: Task[] = [];
  editingTask: Task | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService  // Inject TaskService
  ) {
    this.newTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTasks();  // Load tasks on component initialization
  }

  // Fetch tasks from the backend
  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // Add a new task
  addTask() {
    const newTask: Task = {
      id: Date.now(), // Simple ID generator, can be changed to a better solution
      title: this.newTaskForm.value.title,
      description: this.newTaskForm.value.description,
      status: this.newTaskForm.value.status
    };

    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
      this.newTaskForm.reset();  // Reset form after adding task
    });
  }

  // Save edited task
  saveEditedTask() {
    const updatedTask = { ...this.editingTask, ...this.newTaskForm.value };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
      this.editingTask = null;  // Reset editing state
      this.newTaskForm.reset(); // Reset form after saving task
    });
  }

  // Cancel edit
  cancelEdit() {
    this.editingTask = null; // Reset editing state
    this.newTaskForm.reset(); // Reset form
  }

  // Handle drag and drop to update task status
  onDrop(event: CdkDragDrop<Task[]>) {
    const movedTask = event.item.data;
    const newStatus = event.container.id;

    movedTask.status = newStatus as 'To Do' | 'In Progress' | 'Done';

    this.taskService.updateTask(movedTask).subscribe(() => {
      const taskIndex = this.tasks.findIndex(task => task.id === movedTask.id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1); // Remove the task from the array
        this.tasks.push(movedTask); // Add the updated task back to the array
      }
    });
  }

  // Edit an existing task
  editTask(task: Task) {
    this.editingTask = { ...task }; // Clone the task to edit
    this.newTaskForm.patchValue(task); // Populate form with task data
  }

  // Delete a task by ID
  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId); // Remove task by ID
    });
  }

  // Get tasks filtered by their status
  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
}
