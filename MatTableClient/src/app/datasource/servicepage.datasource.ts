import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Sample } from '../model/sample';
import { SampleService } from '../service/sample.service';
import { catchError, finalize } from 'rxjs/operators';
import { SamplePage } from '../model/samplePage';
import { MatPaginator } from '@angular/material/paginator';

export class SamplePageDataSource implements DataSource<Sample> {

    numberDocuments: number;
    samplePage: SamplePage;

    private samplesSubject = new BehaviorSubject<Sample[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private sampleService: SampleService,
        public paginator: MatPaginator) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Sample[]> {
        return this.samplesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.samplesSubject.complete();
        this.loadingSubject.complete();
    }

    loadSamples(filter = '', pageIndex = 0, pageSize = 3, sort = '', sortDirection = 'asc') {

        console.log('filter =        ' + filter);
        console.log('pageIndex =     ' + pageIndex);
        console.log('pageSize =      ' + pageSize);
        console.log('sort =          ' + sort);
        console.log('sortDirection = ' + sortDirection);

        let pageSizeOutput = pageSize;
        if (this.paginator && this.paginator.pageSize) {
            pageSizeOutput = this.paginator.pageSize;
        }

        console.log('paginator pageSize = ' + pageSizeOutput);

        this.loadingSubject.next(true);

        this.sampleService.findPage(filter,
            pageIndex, pageSizeOutput, sort, sortDirection).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((data: any) => {
                this.samplePage = data;
                this.samplesSubject.next(this.samplePage.content);
                this.numberDocuments = this.samplePage.totalElements;
        });
    }
}
