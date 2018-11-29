import { TestBed } from '@angular/core/testing';

import { BcAdalAngularModule } from './bc-adal-angular.module';
import { AdalService } from './services/bc-adal-angular.service';

describe(`FeatureModule.forRoot()`, () => {
  const adalOptions = {
    clientId: '<MY CLIENT ID>'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BcAdalAngularModule.forRoot(adalOptions)]
    });
  });

  it(`should provide services`, () => {
    expect(TestBed.get(AdalService)).toBeTruthy();
  });

  it(`should provide a single instance for 'AdalService' and 'AdalOptions' injection tokens`, () => {
    const adalService: AdalService = TestBed.get(AdalService);

    // both should be same instance
    expect(adalService.getOptions()).toEqual(adalOptions);
  });
});
