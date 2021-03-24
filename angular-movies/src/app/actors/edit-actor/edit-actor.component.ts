import { ActorsService } from './../actors.service';
import { actorCreationDto, actorDto } from './../actors.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  //temporary raw data
  model: actorDto;

  constructor(private activateRoute: ActivatedRoute, private actorsService: ActorsService, private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.actorsService.getById(params.id).subscribe(actor => this.model = actor);
    })
  }

  saveChanges(actorCreationDto: actorCreationDto) {
    this.actorsService.edit(this.model.id, actorCreationDto).subscribe(() => {
      this.router.navigate(['/actors']);
    })
  }

}
