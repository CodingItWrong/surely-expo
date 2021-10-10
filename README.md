# Surely-Expo

Official client for the Surely todo app. An Expo React Native app that builds to both iOS and web.

Backend is <https://api.surelytodo.com>. If you'd like to build the client yourself, you can still use the same backend, or you can set up your own installation of [surely-api](https://github.com/CodingItWrong/surely-api) to point to.

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

### End-to-End Tests (web)

- `yarn start`
- Click "Run in web browser"
- In another terminal, `yarn cypress`

## Release

### iOS

- Increment the `ios.buildNumber` in `app.json`
- Run `expo build:ios` and choose build type "archive"
- Once the build completes, download the built `.ipa` file from the link Expo provides
- Upload the `.ipa` file to TestFlight using the Apple [Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) app.

### Web

```bash
$ expo build:web
```

- Copy the `web-build` folder to somewhere accessible on the public internet
- Configure the web server to route all paths that aren't found on disk to `index.html`; that way links to pages handled by React Navigation will all load up the app

## License

MIT
