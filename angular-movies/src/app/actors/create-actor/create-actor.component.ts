import { Router } from '@angular/router';
import { ActorsService } from './../actors.service';
import { actorCreationDto } from './../actors.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  constructor(private actorsService: ActorsService, private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(actorCreationDto: actorCreationDto) {
    this.actorsService.create(actorCreationDto).subscribe(() => {
      this.router.navigate(['/actors']);
    })
  }
}
