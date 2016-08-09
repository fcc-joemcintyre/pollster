import React from 'react';
import { withRouter } from 'react-router';
import { updateProfile } from '../store/actions';
import FilteredInput from '../../ui/FilteredInput.jsx';

const nameChars = /[A-Za-z -.,]/;

class ProfilePage extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = context.store.getState ().user;
    this.state.error = null;

    this.onSubmit = this.onSubmit.bind (this);
  }

  onSubmit (event) {
    event.preventDefault ();
    this.context.store.dispatch (updateProfile (this.state.name, this.state.email))
    .then (() => {
      this.props.router.push ('/');
    })
    .catch (() => {
      this.setState ({ error: 'Error saving profile information' });
    });
  }

  render () {
    return (
      <div className='dialogProfile'>
        <h2>Profile</h2>
        <hr />
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <FilteredInput
              id='name'
              autoFocus
              type='text'
              value={this.state.name}
              maxLength={20}
              filter={nameChars}
              onChange={e => {
                this.setState ({ name: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor='email'>email</label>
            <input
              id='email'
              type='text'
              value={this.state.email}
              maxLength={20}
              autoCapitalize='none'
              autoCorrect='off'
              onChange={e => {
                this.setState ({ email: e.target.value });
              }}
            />
          </div>
          <button className='dialogButton'>Save</button>
        </form>
      </div>
    );
  }
}

export default withRouter (ProfilePage);

ProfilePage.propTypes = {
  router: React.PropTypes.object.isRequired,
};

ProfilePage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
