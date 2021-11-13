import {Button, Text} from '@codingitwrong/react-native-paper';
import * as StoreReview from 'expo-store-review';
import {Linking, Platform, ScrollView, Share, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterColumn from '../../components/CenterColumn';
import ScreenBackground from '../../components/ScreenBackground';
import VerticalButtonGroup from '../../components/VerticalButtonGroup';
import {APP_STORE_URL} from '../../constants';
import sharedStyles from '../../sharedStyles';

const SURELY_URL = 'https://surelytodo.com';
const IS_WEB = Platform.OS === 'web';
const IS_SHARE_SUPPORTED = !IS_WEB || Boolean(navigator.share);

export default function ThanksScreen() {
  function handleShare() {
    if (IS_SHARE_SUPPORTED) {
      Share.share({url: SURELY_URL});
    } else {
      Linking.openURL(SURELY_URL);
    }
  }

  async function handleReview() {
    if (await StoreReview.hasAction()) {
      StoreReview.requestReview();
    } else {
      Linking.openURL(APP_STORE_URL);
    }
  }

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={sharedStyles.bodyPadding}>
        <SafeAreaView edges={['left', 'right', 'bottom']}>
          <CenterColumn>
            <Text>
              Surely is free (at least until the unlikely event that it gets too
              popular for me to pay for the server). If you like my work, here
              are some ways you can say thank you:
            </Text>
            <VerticalButtonGroup>
              <Button
                mode="contained"
                style={styles.button}
                onPress={handleShare}
              >
                Share with Friends
              </Button>
              {!IS_WEB && (
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleReview}
                >
                  Rate or Review the App
                </Button>
              )}
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => Linking.openURL('https://codingitwrong.com')}
              >
                Follow Me
              </Button>
            </VerticalButtonGroup>
          </CenterColumn>
        </SafeAreaView>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
});
