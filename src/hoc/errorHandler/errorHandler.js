import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const errorHandler = ( WrappedComponent, axios ) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <React.Fragment>
                <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    }
}

export default errorHandler;
