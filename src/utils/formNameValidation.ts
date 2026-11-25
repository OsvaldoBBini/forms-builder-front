export const FORM_NAME_MIN_LENGTH = 2;
export const FORM_NAME_MAX_LENGTH = 20;

export function isValidFormName(formName: string) {
  const length = formName.trim().length;
  return length >= FORM_NAME_MIN_LENGTH && length <= FORM_NAME_MAX_LENGTH;
}
