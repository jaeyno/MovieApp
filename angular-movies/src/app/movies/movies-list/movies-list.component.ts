import { MoviesService } from './../movies.service';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  @Input() movies;

  @Output() onDelete = new EventEmitter<void>();

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {}

  remove(id: number){
    this.moviesService.delete(id).subscribe(() => {
      this.onDelete.emit();
    })
  }
}
