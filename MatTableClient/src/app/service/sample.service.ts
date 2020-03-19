import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Sample } from '../model/sample';
import { SamplePage } from '../model/samplePage';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  private rootUrl: string;
  private rootUrl2: string;

  constructor(private http: HttpClient) {
    this.rootUrl = 'http://localhost:8080/api/sample/page?';
    this.rootUrl2 = 'http://localhost:8080/api/sample/page';
  }

  public getSamples(page: number, size: number, sort: string): Observable<SamplePage> {
    let url = this.rootUrl;
    url = url + '&page=' + page + '&size=' + size + '&sort=' + sort;
    return this.http.get<SamplePage>(url)
    .pipe(
      map(response => {
        const data = response;
        console.log(data.content);
        return data ;
      })
    );
  }

  public findSamples(filter: string, page: number, size: number, sort: string, sortOrder: string): Observable<Sample[]> {
    return this.http.get<SamplePage>(this.rootUrl2, {
      params: new HttpParams()
        .set('filter', filter)
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sort', sort)
        .set('sortOrder', sortOrder)
    }).pipe(
      map(response => {
        const data = response.content;
        return data;
      })
    );
  }

  public findPage(filter: string, pageIndex: number, size: number, sort: string, sortOrder: string): Observable<SamplePage> {
    return this.http.get<SamplePage>(this.rootUrl2, {
      params: new HttpParams()
        .set('filter', filter)
        .set('pageIndex', pageIndex.toString())
        .set('size', size.toString())
        .set('sort', sort)
        .set('sortOrder', sortOrder)
    }).pipe(
      map(response => {
        const data = response;
        return data;
      })
    );
  }

}
