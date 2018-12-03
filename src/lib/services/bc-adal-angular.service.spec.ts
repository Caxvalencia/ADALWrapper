import { inject, TestBed } from '@angular/core/testing';
import * as AuthenticationContext from 'adal-angular';

import { ADAL_OPTIONS, AdalOptions } from './../config/adal.options';
import { BcAdalAngularService } from './bc-adal-angular.service';

const RESOURCE = '2a08d337-651b-4b31-a45c-1afedfa93935';
const IDTOKEN_MOCK =
  // tslint:disable-next-line:max-line-length
  'eyJ0XAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVUa0d0S1JrZ2FpZXpFWTJFc0xDMmdPTGpBNCJ9.eyJhdWQiOiJlOWE1YThiNi04YWY3LTQ3MTktOTgyMS0wZGVlZjI1NWY2OGUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLXBwZS5uZXQvNTJkNGIwNzItOTQ3MC00OWZiLTg3MjEtYmMzYTFjOTkxMmExLyIsImlhdCI6MTQxMTk1OTAwMCwibmJmIjoxNDExOTU5MDAwLCJleHAiOjE0MTE5NjI5MDAsInZlciI6IjEuMCIsInRpZCI6IjUyZDRiMDcyLTk0NzAtNDlmYi04NzIxLWJjM2ExYzk5MTJhMSIsImFtciI6WyJwd2QiXSwib2lkIjoiZmEzYzVmYTctN2Q5OC00Zjk3LWJmYzQtZGJkM2E0YTAyNDMxIiwidXBuIjoidXNlckBvYXV0aGltcGxpY2l0LmNjc2N0cC5uZXQiLCJ1bmlxdWVfbmFtZSI6InVzZXJAb2F1dGhpbXBsaWNpdC5jY3NjdHAubmV0Iiwic3ViIjoiWTdUbXhFY09IUzI0NGFHa3RjbWpicnNrdk5tU1I4WHo5XzZmbVc2NXloZyIsImZhbWlseV9uYW1lIjoiYSIsImdpdmVuX25hbWUiOiJ1c2VyIiwibm9uY2UiOiI4MGZmYTkwYS1jYjc0LTRkMGYtYTRhYy1hZTFmOTNlMzJmZTAiLCJwd2RfZXhwIjoiNTc3OTkxMCIsInB3ZF91cmwiOiJodHRwczovL3BvcnRhbC5taWNyb3NvZnRvbmxpbmUuY29tL0NoYW5nZVBhc3N3b3JkLmFzcHgifQ.WHsl8TH1rQ3dQbRkV0TS6GBVAxzNOpG3nGG6mpEBCwAOCbyW6qRsSoo4qq8I5IGyerDf2cvcS-zzatHEROpRC9dcpwkRm6ta5dFZuouFyZ_QiYVKSMwfzEC_FI-6p7eT8gY6FbV51bp-Ah_WKJqEmaXv-lqjIpgsMGeWDgZRlB9cPODXosBq-PEk0q27Be-_A-KefQacJuWTX2eEhECLyuAu-ETVJb7s19jQrs_LJXz_ISib4DdTKPa7XTBDJlVGdCI18ctB67XwGmGi8MevkeKqFI8dkykTxeJ0MXMmEQbE6Fw-gxmP7uJYbZ61Jqwsw24zMDMeXatk2VWMBPCuhA';
let STORAGE_CONSTANTS: AuthenticationContext.Constants['STORAGE'];


class TestConfig {
  static init(): any {
    sessionStorage.clear();

    const expirationKey = Math.round(new Date().getTime() / 1000.0) + 3600;

    const dataInSessionStorage = {
      [STORAGE_CONSTANTS.ACCESS_TOKEN_KEY + RESOURCE]: IDTOKEN_MOCK,
      [STORAGE_CONSTANTS.EXPIRATION_KEY + RESOURCE]: expirationKey,
      [STORAGE_CONSTANTS.IDTOKEN]: IDTOKEN_MOCK,
      [STORAGE_CONSTANTS.TOKEN_KEYS]: RESOURCE + '|'
      // 'adal.login.request': 'http://localhost:4200/#/',
      // 'adal.nonce.idtoken': '80ffa90a-cb74-4d0f-a4ac-ae1f93e32fe0',
      // 'adal.session.state': '451c6916-27cf-4eae-81cd-accf96126398',
      // 'adal.state.login': 'eafdf3b2-6605-4244-98e7-023a5d0e4d1a',
      // ['adal.token.renew.status' + RESOURCE]: 'Completed'
    };

    for (const item in dataInSessionStorage) {
      if (!dataInSessionStorage.hasOwnProperty(item)) {
        continue;
      }

      sessionStorage.setItem(item, dataInSessionStorage[item] as any);
    }
  }
}

describe('BcAdalAngularService', () => {
  let adalService: BcAdalAngularService;
  const adalOptions: AdalOptions = {
    tenant: 'testtenant',
    clientId: RESOURCE
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BcAdalAngularService,
        { provide: ADAL_OPTIONS, useValue: adalOptions }
      ]
    });

    adalService = TestBed.get(BcAdalAngularService);
    STORAGE_CONSTANTS = adalService.authContext.CONSTANTS.STORAGE;

    TestConfig.init();
  });

  it('should be created', inject(
    [BcAdalAngularService],
    (service: BcAdalAngularService) => {
      expect(service).toBeTruthy();
      expect(service.authContext).toBeTruthy();
    }
  ));

  it('should get options and storage data', () => {
    expect(adalService.getOptions()).toEqual(adalOptions);
    expect(adalService.userInfo).toBe(null);
    expect(adalService.accessToken).toBe(IDTOKEN_MOCK);
    expect(adalService.isAuthenticated).toBeFalsy();
    expect(adalService.getResourceForEndpoint('http://localhost')).toBe(null);
  });
});
