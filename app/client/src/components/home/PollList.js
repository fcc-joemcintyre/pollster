// @ts-check
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

/**
  @typedef { import ('../../types/types').Poll} Poll

  @typedef {Object} Props
  @property {Poll[]} polls
*/

/**
 * List of polls
 * @param {Props} param0 Props
 * @returns {JSX.Element} React component
 */
export const PollList = ({ polls }) => {
  const history = useHistory ();
  return (
    <List component='nav' aria-label='polls'>
      { polls.map ((a) => (
        <ListItem
          key={a.key}
          button
          onClick={() => { history.push (`/polls/${a.key}`); }}
        >
          <ListItemText
            primary={a.title}
            secondary={`${a.choices.reduce ((acc, b) => acc + b.votes, 0)} votes`}
          />
        </ListItem>
      ))}
    </List>
  );
};
