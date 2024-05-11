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
import { useAddProduct } from './hooks/useAddProduct';
import { useDeleteProduct } from './hooks/useDeleteProduct';

function App() {
  const toast = useToast();

  const {
    data: products,
    isLoading: fetchProductIsLoading,
    refetch: refetchProduct,
  } = useFetchProducts();

  const { mutate: addProduct, isLoading: AddProductIsLoading } = useAddProduct({
    onSuccess: () => {
      refetchProduct();
    },
  });

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      refetchProduct();
    },
  });

  const confirmationDelete = (productId) => {
    const shouldDelete = confirm(`are you sure to delete product ${productId}`);

    if (shouldDelete) {
      deleteProduct(productId);
      toast({
        title: 'Success',
        description: 'Product deleted',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
      addProduct({
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

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  if (fetchProductIsLoading) {
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
            <Th>Action</Th>
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
              <Th>
                <Button colorScheme="red" onClick={() => confirmationDelete(product.id)}>
                  Delete
                </Button>
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
          <Button w="10rem" colorScheme="blue" type="submit">
            {AddProductIsLoading ? <Spinner /> : `Add Product`}
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default App;
