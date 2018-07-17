import Header from './Header'
import Main from './Main'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import imgAvatar from '../../img/avatar-default.png';

/**
 * Class representing the highest order component. Any user
 * updates in child components should trigger an event in this
 * class so that the current user details can be re-fetched from
 * the contract and propagated to all children that rely on it
 * 
 * @extends React.Component
 */
class App extends Component {

  //#region Constructor
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      account: '',
      error: {},
      accounts: [],
      balance: 0
    }
  }
  //#endregion

  //#region Helper methods
  /**
   * Loads user details from the contract based on the current
   * account (address).
   * 
   * First, the owners mapping is queried using the owner address key. It returns
   * the hash of the username it maps to. This username hash is then used to query
   * the users mapping in the contract to get the details of the user. Once the user
   * details are returned, the state is updated with the details, which triggers a
   * render in this component and all child components.
   * 
   * @returns {null}
   */
  _loadCurrentUser = async () => {
    const accounts =  ["0xEFdE4e6C936c92816B381718AfA75F0414abfb33", "0xB767CB0BCB49c96BaCf11f9adbd55388faA0bE6b", "0x813036e8b5B2D12872135Bbd7C67B29399F346C7"];
    try {
      // get the owner associated with the current defaultAccount
      const usernameHash = "0xc1671a7151e1edce1c1199a5d6db723cf1b0815d5f42c3e782581dde347530d6";

      // get user details from contract
      const user = {
        creationDate:"1531858631",
        description:"this is me",
        owner:"0xB767CB0BCB49c96BaCf11f9adbd55388faA0bE6b",
        picture:"",
        username:"emizzle"
      };

      // update user picture with ipfs url
      user.picture = user.picture.length > 0 ? EmbarkJS.Storage.getUrl(user.picture) : imgAvatar;

      // get current user (default account) balance
      const balance = "5000000000000000000";

      // update state with user details
      return this.setState({ user: user, account: web3.eth.defaultAccount, accounts: accounts, balance: web3.utils.fromWei(balance, 'ether') });
    }
    catch (err) {
      this._onError(err, 'App._loadCurrentUser');
    }
  }

  /**
   * Sets the App state error and redirects the user to the error page
   * 
   * @param {Error} err - error encountered
   */
  _onError(err, source) {
    if(source) err.source = source;
    this.setState({ error: err });
    this.props.history.push('/whoopsie');
  }
  //#endregion

  //#region React lifecycle events
  componentDidMount() {
    EmbarkJS.onReady(() => {
      setTimeout(() => { this._loadCurrentUser(); }, 0);
    });
  }

  render() {
    return (
      <div>
        <Header
          user={this.state.user}
          account={this.state.account}
          accounts={this.state.accounts}
          balance={this.state.balance}
          error={this.state.error}
          onAfterUserUpdate={(e) => this._loadCurrentUser()}
          onError={(err, source) => this._onError(err, source)} />
        <Main
          user={this.state.user}
          account={this.state.account}
          accounts={this.state.accounts}
          error={this.state.error}
          onAfterUserUpdate={(e) => this._loadCurrentUser()}
          onError={(err, source) => this._onError(err, source)} />
      </div>
    );
  }
  //#endregion
}

export default withRouter(App)