// @ts-check
/**
 * Get info text associated with a field
 * @param {boolean} showErrors Flag to show errors or not
 * @param {Object} errors Object with error properties
 * @param {string} error Error index
 * @param {boolean} showInfo Flag to show info or not
 * @param {string=} info Field info
 * @returns {string | undefined} Info text
 */
export function getInfo (showErrors, errors, error, showInfo, info) {
  if (showErrors && error) {
    if (error === 'required') {
      return 'Required';
    } else {
      return (errors && errors[error]) ? errors[error] : 'Invalid content';
    }
  }
  return showInfo ? info : undefined;
}
