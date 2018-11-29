import { ADAL_OPTIONS } from '../config/adal.options';
import { inject, TestBed } from '@angular/core/testing';

import { BcAdalAngularService } from './bc-adal-angular.service';

describe('BcAdalAngularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BcAdalAngularService,
        {
          provide: ADAL_OPTIONS,
          useValue: {
            clientId: '<MY CLIENT ID>',
            redirectUri: window.location.origin
          }
        }
      ]
    });
  });

  it('should be created', inject([BcAdalAngularService], (service: BcAdalAngularService) => {
    expect(service).toBeTruthy();
  }));
});
