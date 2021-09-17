import React, {useState} from 'react';
import Default from './Default';
import Defer from './Defer';

const BUTTON_SET = {
  DEFAULT: 'DEFAULT',
  DEFER: 'DEFER',
  DEFER_UNTIL_DATE: 'DEFER_UNTIL_DATE',
};

export default function Actions(props) {
  const [buttonSet, setButtonSet] = useState(BUTTON_SET.DEFAULT);

  switch (buttonSet) {
    case BUTTON_SET.DEFAULT:
      return (
        <Default {...props} onDefer={() => setButtonSet(BUTTON_SET.DEFER)} />
      );
    case BUTTON_SET.DEFER:
      return (
        <Defer
          {...props}
          onCancel={() => setButtonSet(BUTTON_SET.DEFAULT)}
          onComplete={() => setButtonSet(BUTTON_SET.DEFAULT)}
        />
      );
    default:
      throw new Error('unreachable');
  }
}
