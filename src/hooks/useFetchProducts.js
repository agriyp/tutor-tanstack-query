import { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const { data } = await axiosInstance.get('/products');
        setProducts(data);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
  };
};
