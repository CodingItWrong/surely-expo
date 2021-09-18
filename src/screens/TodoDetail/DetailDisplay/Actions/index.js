import React, {useState} from 'react';
import Default from './Default';
import Defer from './Defer';

const BUTTON_SET = {
  DEFAULT: 'DEFAULT',
  DEFER: 'DEFER',
};

export default function Actions({todo, onUpdate, onGoBack}) {
  const [buttonSet, setButtonSet] = useState(BUTTON_SET.DEFAULT);

  switch (buttonSet) {
    case BUTTON_SET.DEFAULT:
      return (
        <Default
          todo={todo}
          onUpdate={onUpdate}
          onGoBack={onGoBack}
          onDefer={() => setButtonSet(BUTTON_SET.DEFER)}
        />
      );
    case BUTTON_SET.DEFER:
      return (
        <Defer
          todo={todo}
          onUpdate={onUpdate}
          onCancel={() => setButtonSet(BUTTON_SET.DEFAULT)}
          onComplete={onGoBack}
        />
      );
    default:
      throw new Error('unreachable');
  }
}
