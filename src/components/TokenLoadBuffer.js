import AppLoading from 'expo-app-loading';
import {useToken} from '../data/token';

export default function TokenLoadBuffer({children}) {
  const {isTokenLoaded} = useToken();
  if (!isTokenLoaded) {
    return <AppLoading />;
  } else {
    return children;
  }
}
