import { withMemoryForm } from '../with-memory';
import { withSchema } from '../with-schema';

const withSmartForm = (Component, args) =>
  withMemoryForm(withSchema(Component, args));
export default withSmartForm;
