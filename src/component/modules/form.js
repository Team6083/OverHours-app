import React from 'react'

import { useField } from 'react-form'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/light.css'

export function TextInput({ name, displayName = name, validator, required, type = "text", placeholder = "", inputGroup, disabled = false }) {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField(name, {
        validate: validator ? validator : (value) => {
            if (required && (value === "" || value === undefined || value === null)) {
                return "A " + displayName + " is required";
            }

            return false;
        },
        filterValue: (value) => {
            if (type === "number") {
                return parseFloat(value);
            } else {
                return value;
            }
        }
    });

    let inputProps = getInputProps();
    let { className, style, value } = inputProps;
    delete inputProps.className;
    delete inputProps.style;
    delete inputProps.value;

    value = value ? value : "";
    className += (type !== "checkbox" ? " form-control" : "");
    style = {
        ...style,
        ...(!isValidating && isTouched && error ? { borderColor: "#dc3545" } : {})
    }


    return (
        <>
            <label htmlFor={"edit" + name}>{displayName}</label>
            {
                inputGroup ?
                    <div className="input-group">
                        {
                            inputGroup.prepend ?
                                <div className="input-group-prepend">
                                    {inputGroup.prepend}
                                </div> : null
                        }
                        <input id={"edit" + name} className={className}
                            type={type} style={style} value={value} placeholder={placeholder} disabled={disabled}
                            {...inputProps} />{" "}
                        {isValidating ? (
                            <div className="valid-feedback d-block">Validating...</div>
                        ) : isTouched && error ? (
                            <div className="invalid-feedback d-block">{error}</div>
                        ) : null}
                        {
                            inputGroup.append ?
                                <div className="input-group-append">
                                    {inputGroup.append}
                                </div> : null
                        }
                    </div> :
                    <>
                        <input id={"edit" + name} className={className}
                            type={type} style={style} value={value} placeholder={placeholder} disabled={disabled}
                            {...inputProps} />{" "}
                        {isValidating ? (
                            <div className="valid-feedback d-block">Validating...</div>
                        ) : isTouched && error ? (
                            <div className="invalid-feedback d-block">{error}</div>
                        ) : null}
                    </>
            }
        </>
    );
}

export function EmailInput(props) {
    const { name, displayName = name, required } = props;
    return TextInput({
        ...props, type: "email", validator: (value) => {
            if (required && (value === "" || value === undefined || value === null)) {
                return "A " + displayName + " is required";
            }

            const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //eslint-disable-line
            if (!re.test(value) && typeof value === "string") {
                return value + " This is not a valid email"
            }

            return false;
        }
    });
}

export function Select({ name, displayName = name, validator, required, options = [] }) {

    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField(name, {
        validate: validator ? validator : (value) => {
            if (required && (value === "" || value === undefined || value === null)) {
                return "A " + displayName + " is required";
            }

            return false;
        }
    });

    let { className } = getInputProps();
    className += " form-control";

    return (
        <>
            <label>{displayName}</label>
            <select className={className}  {...getInputProps()}>
                {
                    options.map((v, i) => {
                        return <option key={i} value={v.value}>{v.name}</option>
                    })
                }
            </select>
            {isValidating ? (
                <div className="valid-feedback d-block">Validating...</div>
            ) : isTouched && error ? (
                <div className="invalid-feedback d-block">{error}</div>
            ) : null}
        </>
    )
}

export function DateTimeInput({ name, displayName = name, validator, required }) {
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField(name, {
        validate: validator ? validator : (value) => {
            if (required && (value === "" || value === undefined || value === null)) {
                return "A " + displayName + " is required";
            }

            return false;
        }
    });

    let inputProps = getInputProps();
    let { className, style, value, onChange } = inputProps;
    delete inputProps.className;
    delete inputProps.style;
    delete inputProps.value;
    delete inputProps.onChange;

    value = value ? (value !== -1 ? new Date(value * 1000) : -1) : null;
    className += " form-control";
    style = {
        ...style,
        ...(!isValidating && isTouched && error ? { borderColor: "#dc3545" } : {})
    }

    return (
        <>
            <label>{displayName}</label>
            <Flatpickr
                options={
                    {
                        enableTime: true,
                        time_24hr: true,
                        static: false,
                        altInput: true,
                        altFormat: value !== -1 ? "Y/m/j K h:i:S" : "\\L\\i\\m\\i\\t \\E\\x\\c\\e\\e\\d",
                        dateFormat: "U",
                    }
                }
                className={className} style={style}

                value={value === -1 ? new Date() : value}

                onChange={(date) => {
                    onChange({ target: { value: date[0].getTime() / 1000 } });
                }} data-enable-time {...inputProps} />{" "}
            {isValidating ? (
                <div className="valid-feedback d-block">Validating...</div>
            ) : isTouched && error ? (
                <div className="invalid-feedback d-block">{error}</div>
            ) : null}
        </>
    );
}