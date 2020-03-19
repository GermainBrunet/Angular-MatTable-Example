import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Sample } from '../model/sample';
import { SampleService } from '../service/sample.service';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { SamplePageDataSource } from '../dataSource/servicepage.dataSource';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, AfterViewInit {

  sampleDataSource: SamplePageDataSource;
  displayedColumns: string[] = ['id', 'name', 'value'];
  dataSource: SamplePageDataSource;
  sortedData: Sample[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private sampleService: SampleService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource = new SamplePageDataSource(this.sampleService, this.paginator);
      this.dataSource.loadSamples('', 0, 5, 'id', 'asc');
    });
  }

  ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;

                    this.loadSamplePage();
                })
            )
            .subscribe();

        this.paginator.page.pipe(tap(() => {
          this.loadSamplePage();
        })).subscribe();

        this.sort.sortChange.pipe(tap(() => {
          this.loadSamplePage();
        })).subscribe();
    }

    loadSamplePage() {
        this.dataSource.loadSamples(
            this.input.nativeElement.value,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction);
    }

}
