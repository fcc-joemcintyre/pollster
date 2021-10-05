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
 * @property {string} label
 * @property {GridSize | boolean=} xs
 * @property {GridSize | boolean=} sm
 * @property {GridSize | boolean=} md
 * @property {GridSize | boolean=} lg
 * @property {GridSize | boolean=} xl
 * @property {string=} info
 * @property {Object[]=} errors
 * @property {React.ChangeEventHandler} onChange
 * @property {React.FocusEventHandler=} onValidate
 * @property {JSX.Element} children
 */

/**
 * Field for an input element
 * @param {Props} param0 Props
 * @returns {JSX.Element} Field
 */
export const FieldSelect = (
  {
    field,
    label,
    xs = 12,
    sm = false,
    md = false,
    lg = false,
    xl = false,
    info,
    errors,
    onChange,
    onValidate = () => { /* no op */ },
    children,
    ...rest
  }
) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
    <TextField
      select
      fullWidth
      {...rest}
      label={label}
      id={field.name}
      name={field.name}
      value={field.value}
      required={field.required}
      error={Boolean (field.error)}
      InputLabelProps={{ shrink: true }}
      helperText={getInfo (true, errors, field.error, true, info)}
      onChange={onChange}
      onBlur={onValidate}
    >
      {children}
    </TextField>
  </Grid>
);
