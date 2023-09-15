describe('04 - Secondary Features Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should allow deferring todos', async () => {
    try {
      await expect(element(by.id('sign-in-button'))).toBeVisible();
    } catch {
      // if already signed in, sign out, to ensure we test sign in flow
      await element(by.id('toggle-navigation-button')).tap();
      await element(by.id('sign-out-button')).tap();
    }

    await element(by.id('sign-in-button')).tap();

    // create
    await element(by.id('new-todo-name')).typeText('Clean office desk');
    await element(by.id('new-todo-name')).tapReturnKey();

    await expect(element(by.text('Clean office desk'))).toBeVisible();

    // defer until tomorrow
    await element(by.text('Clean office desk')).tap();
    await element(by.text('DEFER')).tap();
    await element(by.id('defer-1-day-button')).tap();
    await expect(element(by.text('Clean office desk'))).not.toBeVisible();
    await element(by.id('toggle-navigation-button')).tap();
    await element(by.text('Tomorrow')).tap();
    await expect(element(by.text('Clean office desk'))).toBeVisible();

    // defer until further future
    await element(by.text('Clean office desk')).tap();
    await element(by.text('DEFER')).tap();
    await element(by.id('defer-1-day-button')).tap();
    await expect(element(by.text('Clean office desk'))).not.toBeVisible();
    await element(by.id('toggle-navigation-button')).tap();
    await element(by.text('Future')).tap();
    await expect(element(by.text('Clean office desk'))).toBeVisible();

    // complete
    await element(by.text('Clean office desk')).tap();
    await element(by.text('COMPLETE')).tap();
    await expect(element(by.text('Clean office desk'))).not.toBeVisible();
    await element(by.id('toggle-navigation-button')).tap();
    await element(by.text('Completed')).tap();
    await expect(element(by.text('Clean office desk'))).toBeVisible();
  });
});
