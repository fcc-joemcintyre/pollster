import { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo (0, 0);
    }
  }

  render () {
    return this.props.children;
  }
}

export default withRouter (ScrollToTop);

ScrollToTop.propTypes = {
  location: PropTypes.shape ({}).isRequired,
  children: PropTypes.node.isRequired,
};