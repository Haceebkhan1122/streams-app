import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    // initialization of library
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "879274395668-5avkq3qr9qcvoh26bl250tavquap7pt9.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "streamy",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
      console.log(this.auth.currentUser.get().getId(), "Signin >>>>");
    } else {
      this.props.signOut();
      console.log(this.auth.currentUser.get().getId(), "Signout >>>>");
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
    console.log("Sign In with google Successfully");
  };
  onSignOutClick = () => {
    this.auth.signOut();
    console.log("Sign Out Successfully");
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <div className="for_button">
          <button
            className="ui red google button"
            onClick={this.onSignOutClick}
          >
            <i className="google icon" /> Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div className="for_button">
          <button className="ui red google button" onClick={this.onSignInClick}>
            {" "}
            <i className="google icon" /> Sign In with google
          </button>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
