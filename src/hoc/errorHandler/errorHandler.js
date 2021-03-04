import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const errorHandler = ( WrappedComponent ) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler();
        return (
            <React.Fragment>
                <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error ? (`${error.status}: ${error.statusText}`) : null}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    }
}

export default errorHandler;
