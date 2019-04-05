import _ from 'lodash';
import { UserInputError } from 'apollo-server';

// eslint-disable-next-line import/prefer-default-export
export function emptyObjectChecker(object, exceptionText = 'Object not found') {
  if (_.isEmpty(object)) {
    throw UserInputError(exceptionText);
  }
}
