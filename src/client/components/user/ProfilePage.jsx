import React from 'react';
import { updateProfile } from '../../store/userActions';
import FilteredInput from '../ui/FilteredInput.jsx';

const nameChars = /[A-Za-z -.,]/;

export default class ProfilePage extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = context.store.getState ().user;
    this.state.message = { color: 'black', text: <span>Enter your information</span> };

    this.onSubmit = this.onSubmit.bind (this);
  }

  onSubmit (event) {
    event.preventDefault ();
    this.context.store.dispatch (updateProfile (this.state.name, this.state.email))
    .then (() => {
      this.setState ({ message: { color: 'black', text: <span>&#10004; Profile updated</span> } });
      this.refName.focus ();
    })
    .catch (() => {
      this.setState ({ message: { color: 'red', text: <span>&#10060; Error saving profile information</span> } });
      this.refName.focus ();
    });
  }

  render () {
    return (
      <div className='dialogProfile'>
        <h2>Profile</h2>
        <hr />
        <form onSubmit={this.onSubmit}>
          <div style={{ color: this.state.message.color }}>{this.state.message.text}</div>
          <br />
          <div>
            <label htmlFor='name'>Name</label>
            <FilteredInput
              id='name'
              ref={(ref) => { this.refName = ref; }}
              autoFocus
              type='text'
              value={this.state.name}
              maxLength={40}
              filter={nameChars}
              onChange={(e) => {
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
              maxLength={60}
              autoCapitalize='none'
              autoCorrect='off'
              onChange={(e) => {
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

ProfilePage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
