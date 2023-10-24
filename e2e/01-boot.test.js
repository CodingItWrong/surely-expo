describe('01 - Boot Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the About button in the drawer', async () => {
    await element(by.id('toggle-navigation-button')).tap();
    await expect(element(by.id('about-nav-button'))).toBeVisible();
  });

  // it('should show the Available heading', async () => {
  //   await expect(element(by.text('Available')).atIndex(0)).toBeVisible();
  // });
});
