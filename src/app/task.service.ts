import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';  // Mock API URL

  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new task
  addTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  // Update task status
  updateTask(task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }

  // Delete task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
