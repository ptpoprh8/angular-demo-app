import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, 
        HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {}

   // get all Users
  getUsers(): Observable<any> {
    let api = `${this.endpoint}`;

    return this.http.get(api, { headers: this.headers })
    .pipe(
      map((res: any) => {

        let result: User[] =  res.map((user:any) => {
          const {_id, name, email} = user
          return {_id, name, email}
        })
        
        return result || []
      }),
      catchError(this.handleError)
    )
  }

  // Error Handling
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg); 
  }
}
