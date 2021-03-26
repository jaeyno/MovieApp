import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { SecurityService } from './../security.service';
import { userCredentials, authenticationResponse } from './../security.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors: string[] = [];

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  register(userCredentials: userCredentials) {
    this.errors = [];
    this.securityService.register(userCredentials).subscribe(authenticationResponse => {
      console.log(authenticationResponse);
    }, error => this.errors = parseWebAPIErrors(error));
  }
}
