import { actorDto } from './../actors.model';
import { ActorsService } from './../actors.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {

  actors: actorDto[];
  columnsToDisplay = ['name', 'actions']
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  constructor(private actorService: ActorsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.actorService.get(this.currentPage, this.pageSize).subscribe((response: HttpResponse<actorDto[]>) => {
      this.actors = response.body;
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    })
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  delete(id: number) {
    this.actorService.delete(id).subscribe(() => {
      this.loadData();
    })
  }
}
