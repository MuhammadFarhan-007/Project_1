import React from 'react';
import { Controller } from 'react-hook-form';
import BaseInput from './BaseInput'; // Aapka purana BaseInput component

const FormInput = ({ name, control, errors, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <BaseInput
          {...field}
          {...rest} // label, placeholder, type, prefix wagera yahan se pass honge
          error={errors[name]}
        />
      )}
    />
  );
};

export default FormInput;