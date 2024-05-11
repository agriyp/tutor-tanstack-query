import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

export const useFetchProducts = () => {
  return useQuery({
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get('/products?limit=5');
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    queryKey: ['fetch.products'],
  });
};
