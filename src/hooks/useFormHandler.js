import { useState } from 'react';
import { message } from 'antd';

export const useFormHandler = (submitCallback) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await submitCallback(values);
    } catch (error) {
      message.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, onFinish };
};