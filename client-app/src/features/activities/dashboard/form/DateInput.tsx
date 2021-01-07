import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Label } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateInput : React.FC<IProps> = ({
    input,
    date=false,
    time=false,
    width,
    placeholder,
    meta: { touched, error }  }) => {
    return (
      <Form.Field error={touched && !!error} width={width}>
        {/* <DateTimePicker 
            onBlur={input.onBlur} // allows warnings
            onKeyDown={(e)=> e.preventDefault()} // prevents typing in box
            placeholder={placeholder}
            value={input.value || null}
            onChange={input.omChange}
           
            {...rest}
        /> */}

        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
}

export default DateInput
