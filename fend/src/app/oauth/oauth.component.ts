import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  loading:boolean = true;
  private param:any;
  private key:any;
  private token:any;
  private authorize:any;
  formz:FormGroup;
  nullResponse:boolean = true;
  response:any;
  check:boolean = false;

  constructor(private activRoute: ActivatedRoute, private http:HttpClient, private appServ: AppService, private tostr:ToastrService) { }

  ngOnInit(){
    this.activRoute.queryParams.subscribe((response) => {
      console.log(response)
    });
    console.log("Console:" + this.activRoute.snapshot.queryParams);
    this.param = this.activRoute.snapshot.queryParams;
    this.key = {
      code: this.param
    }
    this.http.post("http://localhost:3000/oauth/authenticate", this.key).subscribe((response) => {
      // console.log(response)
      this.loading = false;
      this.response = response
      console.log(this.response.isSuccess)
      this.token = this.response.jwt
      // if(response != null){
      //   this.nullResponse = false;
      // }
      if(this.response.isSuccess===true){
        setTimeout(() => {
          this.tostr.success("You can now create a project");
        }, 2500)
      }
      else{
        setTimeout(() => {
          this.tostr.error("You can now create a project");
        }, 2500)
      }
    })
    this.formz = new FormGroup({
      'project': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    const name = this.formz.value.project;
    console.log(name)
    const headers= new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*').append('token', this.token);
    // return this.httpClient.get(this.baseURL + 'users/' + userName + '/repos', { 'headers': headers })
    this.http.post("http://localhost/3000/auth/create?projectName="+name, {'headers':headers}).subscribe((response) => {
      if(this.response != null){
        this.check = true;
      }
      console.log(response);
    })

  }


}
