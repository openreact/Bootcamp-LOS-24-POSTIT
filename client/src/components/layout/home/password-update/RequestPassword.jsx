/* eslint-disable no-useless-escape */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainHeader
	from '../MainHeader.jsx';
import Icon from '../../../../images/postit-icon.png';
import {
	InputField,
	Button, Form,
	Footer, ErrorAlert
} from '../../../commonViews';
import { onRequestPassword } from '../../../../actions';
/**
 *
 * @class RequestPassword
 *
 * @extends {React.Component}
 */
export class RequestPassword extends React.Component {
	/**
	 * Creates an instance of RequestPassword.
	 *
	 * @param {props} props - class properties
	 *
	 * @memberof RequestPassword
	 */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      email: ''
    };
    this.onFocus = this.onFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequestPassword = this.handleRequestPassword.bind(this);
  }
  /**
   * onFocus()
   * This method is called when the user focuses on an input field,
   * which clear any error messages afterwards.
   *
   * @memberof RequestPassword
	 *
   * @returns {void}
   */
  onFocus() {
    this.setState({ errorMessage: '' });
  }
	/**
	 * handleChange(event)
   * This method ahndle state changes on an onChange event
	 *
   * @param {object} event - events object parameter
	 *
   * @return {object} newState
   */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
	/**
	 * handleRequestPassword
	 * This method is called when a user hits
	 * the request password button
	 *
	 * @param {any} event
	 *
	 * @memberof RequestPassword
	 *
	 * @returns {*} - New State object and actions
	 */
  handleRequestPassword(event) {
    event.preventDefault();
    let { email } = this.state;
    const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    email = email.trim();
    if (email === '') {
      this.setState({
        errorMessage: 'Error: Email is required'
      });
    } else if (!emailRE.test(email)) {
      this.setState({
        errorMessage:
				'Error: Enter a valid email address'
      });
    } else {
      this.props.onRequestPassword({ email });
    }
  }
	/**
	 * @returns {jsx} jsx for RequestPassword
	 *
	 * @memberof RequestPassword
	 */
  render() {
    const { loader } = this.props;
    const { email } = this.state;
    return (
			<div>
				<MainHeader />
				<section className="container">
					<Form
						id="auth-form"
						onSubmit={this.handleRequestPassword}
					>
						<a href="/#">
							<img className="form-logo" src={Icon} alt="postit-icon" />
						</a>
						<p className="form-brief">Request for a new password:</p>
						<InputField
							inputClass="input-field"
							onFocus={this.onFocus}
							type="text"
							id="email"
							placeholder="Enter your postit associated email"
							label="Email"
							value={email}
							onChange={this.handleChange}
						/>
						{
							this.state.errorMessage === '' ? '' :
								<ErrorAlert
									errorMessage=
									{this.state.errorMessage}
								/>
						}
						<Button
							id="request-password"
							type="submit"
							btnClass="btn btn-login"
							disabled={loader}
							name=
							{
								loader ?
									'sending...' :
									'Send reset link'
							}
						/>
					</Form>
				</section>
				<Footer />
			</div>
    );
  }
}

RequestPassword.propTypes = {
  onRequestPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loader: state.changePassword.passwordRequestIsLoading
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ onRequestPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequestPassword);
