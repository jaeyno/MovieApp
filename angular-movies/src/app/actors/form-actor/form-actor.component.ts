import { actorCreationDto } from './../actors.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.css']
})
export class FormActorComponent implements OnInit {

  @Input() model: actorCreationDto;
  @Output() onSaveChanges: EventEmitter<actorCreationDto> = new EventEmitter<actorCreationDto> ();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {validators: [Validators.required]}],
      dateOfBirth: ''
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model)
    }
  }

  saveChanges() {
    this.onSaveChanges.emit(this.form.value);
  }

}
