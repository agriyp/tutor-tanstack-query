import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

export const useAddProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      try {
        const response = await axiosInstance.post('/products', body);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess,
  });
};
