import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { CreditCard } from '../models/credit-card';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http:HttpClient) {}

  httpOptions={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  errorHandler(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError( ()=> new Error('An error has ocurred, please try again later.') ); 
  }

  getCardsList(): Observable<CreditCard> {
    return this.http
      .get<CreditCard>(environment.baseUrl + '/api/CreditCards')
      .pipe(retry(2), catchError(this.errorHandler));
  }

  getCardById(id: number): Observable<CreditCard> {
    return this.http
      .get<CreditCard>(environment.baseUrl + '/api/CreditCards/' + id)
      .pipe(retry(2), catchError(this.errorHandler));
  }

  addCard(card: any): Observable<CreditCard> {
    return this.http
      .post<CreditCard>(environment.baseUrl + '/api/CreditCards', card, this.httpOptions)
      .pipe(retry(2), catchError(this.errorHandler));
  }

  updateCard(card: any): Observable<CreditCard> {
    return this.http
      .put<CreditCard>(environment.baseUrl + '/api/CreditCards' + '/' + card.id, JSON.stringify(card), this.httpOptions)
      .pipe(retry(2), catchError(this.errorHandler));
  }

  deleteCard(id: number): Observable<CreditCard> {
    return this.http
      .delete<CreditCard>(environment.baseUrl + '/api/CreditCards/' + id)
      .pipe(retry(2), catchError(this.errorHandler));
  }
}

