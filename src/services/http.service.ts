import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  get<T>(endpoint: string) {
    return this.httpClient.get(
      `${this.baseUrl}/api/${endpoint}`
    ) as Observable<T>;
  }

  post<T>(endpoint: string, params: Record<string, unknown>): Observable<T> {
    console.log(params);
    return this.httpClient.post(
      `${this.baseUrl}/api/${endpoint}`,
      params
    ) as Observable<T>;
  }
}
