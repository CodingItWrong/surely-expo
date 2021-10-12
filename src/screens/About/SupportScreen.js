import {Linking, ScrollView, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterColumn from '../../components/CenterColumn';
import ScreenBackground from '../../components/ScreenBackground';
import VerticalButtonGroup from '../../components/VerticalButtonGroup';
import sharedStyles from '../../sharedStyles';

export default function SupportScreen() {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={sharedStyles.bodyPadding}>
        <SafeAreaView edges={['left', 'right', 'bottom']}>
          <CenterColumn>
            <Text>You have three options for getting support with Surely:</Text>
            <VerticalButtonGroup>
              <Button
                testID="chat-button"
                mode="contained"
                style={styles.button}
                onPress={() =>
                  Linking.openURL('https://gitter.im/surelytodo/community')
                }
              >
                Chat With the Surely Community
              </Button>
              <Button
                testID="issues-button"
                mode="contained"
                style={styles.button}
                onPress={() =>
                  Linking.openURL(
                    'https://github.com/CodingItWrong/surely-expo/issues',
                  )
                }
              >
                Open a GitHub Issue
              </Button>
              <Button
                testID="email-button"
                mode="contained"
                style={styles.button}
                onPress={() => Linking.openURL('mailto:support@surelytodo.com')}
              >
                Email Support
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
