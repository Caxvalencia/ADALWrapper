import { APP_CONFIG } from './../config/app.config';
import { inject, TestBed } from '@angular/core/testing';

import { AdalConfigService } from './adal-config.service';
import { AdalService } from './bc-adal-angular.service';

describe('AdalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdalConfigService,
        AdalService,
        {
          provide: APP_CONFIG,
          useValue: {
            clientId: 'xxxxxxx',
            tenantId: 'yyyyyyy',
          }
        }
      ]
    });
  });

  it('should be created', inject([AdalService], (service: AdalService) => {
    expect(service).toBeTruthy();
  }));
});
