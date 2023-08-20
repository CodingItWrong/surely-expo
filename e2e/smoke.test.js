describe('Smoke Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the login form', async () => {
    await expect(element(by.id('email-field'))).toBeVisible();
  });
});
