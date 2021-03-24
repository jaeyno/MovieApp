import { GenresService } from './../genres.service';
import { genreCreationDto, genreDto } from './../genres.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private router: Router, private genresService: GenresService) { }

  model: genreDto;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.genresService.getById(params.id).subscribe(genre => {
        this.model = genre;
      })
    })
  }

  saveChanges(genreCreationDto: genreCreationDto) {
    this.genresService.edit(this.model.id, genreCreationDto).subscribe(() => {
      this.router.navigateByUrl("/genres");
    });
  }

}
