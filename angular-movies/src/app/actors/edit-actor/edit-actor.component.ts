import { actorCreationDto } from './../actors.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  //temporary raw data
  model: actorCreationDto = {name: 'Tom Holland', dateOfBirth: new Date()}

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      // alert(params.id);
    })
  }

  saveChanges(actorCreationDto: actorCreationDto) {
    console.log(actorCreationDto);
  }

}
