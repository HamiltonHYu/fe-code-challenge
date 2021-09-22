import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {purchase} from '../spot/spot-actions';
import Image from '../common/Image';

const EMAIL_ERROR = 'Please enter valid email';
const PHONE_ERROR = 'Please enter valid phone number';

const ERROR_STYLING = {
    border: '1px solid red',
};

const ERROR_LABEL_STYLING = {
    color: 'red',
    fontWeight: 600,
};

const Checkout = props => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [emailErrors, setEmailErrors] = useState('');
    const [phoneErrors, setPhoneErrors] = useState('');
    const history = useHistory();

    const checkEmail = () => {
        if (!email) {
            return false;
        }

        const emailParts = email.split('@');
        const [firstPart, secondPart] = emailParts;

        if (emailParts.length !== 2 || !firstPart || !secondPart) {
            return false;
        }

        const [domain, suffix] = secondPart.split('.');

        if (!domain || !suffix) {
            return false;
        }

        return true;
    };

    const checkPhone = () => {
        const phoneNum = Number(phone);

        if (phone.length !== 10) {
            return false;
        } else if (phoneNum % 1) {
            return false;
        }

        return true;
    };

    const handlePhoneInput = e => {
        const newPhone = e.target.value;

        setPhone(newPhone);
    };

    const handleEmailInput = e => {
        const newEmail = e.target.value;

        setEmail(newEmail);
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        setEmailErrors('');
        setPhoneErrors('');

        const isEmailValid = checkEmail();
        const isValidPhone = checkPhone();

        if (isEmailValid && isValidPhone) {
            props.purchase(email);
            history.push('/confirmation');
        } else {
            if (!isEmailValid) {
                setEmailErrors(EMAIL_ERROR);
            }

            if (!isValidPhone) {
                setPhoneErrors(PHONE_ERROR);
            }
        }
    };

    const handleBackToSearch = () => {
        history.push('/');
    };

    return (
        <div className="Checkout-container">
            <div className="checkout">
                <div className="back-button-checkout">
                    <button onClick={handleBackToSearch}>
                        &#60; Back to search
                    </button>
                </div>
                <div className="checkout-spot">
                    <Image src={props.selectedSpot.image} />
                    <span>
                        <div>{props.selectedSpot.title}</div>
                        <div>{props.selectedSpot.distance}</div>
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input
                        type="text"
                        required
                    />
                    <label>Last Name</label>
                    <input
                        type="text"
                        required
                    />
                    <label style={emailErrors ? ERROR_LABEL_STYLING : null}>Email</label>
                    <input
                        id="email"
                        type="text"
                        onChange={handleEmailInput}
                        required
                        style={emailErrors ? ERROR_STYLING : null}
                    />
                    {emailErrors && (<div className="input-error">{emailErrors}</div>)}
                    <label style={phoneErrors ? ERROR_LABEL_STYLING : null}>Phone Number</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={handlePhoneInput}
                        style={phoneErrors ? ERROR_STYLING : null}
                        required
                    />
                    {phoneErrors && (<div className="input-error">{phoneErrors}</div>)}
                    <input
                        type="submit"
                        className="checkout-submit"
                        value={`Purchase for ${(props.selectedSpot.price / 100).toFixed(2)}`}
                    />
                </form>
            </div>
        </div>
    );
};

Checkout.propTypes = {
    selectedSpot: PropTypes.object,
    purchase: PropTypes.func,
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    purchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
