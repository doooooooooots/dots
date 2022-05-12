import { default as context } from 'src/schemas/schemas';

const list = Object.keys(context);

const forms = list.reduce(
  (acc, singular) => ({
    ...acc,
    [singular]: createForm(context.storage.form),
  }),
  {}
);

export default forms;
