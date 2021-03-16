import { movieDto } from './../movies.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  @Output() onSaveChanges = new EventEmitter<movieDto>();
  @Input() model: movieDto
  form: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', {validators: [Validators.required]}],
      summary: '',
      inTheaters: false,
      trailer: '',
      releaseDate: '',
      poster: ''
    })

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onImageSelected(file: File) {
    this.form.get('poster').setValue(file);
  }

  changeMarkdown(content: string) {
    this.form.get('summary').setValue(content);
  }

  saveChange() {
    this.onSaveChanges.emit(this.form.value);
  }

}
