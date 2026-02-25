import { Form, Input } from 'antd';

const BaseInput = ({ name, label, rules, placeholder, prefix, type = "text", ...rest }) => {
  const InputComponent = type === "password" ? Input.Password : Input;

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <InputComponent
        prefix={prefix}
        placeholder={placeholder}
        size="large"
        {...rest}
        style={{
          marginLeft: "0"
        }}/>
    </Form.Item>
  );
};

export default BaseInput;