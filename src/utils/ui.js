export const groupsToSections = groups =>
  groups.map(({name, todos}) => ({title: name, data: todos}));
