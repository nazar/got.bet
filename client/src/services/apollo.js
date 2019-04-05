import client from 'client';

// eslint-disable-next-line import/prefer-default-export
export function cachedQuery(options) {
  let result = {};

  try {
    result = client
      .readQuery(options);
  } catch (e) {
    // noop
  }

  return result;
}
