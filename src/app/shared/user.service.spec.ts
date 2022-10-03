import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './user.service'
import { AuthInterceptorService } from './auth-interceptor.service'
import { Router } from '@angular/router';



describe('UserService', () => {
  
  let userService: UserService;
  let httpMock: HttpTestingController;
  let ENDPOINT: string = 'http://localhost:4000/api';
  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  // let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
        {provide: Router, useValue: routerSpy}
      ],
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });


  it(`should fetch users as an Observable`, (inject([HttpTestingController, UserService],
    (httpClient: HttpTestingController, userService: UserService) => {

      const usersDummy = [
        {
          "_id": 1,
          "name": 'John', 
          "email": 'john@example.com'
        },
        {
          "_id": 2,
          "name": 'Mawar', 
          "email": 'mawar@example.com'
        },
        {
          "_id": 3,
          "name": 'Jenny', 
          "email": 'jenny@example.com'
        }
      ];


      userService.getUsers()
        .subscribe((users: any) => {
          console.log(users);
          expect(users.length).toBe(3);
        });

        
      let req = httpMock.expectOne(ENDPOINT);
      expect(req.request.method).toBe("GET");

      req.flush(usersDummy);// 'resolves' the request, triggering our assertion
      httpMock.verify();

  })));
});
