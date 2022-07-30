import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const FormDatePicker = ({ input, placeholder, minDate, maxDate, name, label, isSubmitted, errorMessage, dateValue, readOnly }) => {

    if (!input.value && dateValue) {
        input.value = new Date(dateValue);
    }

    const renderError = () => {
        if (isSubmitted && errorMessage) {
            return (
                <p id="errorMessage">{errorMessage}</p>
            );
        }
    }

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <DatePicker
                className="form-control"
                dateFormat="MM/dd/yyyy"
                selected={input.value || null}
                onChange={input.onChange}
                minDate={minDate}
                maxDate={maxDate}
                disabledKeyboardNavigation
                placeholderText={placeholder}
                readOnly={readOnly}
            />
            {renderError()}
        </div>
    );
};

export default FormDatePicker;