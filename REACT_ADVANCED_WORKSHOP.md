# Effective Detox Testing - React Advanced 2023

[Workshop home page](https://reactnativetesting.io/reactadvanced23/)

If you aren't able to get the project running locally, don't worry—React Native environment setup can be finicky! You will still be able to get the full benefit of the workshop.

## Requirements

Surely and its Detox tests run on iOS.

They should theoretically work on Android as well, but I (Josh) haven't been able to get Expo and Detox to work together locallly. Feel free to give it a try to see if you can get it working.

The following are required:

- Node 16.x or 18.x; note that 19.x and 20.x are not recommended: https://docs.expo.dev/get-started/installation/#requirements
- Xcode 15.x (14.x may also work)
- [Yarn 1.x](https://yarnpkg.com/en/docs/install)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [EAS CLI](https://docs.expo.dev/build/setup/#1-install-the-latest-eas-cli)
- [Cocoapods](https://guides.cocoapods.org/using/getting-started.html#installation)
- [Fastlane](https://docs.fastlane.tools/getting-started/ios/setup/)
- [Detox CLI](https://wix.github.io/Detox/docs/introduction/getting-started/#1-command-line-tools-detox-cli)

## Verifying Expo Works

Before we try to run Surely, it's a good idea to verify your local system's Expo setup by making sure a brand-new Expo project will run.

Follow the instructions on Expo's [Create a project](https://docs.expo.dev/get-started/create-a-project/) page and ensure your new project launches in the iOS Simulator. If you run into trouble, try asking a question on the [Expo Discord](https://chat.expo.dev/) or [Expo forums](https://forums.expo.dev/).

## Running Surely

- Make sure ALL the above Requirements are installed. Some of them if missing will not throw errors until later in the setup process.
- Open the iOS Simulator app and make sure you have a simulator named "iPhone 15" that launches successfully.
- Clone this repo locally: `git clone https://github.com/CodingItWrong/surely-expo.git`
- Install dependencies: `yarn install`
- Run `yarn start:mock` to start Expo with a mocked backend.
- Press `i` to open Surely in the iOS Simulator. Make sure you see the Surely sign in screen.
- When you are finished, you do not need to keep the server running; you can close it by pressing ctrl-C if you like.

## Running Detox

Build the app: (NOTE: you only need to do this when you change the application code. You do not need to rebuild the app when you change tests.)

```
detox build -c ios.sim.release
```

Run the tests:

```
detox test -c ios.sim.release
```

They should pass.

## Reviewing the Tests

Detox tests are stored in the `e2e/` folder.

You can run an individual test by passing its file path to the `detox test` command:

```
detox test -c ios.sim.release e2e/01-boot.test.js
```
