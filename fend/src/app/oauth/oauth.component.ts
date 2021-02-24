import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';


@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  loading:boolean = true;
  private param:any;
  private key:any;
  formz:FormGroup;
  nullResponse:boolean = true;
  response:any;

  constructor(private activRoute: ActivatedRoute, private http:HttpClient, private appServ: AppService) { }

  ngOnInit(){
    this.activRoute.queryParams.subscribe((response) => {
      console.log(response)
    });
    console.log("Console:" + this.activRoute.snapshot.queryParams);
    this.param = this.activRoute.snapshot.queryParams;
    this.key = {
      code: this.param
    }
    this.http.post("localhost:3000/oauth/authenticate", this.key).subscribe((response) => {
      console.log(response)
      this.loading = false;
    })
    this.formz = new FormGroup({
      'project': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    const name = this.formz.value.project;
    console.log(name);
    this.formz.reset();
    this.appServ.onSubmit(name).subscribe((response) => {
      console.log(response);
      this.response = response
      if(response != null){
        this.nullResponse = false;
      }
    })
  }


}
