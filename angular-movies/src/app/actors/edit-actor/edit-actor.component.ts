import { actorCreationDto, actorDto } from './../actors.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  //temporary raw data
  model: actorDto = {name: 'Tom Holland', dateOfBirth: new Date(), picture: 'https://m.media-amazon.com/images/M/MV5BYmY2ZTcxZTgtYzhlNS00NzE0LWIxN2ItMjIxNjEwMDU0ZGM2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX624_CR0,0,624,351_AL_.jpg'}

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
