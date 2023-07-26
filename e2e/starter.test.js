describe('App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the hello message', async () => {
    await expect(element(by.id('hello'))).toBeVisible();
  });
});
