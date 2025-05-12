import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';

type TaskStatus = 'todo' | 'in-progress' | 'done';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DragDropModule, HttpClientModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  tasks: Task[] = [];
  taskInput: string = '';
  editingTask: Task | null = null;
  statuses: TaskStatus[] = ['todo', 'in-progress', 'done'];

  ngOnInit() {
    const data = localStorage.getItem('tasks');
    this.tasks = data ? JSON.parse(data) : [];
  }

  getTasks(status: TaskStatus) {
    return this.tasks.filter(task => task.status === status);
  }

  addTask() {
    if (!this.taskInput.trim()) return;

    if (this.editingTask) {
      this.editingTask.content = this.taskInput.trim();
      this.editingTask = null;
    } else {
      const newTask: Task = {
        id: 'task-' + Date.now(),
        content: this.taskInput.trim(),
        status: 'todo'
      };
      this.tasks.push(newTask);
    }

    this.taskInput = '';
    this.updateLocalStorage();
  }

  editTask(task: Task) {
    this.taskInput = task.content;
    this.editingTask = task;
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.updateLocalStorage();
  }

  drop(event: DragEvent, status: Task['status']) {
    event.preventDefault();
    const taskId = event.dataTransfer?.getData('text');
    if (!taskId) return;

    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
      this.updateLocalStorage();
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent, taskId: string) {
    event.dataTransfer?.setData('text', taskId);
  }

  updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
