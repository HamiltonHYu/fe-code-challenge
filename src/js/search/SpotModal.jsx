import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

const formatCents = cents => (
    (cents / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
);

const SpotModal = ({
    title,
    price,
    description,
    closeModal,
}) => {
    const [isModalClosing, setIsModalClosing] = useState(false);
    const history = useHistory();
    const formattedPrice = formatCents(price);
    const handleCheckout = () => history.push('/checkout');

    const handleClose = () => {
        setIsModalClosing(true);
    };

    if (isModalClosing) {
        setTimeout(closeModal, 1000);
    }

    return (
        <div className="spot-modal-container">
            <div
                className={isModalClosing ? 'spot-modal-close' : 'spot-modal'}
            >
                <button
                    onClick={handleClose}
                    className="modal-close-button"
                >
                    X
                </button>
                <div className="spot-details-header">
                    <h3>Spot Details</h3>
                </div>
                <div className="spot-details-title">{title}</div>
                <div>{description}</div>
                <div className="confirm-button-container">
                    <button onClick={handleCheckout} >
                        {formattedPrice} | Book it!
                    </button>
                </div>
            </div>
        </div>
    );
};

SpotModal.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default SpotModal;
