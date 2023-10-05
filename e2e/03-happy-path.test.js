describe('03 - Happy Path Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should allow creating, editing, completing, and deleting todos', async () => {
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

    // edit
    await element(by.text('Clean office desk')).tap();
    await element(by.id('edit-button')).tap();

    await element(by.id('name-field')).typeText(' again');
    await element(by.id('save-button')).multiTap(2); // first tap dismisses keyboard if shown

    await expect(element(by.id('save-button'))).not.toBeVisible();
    await expect(element(by.text('Clean office desk again'))).toBeVisible();

    // complete
    await element(by.text('COMPLETE')).tap();
    await expect(element(by.text('Clean office desk again'))).not.toBeVisible();
    await element(by.id('toggle-navigation-button')).tap();
    await element(by.text('Completed')).tap();
    await expect(element(by.text('Clean office desk again'))).toBeVisible();

    // delete
    await element(by.text('Clean office desk again')).tap();
    await element(by.text('DELETE')).tap();
    await expect(element(by.text('Clean office desk again'))).not.toBeVisible();
    await element(by.id('toggle-navigation-button')).tap();
    await element(by.text('Deleted')).tap();
    await expect(element(by.text('Clean office desk again'))).toBeVisible();
  });
});
