import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  imports: [CommonModule]
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<void>();
  @Output() dragStart = new EventEmitter<Task>();

  onEdit() {
    this.edit.emit(this.task);
  }

  onDelete() {
    this.delete.emit();
  }

  onDragStart() {
    this.dragStart.emit(this.task);
  }
}