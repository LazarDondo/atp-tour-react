import React from 'react';
import { Field } from 'redux-form';
import './FormInput.css';

class FormInput extends React.Component {

    lostFocus = false;

    onBlur = () => {
       this.lostFocus=true;
    }

    
    renderField = ({ label, input, type, name, className }) => {
        const inputValue = this.props.value;
        return (
            <>
                <label htmlFor={name}>{label}</label>
                <input {...input} value={inputValue} type={type} name={input.name} className={className} onChange={input.onChange} readOnly={this.props.readOnly} />
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
        const { name, type, fieldValidation, label, onChange } = this.props;

        return (
            <div className='form-group'>
                <Field name={name} component={this.renderField} type={type} onChange={onChange}
                    className={'form-control ' + (fieldValidation ? 'is-invalid' : '')} label={label} />
                {this.renderError()}
            </div>
        );
    };
}

export default FormInput;