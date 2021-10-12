import * as StoreReview from 'expo-store-review';
import {Linking, Platform, ScrollView, Share, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterColumn from '../../components/CenterColumn';
import ScreenBackground from '../../components/ScreenBackground';
import VerticalButtonGroup from '../../components/VerticalButtonGroup';
import sharedStyles from '../../sharedStyles';

const SURELY_URL = 'https://surelytodo.com';
const SURELY_STORE_URL = 'https://apps.apple.com/us/app/surely/id1586633713';
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
      Linking.openURL(SURELY_STORE_URL);
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
                Share Surely on Social Media
              </Button>
              <Button
                mode="contained"
                style={styles.button}
                onPress={handleReview}
              >
                Rate or Review on the App Store
              </Button>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => Linking.openURL('https://codingitwrong.com')}
              >
                Follow my Blog, Videos, or Social Media
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
