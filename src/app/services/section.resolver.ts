import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ISection } from '../models/section';
import { EMPTY, catchError } from 'rxjs';
import { SectionService } from './section.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const sectionResolver: ResolveFn<ISection> = (
  route: ActivatedRouteSnapshot
) => {
  const sectionService = inject(SectionService);
  const router = inject(Router);

  return sectionService.getSection(route.params?.['id']).pipe(
    catchError(() => {
      console.log("YA PIDOR")
      return EMPTY;
    })
  );
}