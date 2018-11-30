import { AdalAccessGuard } from './adal-access.guard';

class MockRouter {
  public navigate(commands: any[], extras?: any) {}
}

describe('AdalAccessGuard', () => {
  describe('canActivate', () => {
    const route: any = { url: 'https://xxx' };

    let adalAccessGuard: AdalAccessGuard;
    let adalService;
    let router;

    it('should return true for a logged in user', () => {
      adalService = { userInfo: true };
      router = new MockRouter();
      adalAccessGuard = new AdalAccessGuard(router, adalService);

      expect(adalAccessGuard.canActivate(route, null)).toEqual(true);
    });

    it('should navigate to home for a logged out user', () => {
      adalService = { userInfo: false };
      router = new MockRouter();
      adalAccessGuard = new AdalAccessGuard(router, adalService);

      const navigationExtras = {
        queryParams: { redirectUrl: route.url }
      };

      spyOn(router, 'navigate');

      expect(adalAccessGuard.canActivate(route, null)).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(
        ['accessdenied'],
        navigationExtras
      );
    });
  });
});
