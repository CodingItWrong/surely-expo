# Surely-Expo

A client for the Surely todo app written in Expo, targeting iOS and web.

## Requirements

- [Yarn](https://yarnpkg.com/en/docs/install)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Installation

```bash
$ yarn install
```

## Running

```bash
$ yarn start
```

Then click "Run on Android device/emulator", "Run on iOS simulator", or "Run in web browser"

## Testing

### Linting

```bash
$ yarn lint
```

### Unit Tests

```bash
$ yarn test
```

## Release

### iOS

```bash
$ expo build:ios
```

- Download the built `.ipa` file from the link Expo provides
- Upload the `.ipa` file to TestFlight using the Apple [Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) app.

### Web

```bash
$ expo build:web
```

- Copy the `web-build` folder to somewhere accessible on the public internet
- Configure the web server to route all paths that aren't found on disk to `index.html`; that way links to pages handled by React Navigation will all load up the app
