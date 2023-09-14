describe('02 - Play Around Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show todos', async () => {
    try {
      await expect(element(by.id('sign-in-button'))).toBeVisible();
    } catch {
      // if already signed in, sign out, to ensure we test sign in flow
      await element(by.id('toggle-navigation-button')).tap();
      await element(by.id('sign-out-button')).tap();
    }

    await element(by.id('sign-in-button')).tap();
    await expect(
      element(by.text('You have no available todos. Nice work!')),
    ).toBeVisible();
    await element(by.id('new-todo-name')).typeText('Clean office desk');
    await element(by.id('new-todo-name')).tapReturnKey();

    await expect(element(by.text('Clean office desk'))).toBeVisible();

    await element(by.text('Clean office desk')).tap();
    await element(by.id('edit-button')).tap();

    await element(by.id('name-field')).typeText(' again');
    await element(by.id('save-button')).tap();

    await expect(element(by.id('save-button'))).not.toBeVisible();
    await expect(element(by.text('Clean office desk again'))).toBeVisible();
  });
});
