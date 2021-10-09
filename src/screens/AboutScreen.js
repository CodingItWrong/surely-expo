import Constants from 'expo-constants';
import {
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterColumn from '../components/CenterColumn';
import ScreenBackground from '../components/ScreenBackground';
import sharedStyles from '../sharedStyles';

const SURELY_URL = 'https://surelytodo.com';
const IS_IOS = Platform.OS === 'ios';
const IS_WEB = Platform.OS === 'web';

export default function AboutScreen() {
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
                mode="outlined"
                style={styles.button}
                onPress={() => Linking.openURL('mailto:support@surelytodo.com')}
              >
                Email Support
              </Button>
              {IS_IOS && (
                <Button
                  mode="outlined"
                  style={styles.button}
                  onPress={() => Share.share({url: SURELY_URL})}
                >
                  Share Surely
                </Button>
              )}
              <Button
                mode="outlined"
                style={styles.button}
                onPress={() =>
                  Linking.openURL(
                    'https://github.com/codingitwrong/surely-expo',
                  )
                }
              >
                Source Available via GitHub
              </Button>
              {!IS_WEB && (
                <Button
                  mode="outlined"
                  style={styles.button}
                  onPress={() => Linking.openURL(SURELY_URL)}
                >
                  Surely Web
                </Button>
              )}
              <Button
                mode="outlined"
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
            <Text style={styles.paragraph}>
              The MIT License (MIT) Copyright
            </Text>
            <Text style={styles.paragraph}>© 2021 Josh Justice</Text>
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
});
