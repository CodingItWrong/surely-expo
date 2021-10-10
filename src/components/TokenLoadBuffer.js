import {useToken} from '../data/token';

export default function TokenLoadBuffer({children}) {
  const {isTokenLoaded} = useToken();
  if (!isTokenLoaded) {
    return null;
  } else {
    return children;
  }
}
