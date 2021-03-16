import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-actors-autocomplete',
  templateUrl: './actors-autocomplete.component.html',
  styleUrls: ['./actors-autocomplete.component.css']
})
export class ActorsAutocompleteComponent implements OnInit {

  control: FormControl = new FormControl();

  //temporary raw data
  actors = [
    {name: 'Tom Holland', picture: 'https://m.media-amazon.com/images/M/MV5BYmY2ZTcxZTgtYzhlNS00NzE0LWIxN2ItMjIxNjEwMDU0ZGM2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX624_CR0,0,624,351_AL_.jpg'},
    {name: 'Tom Hanks', picture: 'https://m.media-amazon.com/images/M/MV5BYzVkM2Y3MTMtNDNhZS00MThjLWI3MWMtMzQ5NTFkNzcwMTVkXkEyXkFqcGdeQWFybm8@._V1_SY351_SX624_AL_.jpg'},
    {name: 'Samuel Jackson', picture: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UX214_CR0,0,214,317_AL_.jpg'},
  ]

  selectedActors = [];

  originalActors = this.actors;

  columnsToDisplay = ['picture', 'name', 'character', 'actions']

  @ViewChild(MatTable) table: MatTable<any>;

  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => {
      this.actors = this.originalActors;
      this.actors = this.actors.filter(actor => actor.name.indexOf(value) !== -1)
    })
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.selectedActors.push(event.option.value);
    this.control.patchValue('');

    if(this.table !== undefined) {
      this.table.renderRows();
    }
  }

  remove(actor) {
    const index = this.selectedActors.findIndex(a => a.name === actor.name);
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }

}
