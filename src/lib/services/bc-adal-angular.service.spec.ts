import { ADAL_OPTIONS } from '../config/adal.options';
import { inject, TestBed } from '@angular/core/testing';

import { AdalService } from './bc-adal-angular.service';

describe('AdalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdalService,
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

  it('should be created', inject([AdalService], (service: AdalService) => {
    expect(service).toBeTruthy();
  }));
});
