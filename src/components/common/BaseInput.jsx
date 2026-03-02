import React from 'react';
import { Form, Input } from 'antd';
import '../../style.css';

const BaseInput = ({ label, error, placeholder, prefix, type = "text", ...field }) => {
  const InputComponent = type === "password" ? Input.Password : Input;

  return (
    <Form.Item 
      label={label} 
      layout="vertical"
      className="custom-input-wrapper"
      validateStatus={error ? "error" : ""} 
      help={error?.message}
    >
      <InputComponent
        {...field} // Isse value aur onChange automatically connect ho jayenge
        prefix={prefix}
        placeholder={placeholder}
        size="large"
      />
    </Form.Item>
  );
};

export default BaseInput;