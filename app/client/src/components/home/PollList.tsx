import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import { Poll } from '../../data/usePolls.js';

type Props = {
  polls: Poll[];
};

/**
 * List of polls
 * @param Props
 * @returns React component
 */
export const PollList = ({ polls }: Props) => {
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
