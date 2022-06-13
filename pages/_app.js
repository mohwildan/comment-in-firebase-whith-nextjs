import {
  Button,
  Center,
  ChakraProvider,
  Icon,
  Image,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { auth } from "../FIrebase";
import "../styles/globals.css";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);



  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </ChakraProvider>
    );
  }

  if (!user) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Button
            p="2rem 2.5rem"
            _hover={{ bg: "blue.400" }}
            fontSize="2rem"
            bg="blue.500"
            color="white"
            onClick={() => signInWithGoogle()}
          >
            <Image
              w="40px"
              h="40px"
              marginEnd={3}
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
            />
            Google
          </Button>
        </Center>
      </ChakraProvider>
    );
  }


  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
