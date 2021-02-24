import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppService{

  constructor(private http: HttpClient){}

  onSubmit(projName: string){
    return this.http.post("localhost:3000/auth/create", projName)
  }
}
