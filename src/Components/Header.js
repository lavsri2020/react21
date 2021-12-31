import React from 'react';
import '../Styles/Header.css';
import GoogleLogin from 'react-google-login';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedInUser: undefined
        }
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name, loginModalIsOpen: false });
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUser: undefined });
    }
    onCloseModal = () => {
        this.setState({ sign: false });
    };

    render() {
        const { loginModalIsOpen, loggedInUser, isLoggedIn,sign } = this.state;
        return (
            <div>
                <div class="header">
                    <div class="header-logo">
                        <b>e!</b>
                    </div>
                    {!isLoggedIn ?
                        <div class="user-group">
                            <div class="login" onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</div>
                            <div class="signup">Create an account</div>
                        </div>
                        : <div class="user-group">
                            <div class="login">{loggedInUser}</div>
                            <div class="signup" onClick={this.handleLogout}>Logout</div>
                        </div>}
                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div class="fas fa-backspace" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                        <GoogleLogin
                            clientId="844323774685-ihhapidcqgvkp00boistsqneo99t05pt.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <br />
                        <button class="btn btn-light">Continue with Credentials</button>
                    </div>
                </Modal>
                <Modal open={sign} onClose={this.onCloseModal}>
                    <div className="modal-body">
                        <h2>Get Started Absolutely<span> Free!</span></h2>
                        <span className="subtitle">No credit card needed</span>
                        <form className="contact-form form-validate3" novalidate="novalidate">
                            <div className="form-group">
                                <input className="form-control" type="text" name="name" id="name" placeholder="First Name" required="" autocomplete="off" aria-required="true" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="email" name="email" placeholder="E-mail" required="" autocomplete="off" aria-required="true" />
                            </div>
                            <div className="form-group">
                                <input type="password" name="pass" className="form-control" placeholder="Password" required="" autocomplete="off" aria-required="true" />
                            </div>
                            <input className="btn btn-md btn-primary btn-center" id="sign_up" type="button" value="Sign Up" />
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Header;