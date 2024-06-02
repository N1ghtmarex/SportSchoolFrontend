import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { IIndividualEvent } from '../models/individualEvent';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { IndividualEventService } from './individual-event.service';

export const individualEventResolver: ResolveFn<IIndividualEvent> = (
    route: ActivatedRouteSnapshot
) => {
    const individualEventService = inject(IndividualEventService);
    const router = inject(Router);

    return individualEventService.getIndividualEvent(route.params?.['id']).pipe(
        catchError(() => {
            router.navigate(["sections"]);
            return EMPTY;
        })
    )
}
