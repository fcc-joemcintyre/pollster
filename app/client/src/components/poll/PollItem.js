// @ts-check
import { Grid, Typography } from '@material-ui/core';

/**
  @typedef {Object} Props
  @property {string} text Choice text
  @property {number=} percent Percentage of votes
  @property {React.MouseEventHandler=} onClick onClick handler
  @returns {JSX.Element} Bar component
*/

/**
 * Poll item bar
 * @param {Props} param0 Props
 * @returns {JSX.Element} Bar component
 */
export const PollItem = ({
  text,
  percent = 0,
  onClick = () => { /* no op */ },
}) => (
  <Grid
    container
    justifyContent='space-between'
    onClick={onClick}
    sx={{
      padding: '4px',
      '&:nth-of-type(even)': {
        border: '1px solid #f0f8ff',
        background: `linear-gradient(to right,#b0c4dE ${percent}%, #f0f8ff ${percent}%)`,
      },
      '&:nth-of-type(odd)': {
        border: '1px solid #fffff0',
        background: `linear-gradient(to right,#b0c4dE ${percent}%, #fffff0 ${percent}%)`,
      },
      '&:hover': {
        border: '1px solid #0000f8',
      },
    }}
  >
    <Typography>{text}</Typography>
    <Typography>{percent}%</Typography>
  </Grid>
);
