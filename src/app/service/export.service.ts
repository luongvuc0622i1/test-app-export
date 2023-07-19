import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/enviroment';
import { ReqBody } from '../model/req-body';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class ExportService {

  constructor(private http: HttpClient) { }

  generateReport(reqBody: ReqBody) {
    return this.http.post(API_URL + `/generate-report`, reqBody);
  }

  getAll() {
    return this.http.get(API_URL + `/list-report`);
  }
}
