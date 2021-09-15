import React from 'react';
import {Text} from 'react-native-paper';
import {relativeDate, relativeDatetime} from '../../../utils/time';

function Entry({isPrimary, children}) {
  const style = {fontSize: isPrimary ? 16 : 12};
  return <Text style={style}>{children}</Text>;
}

export default function EventLog({todo}) {
  const isCompleted = !!todo?.attributes['completed-at'];
  const isDeleted = !!todo?.attributes['deleted-at'];
  const isDeferred = !!todo?.attributes['deferred-until'];

  const entries = [];

  if (isDeleted) {
    entries.push(`Deleted ${relativeDatetime(todo.attributes['deleted-at'])}`);
  }
  if (isCompleted) {
    entries.push(
      `Completed ${relativeDatetime(todo.attributes['completed-at'])}`,
    );
  }
  if (isDeferred) {
    entries.push(
      `Deferred until ${relativeDate(todo.attributes['deferred-until'])}`,
    );
  }
  entries.push(`Created ${relativeDate(todo.attributes['created-at'])}`);

  return (
    <>
      {entries.map((entry, i) => (
        <Entry key={entry} isPrimary={i === 0}>
          {entry}
        </Entry>
      ))}
    </>
  );
}
