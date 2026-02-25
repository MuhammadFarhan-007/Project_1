import { Button } from 'antd';

const BaseButton = ({ children, type = "primary", loading = false, ...rest }) => (
  <Button 
    type={type} 
    loading={loading} 
    block 
    size="large" 
    {...rest}
    style={{
      marginBottom:"10px",
    }}
  >
    {children}
  </Button>
);

export default BaseButton;