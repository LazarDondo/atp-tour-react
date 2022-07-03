import React from 'react';
import { Field } from 'redux-form';
import './FormInput.css';

class FormInput extends React.Component {

    renderField = ({ label, input, type, name, className }) => {
        return (
            <>
                <label htmlFor={name}>{label}</label>
                <input {...input} value={input.value} type={type} name={name} className={className} />
            </>
        );
    }

    renderError = () => {
        const { isSubmitted, errorMessage } = this.props;
        if (isSubmitted && errorMessage) {
            return (
                <p id="errorMessage">{errorMessage}</p>
            );
        }
    }

    render() {
        const { name, type, fieldValidation, label } = this.props;
        return (
            <div className='form-group'>
                <Field name={name} component={this.renderField} type={type}
                    className={'form-control ' + (fieldValidation ? 'is-invalid' : '')} label={label} />
                {this.renderError()}
            </div>
        );
    };
}

export default FormInput;