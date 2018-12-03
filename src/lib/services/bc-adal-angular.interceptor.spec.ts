import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { BcAdalAngularModule } from '../bc-adal-angular.module';
import { BcAdalAngularService } from './bc-adal-angular.service';

const TOKEN = 'MY-TOKEN-TEST';
const RESOURCE_URL = 'http://localhost/test';

class AdalServiceFake {
  static authenticated: string = null;
  static resourceForEndpoint: string = null;

  public get isAuthenticated() {
    return AdalServiceFake.authenticated;
  }

  public getOptions() {
    return {};
  }

  public getResourceForEndpoint(url: string): string | null {
    return AdalServiceFake.resourceForEndpoint;
  }

  public acquireTokenResilient(resource: string) {
    return of(TOKEN);
  }
}

describe(`BcAdalAngularInterceptor`, () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BcAdalAngularModule.forRoot({ clientId: 'test' })
      ],
      providers: [
        {
          provide: BcAdalAngularService,
          useClass: AdalServiceFake
        }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('give request without token when a http request its called then continue with request', fakeAsync(() => {
    AdalServiceFake.resourceForEndpoint = null;
    AdalServiceFake.authenticated = null;

    httpClient.get(RESOURCE_URL).subscribe();
    const httpRequest = httpMock.expectOne(RESOURCE_URL);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  }));

  it('give a token when a http request its called then add an authorization header', fakeAsync(() => {
    AdalServiceFake.resourceForEndpoint = 'resource';
    AdalServiceFake.authenticated = 'true';

    httpClient.get(RESOURCE_URL).subscribe();
    const httpRequest = httpMock.expectOne(RESOURCE_URL);
    const headers = httpRequest.request.headers;

    expect(headers.has('Authorization')).toEqual(true);
    expect(headers.get('Authorization')).toBe('Bearer ' + TOKEN);
  }));
});
