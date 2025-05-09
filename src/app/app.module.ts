import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskService } from './task.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppComponent, TaskBoardComponent, NgbModalModule],
  providers: [TaskService],
  bootstrap: [],
})
export class AppModule {}
