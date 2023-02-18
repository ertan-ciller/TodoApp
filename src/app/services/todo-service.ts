import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoAdd } from '../models/todo-add';
import { map } from 'rxjs';
import { TodoUpdate } from '../models/todo-update';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient, @Inject('BASE_API_URL') private baseUrl:string) { }


  getAll(){
    return this.http.get<Todo[]>(`${this.baseUrl}/api/Todos`)
  }
  get(id:number){
    return this.http.get<Todo>(`${this.baseUrl}/api/Todos/${id}`)
  }
  add(todo:TodoAdd){
    return this.http.post<Response>(`${this.baseUrl}/api/Todos`,todo,{observe:'response'}).pipe(map((res)=>res.status==201))
  }
  delete(id:number){
    return this.http.delete<Response>(`${this.baseUrl}/api/Todos/${id}`,{observe:'response'}).pipe(map((res)=>res.status==204))
  }
  update(todo:TodoUpdate){
    return this.http.put<Response>(`${this.baseUrl}/api/Todos/${todo.id}`,todo,{observe:'response'}).pipe(map((res)=>res.status==204))
  }

  isCompleted(id:number){
    return this.http.put<Response>(`${this.baseUrl}/api/Todos/isCompleted/${id}`,{},{observe:'response'}).pipe(map((res)=>res.status==204))

  }

}
