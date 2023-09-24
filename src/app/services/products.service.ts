import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

  getProductsList(): Observable<Product> {
    return this.http
      .get<Product>(environment.baseUrl + '/api/Product')
      .pipe(retry(2), catchError(this.errorHandler));
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .get<Product>(environment.baseUrl + '/api/Product/' + id)
      .pipe(retry(2), catchError(this.errorHandler));
  }

  addProduct(product: any): Observable<Product> {
    return this.http
      .post<Product>(environment.baseUrl + '/api/Product', product, this.httpOptions)
      .pipe(retry(2), catchError(this.errorHandler));
  }

  updateProduct(product: any): Observable<Product> {
    return this.http
      .put<Product>(environment.baseUrl + '/api/Product' + '/' + product.idProduct, JSON.stringify(product), this.httpOptions)
      .pipe(retry(2), catchError(this.errorHandler));
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http
      .delete<Product>(environment.baseUrl + '/api/Product/' + id)
      .pipe(retry(2), catchError(this.errorHandler));
  }
}

