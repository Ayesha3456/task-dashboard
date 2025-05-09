import { Component } from '@angular/core';
import { TaskBoardComponent } from "./task-board/task-board.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [TaskBoardComponent]
})
export class AppComponent {
  title = 'Task Management Dashboard';
}
