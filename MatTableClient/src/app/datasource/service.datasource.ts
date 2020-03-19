import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {Sample} from '../model/sample';
import {SampleService} from '../service/sample.service';
import {catchError, finalize} from "rxjs/operators";

export class SampleDataSource implements DataSource<Sample> {

    numberDocuments: number;
    private samplesSubject = new BehaviorSubject<Sample[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private sampleService: SampleService) {}

    connect(collectionViewer: CollectionViewer): Observable<Sample[]> {
        return this.samplesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.samplesSubject.complete();
        this.loadingSubject.complete();
    }

    loadSamples(filter = '', pageIndex = 0, pageSize = 5, sort = '', sortDirection = 'asc') {

        console.log('filter =        ' + filter);
        console.log('pageIndex =     ' + pageIndex);
        console.log('pageSize =      ' + pageSize);
        console.log('sort =          ' + sort);
        console.log('sortDirection = ' + sortDirection);

        this.loadingSubject.next(true);

        this.sampleService.findSamples(filter, 
            pageIndex, pageSize, sort, sortDirection).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(
            result => {
                this.samplesSubject.next(result);
            });
    }
}
