import {Linking, ScrollView, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterColumn from '../../components/CenterColumn';
import ScreenBackground from '../../components/ScreenBackground';
import sharedStyles from '../../sharedStyles';

export default function PrivacyScreen() {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={sharedStyles.bodyPadding}>
        <SafeAreaView edges={['left', 'right', 'bottom']}>
          <CenterColumn>
            <Text style={styles.paragraph}>
              Good news: I'm not trying to make Surely into a business, so
              there's no temptation for me to do anything with your personal
              data.
            </Text>
            <Text style={styles.paragraph}>
              The only data Surely collects is the data you save into the app,
              for the purposes of letting you use the app. Surely doesn't use
              any analytics, tracking, or data brokering of any kind.
            </Text>
            <Text style={styles.paragraph}>
              If users start experiencing crashes I may add a crash reporting
              system that collects data. If I do, I'll ensure it is configured
              to collect minimal data and store it for a minimal time, and I'll
              report the details here.
            </Text>
            <Text style={styles.paragraph}>
              The Surely app and backend are both open source, so if you'd like
              to be safer, you can build one or both of them yourself:
            </Text>
            <Button
              style={styles.button}
              onPress={() =>
                Linking.openURL('https://github.com/codingitwrong/surely-expo')
              }
            >
              Source Available via GitHub
            </Button>
          </CenterColumn>
        </SafeAreaView>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 10,
  },
});
