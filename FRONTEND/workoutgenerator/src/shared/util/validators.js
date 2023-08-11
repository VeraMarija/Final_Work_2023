/*const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';*/

export const VALIDATOR_REQUIRE = () => ({ type: 'REQUIRE' });
export const VALIDATOR_FILE = () => ({ type: 'FILE' });
export const VALIDATOR_MINLENGTH = val => ({
  type: 'MINLENGTH',
  val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: 'MAXLENGTH',
  val: val
});
export const VALIDATOR_MIN = val => ({ type: 'MIN', val: val });
export const VALIDATOR_MAX = val => ({ type: 'MAX', val: val });
export const VALIDATOR_EMAIL = () => ({ type: 'EMAIL' });

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === 'REQUIRE') {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === 'MINLENGTH') {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === 'MAXLENGTH') {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === 'MIN') {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === 'MAX') {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === 'EMAIL') {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
