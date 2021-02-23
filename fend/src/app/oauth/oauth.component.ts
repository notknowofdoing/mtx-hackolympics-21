import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  private param:any;
  private key:any;

  constructor(private activRoute: ActivatedRoute, private http:HttpClient) { }

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
    })
  }

}
