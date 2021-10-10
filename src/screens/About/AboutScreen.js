import {useLinkTo} from '@react-navigation/native';
import Constants from 'expo-constants';
import {
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Divider, Text, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterColumn from '../../components/CenterColumn';
import ScreenBackground from '../../components/ScreenBackground';
import sharedStyles from '../../sharedStyles';

const SURELY_URL = 'https://surelytodo.com';
const IS_WEB = Platform.OS === 'web';

export default function AboutScreen() {
  const linkTo = useLinkTo();
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={sharedStyles.bodyContainer}>
        <SafeAreaView edges={['left', 'right', 'bottom']}>
          <CenterColumn>
            <Title style={styles.title}>
              Surely {Constants.manifest.version}{' '}
              {Constants.platform.ios
                ? `(${Constants.platform.ios.buildNumber})`
                : ''}
            </Title>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                onPress={() => Linking.openURL('https://codingitwrong.com')}
              >
                Made by CodingItWrong
              </Button>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => linkTo('/about/support')}
              >
                Support
              </Button>
              {!IS_WEB && (
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={() => Share.share({url: SURELY_URL})}
                >
                  Share Surely
                </Button>
              )}
              {!IS_WEB && (
                <Button
                  style={styles.button}
                  onPress={() => Linking.openURL(SURELY_URL)}
                >
                  Surely Web
                </Button>
              )}
              <Button
                style={styles.button}
                onPress={() => linkTo('/about/privacy')}
              >
                Privacy Policy
              </Button>
              <Button
                style={styles.button}
                onPress={() =>
                  Linking.openURL(
                    'https://github.com/codingitwrong/surely-expo',
                  )
                }
              >
                Source Available via GitHub
              </Button>
              <Button
                style={styles.button}
                onPress={() =>
                  Linking.openURL(
                    'https://thenounproject.com/search/?q=checkmark&i=1758124',
                  )
                }
              >
                Checkmark icon by Scott Dunlap
              </Button>
            </View>
            <Text>
              Special thanks to the creators of the following open source
              software that made this app possible: Babel, Cypress, Doorkeeper,
              Expo, JSONAPI::Resources, Postgres, React Native Paper, React
              Native Web, React Navigation, RSpec, Ruby.
            </Text>
            <Divider style={styles.divider} />
            <Text style={styles.paragraph}>
              The MIT License (MIT) Copyright
            </Text>
            <Text style={styles.paragraph}>© 2021 NeedBee, LLC</Text>
            <Text style={styles.paragraph}>
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the “Software”), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </Text>
            <Text style={styles.paragraph}>
              The above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.
            </Text>
            <Text style={styles.paragraph}>
              THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </Text>
          </CenterColumn>
        </SafeAreaView>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 10,
  },
  divider: {
    marginVertical: 20,
  },
});
