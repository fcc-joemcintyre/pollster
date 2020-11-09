import PropTypes from 'prop-types';
import { Text } from 'uikit';

export const Loading = ({ message }) => (
  <Text center>{message}</Text>
);

Loading.propTypes = {
  message: PropTypes.string.isRequired,
};
