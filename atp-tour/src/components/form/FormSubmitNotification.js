import './FormSubmitNotification.css';

const FormSubmitNotification = (props) => {
    const { successCondition, errorCondition, successMessage, errorMessage } = props;

    const renderNotification = () => {
        if (successCondition) {
            return (
                <div id="notificationMessageDiv" className='alert alert-success'>{successMessage}</div>
            );
        }
        if (errorCondition) {
            return (
                <div id="notificationMessageDiv" className='alert alert-danger'>{errorMessage}</div>
            );
        }
    }

    return renderNotification();
}

export default FormSubmitNotification;