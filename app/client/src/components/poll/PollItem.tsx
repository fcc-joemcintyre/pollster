import { Grid, Typography } from '@mui/material';

type Props = {
  text: string,
  percent?: number,
  onClick?: React.MouseEventHandler,
}

/**
 * Poll item bar
 * @param Props
 * @returns Bar component
 */
export const PollItem = ({
  text,
  percent = 0,
  onClick = () => { /* no op */ },
}: Props) => (
  <Grid
    container
    justifyContent='space-between'
    onClick={onClick}
    sx={{
      padding: '4px',
      '&:nth-of-type(even)': {
        border: '1px solid #ddf2fa',
        background: `linear-gradient(to right,#b0c4dE ${percent}%, #ddf2fa ${percent}%)`,
      },
      '&:nth-of-type(odd)': {
        border: '1px solid #cae5ef',
        background: `linear-gradient(to right,#b0c4dE ${percent}%, #cae5ef ${percent}%)`,
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
