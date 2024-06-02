import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { ISection } from '../../models/section';
import { IndividualEventService } from '../../services/individual-event.service';
import { IIndividualEvent } from '../../models/individualEvent';
import { ImagesService } from '../../services/images.service';
import { KeycloakOperationService } from '../../services/keycloak.service';
import { EMPTY } from 'rxjs';
import { SportService } from '../../services/sport.service';
import { ISport } from '../../models/sport';
import { ICoach } from '../../models/coach';
import { ActivatedRoute } from '@angular/router';
import { get } from 'http';


@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SectionsComponent implements OnInit {
  sections!: ISection[];
  individualEvents!: IIndividualEvent[];

  search = "";
  eventType = "section";
  data: any;

  sports!: ISport[];
  sportId = "";
  sectionSubscription: any;
  sections_test: any;

  previousPage: number | undefined;
  page!: number;
  nextPage: number | undefined;

  limit = 21;

  status = 'all';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sectionService: SectionService,
    private individualEventService: IndividualEventService,
    private sportService: SportService,
    private keycloakService: KeycloakOperationService
  ) {}

  ngOnInit(): void {

    this.getSports();

    this.sectionSubscription = this.route.data.subscribe((data) => {
      console.log(this.route.snapshot.params["page"]);

      this.page = this.route.snapshot.params["page"];
      if (this.page > 1) {
        this.previousPage = Number(this.page) - 1;
      }
      else {
        this.previousPage = undefined;
      }

      this.paginate(this.page);
    })

  }

  paginate(param: string | number) {

    if (param == "prev") {
      this.page = Number(this.page) - 1;
    }
    else if (param == "next") {
      this.page = Number(this.page) + 1;
    }
    else {
      this.page = Number(param);
    }
    console.log(param);
    console.log(this.page);

    if (this.page > 1) {
      this.previousPage = Number(this.page) - 1;
    }
    else {
      this.previousPage = undefined;
    }

    if (this.status == 'all') {
      if (this.eventType == "section") {
        this.sectionService.getSections(this.sportId, this.search, this.limit, this.page).subscribe((any) => {
          this.sections = any.items;
          this.updatePage(any.itemsQuantity, any.itemsOffset, any.totalItems);
        });
      }
      else {
        this.individualEventService.getIndividualEvents("free", this.sportId, this.search, this.limit, this.page).subscribe((any) => {
          this.individualEvents = any.items;
          this.updatePage(any.itemsQuantity, any.itemsOffset, any.totalItems);
        })
      }
    }
    else if (this.status == "my") {
      if (this.eventType == "section") {
        this.sectionService.getUserSections(this.sportId, this.search, this.limit, this.page).subscribe((any) => {
          this.sections = any.items;
          this.updatePage(any.itemsQuantity, any.itemsOffset, any.totalItems);
        });
      }
      else {
        this.individualEventService.getIndividualEvents("my", this.sportId, this.search, this.limit, this.page).subscribe((any) => {
          this.individualEvents = any.items;
          this.updatePage(any.itemsQuantity, any.itemsOffset, any.totalItems);
        })
      }
    }
    
    
  }

  updatePage(itemsQuantity: number, itemsOffset: number, totalItems: number) {
    if (itemsQuantity + itemsOffset < totalItems) {
      this.nextPage = Number(this.page) + 1;
    }
    else {
      this.nextPage = undefined;
    }
  }
 
  getSections() {
    this.sectionService.getSections(this.sportId, this.search, "", 0).subscribe((any) => {
      this.sections = any.items;
    })
  }


  getSports() {
    this.sportService.getSportList().subscribe((any) => {
      this.sports = any.items;
    })
  }


  filterSport(id: string) {
    this.sportId = id;
    this.paginate(1);
  }

  filterType(type: string) {
    this.eventType = type;
    this.paginate(1);
  }

  filterStatus(status: string) {
    this.status = status;
    this.paginate(1);
  }
}
