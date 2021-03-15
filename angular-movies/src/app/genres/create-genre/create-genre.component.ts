import { genreCreationDto } from './../genres.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstLetterUppercase } from 'src/app/validators/firstLetterUppercase';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent implements OnInit {

  constructor(private router: Router) { }

  form: FormGroup;

  ngOnInit(): void {}

  saveChanges(genreCreationDto: genreCreationDto) {
      //..save the genre
      console.log(genreCreationDto);
      this.router.navigate(['/genres']);
  }

}
