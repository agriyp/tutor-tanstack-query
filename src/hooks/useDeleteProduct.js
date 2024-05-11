import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

export const useDeleteProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(`/products/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess,
  });
};
