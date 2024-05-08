import {
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useFetchProducts } from './hooks/useFetchProducts';

function App() {
  const { products, isLoading } = useFetchProducts();

  if (isLoading || products.length === 0) {
    return (
      <Container maxW="container.xl">
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Spinner size="lg" />
        </Flex>
      </Container>
    );
  }

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
