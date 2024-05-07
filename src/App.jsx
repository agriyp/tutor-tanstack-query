import { Container, Heading, Image, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { axiosInstance } from './lib/axios';

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get('/products');
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxW="container.xl">
      <Heading>Products</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Description</Th>
            <Th>Image</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Th>{product.id}</Th>
              <Th>{product.title}</Th>
              <Th>{product.price}</Th>
              <Th>{product.category}</Th>
              <Th>{product.description}</Th>
              <Th>
                <Image src={product.image} />
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}

export default App;
