// @ts-check
import { Grid, TextField } from '@mui/material';
import { getInfo } from './util';

/**
 * @typedef { import ('@material-ui/core').GridSize } GridSize
 * @typedef { import ('@cygns/use-fields').Field } Field
 */

/**
 * @typedef {Object} Props
 * @property {Field} field
 * @property {string=} type
 * @property {string} label
 * @property {GridSize | boolean=} xs
 * @property {GridSize | boolean=} sm
 * @property {GridSize | boolean=} md
 * @property {GridSize | boolean=} lg
 * @property {GridSize | boolean=} xl
 * @property {number=} maxLength
 * @property {string=} info
 * @property {Object<string, any>=} errors
 * @property {React.ChangeEventHandler} onChange
 * @property {React.FocusEventHandler=} onValidate
 * @property {boolean=} autoFocus
 * @property {string=} autoComplete
 * @property {string=} autoCapitalize
 * @property {string=} autoCorrect
*/

/**
 * Field for an input element
 * @param {Props} param0 Props
 * @returns {JSX.Element} Field
 */
export const FieldTextInput = (
  {
    field,
    type = 'text',
    label,
    xs = 12,
    sm = false,
    md = false,
    lg = false,
    xl = false,
    maxLength,
    info,
    errors,
    onChange,
    onValidate = () => { /* no op */ },
    autoFocus = false,
    autoComplete = undefined,
    autoCapitalize = undefined,
    autoCorrect = undefined,
    ...rest
  }
) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
    <TextField
      fullWidth
      {...rest}
      type={type}
      label={label}
      id={field.name}
      name={field.name}
      value={field.value}
      required={field.required}
      error={Boolean (field.error)}
      inputProps={maxLength ? { maxLength } : {}}
      InputLabelProps={{ shrink: true }}
      helperText={getInfo (true, errors, field.error, true, info)}
      onChange={onChange}
      onBlur={onValidate}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
    />
  </Grid>
);
