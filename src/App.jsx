import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Table,
  Tbody,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useFetchProducts } from './hooks/useFetchProducts';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './lib/axios';

function App() {
  const { data: products, isLoading, refetch } = useFetchProducts();
  const { mutate } = useMutation({
    mutationFn: (body) => {
      const response = axiosInstance.post('/products', body);
      return response;
    },
    onSuccess: () => {
      refetch();
    },
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      price: 0,
      category: '',
      description: '',
      image: 'https://i.pravatar.cc',
    },
    onSubmit: () => {
      const { title, price, category, description, image } = formik.values;
      mutate({
        title,
        price,
        category,
        description,
        image,
      });

      formik.setFieldValue('title', '');
      formik.setFieldValue('price', 0);
      formik.setFieldValue('description', '');
      formik.setFieldValue('category', '');

      toast({
        title: 'Success',
        description: 'Product added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const toast = useToast();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl">
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Spinner size="lg" />
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" marginY={16}>
      <Heading>Products</Heading>
      <Table mb={8}>
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
                <Box boxSize="100px" bg={product.color}>
                  <Image boxSize="100%" objectFit="contain" src={product.image} />
                </Box>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={8}>
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              type="text"
              id="name"
              name="title"
              onChange={onChangeHandler}
              value={formik.values.title}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input
              type="number"
              id="price"
              name="price"
              onChange={onChangeHandler}
              value={formik.values.price}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              name="description"
              onChange={onChangeHandler}
              value={formik.values.description}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Input
              type="text"
              id="category"
              name="category"
              onChange={onChangeHandler}
              value={formik.values.category}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Add Product
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default App;
