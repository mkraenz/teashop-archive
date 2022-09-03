import { pick as _pick } from 'lodash';

export const pick = <T extends Record<PropertyKey, unknown>>(
  obj: T,
  keys: (keyof T)[],
) => _pick(obj, keys);
