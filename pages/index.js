import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { auth, firestore } from "../FIrebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [komen, setKomen] = useState("");
  

  useEffect(() => {
    onSnapshot(collection(firestore, "data"), (snapshot) => {
      setData(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          titmestamp: doc.data().titmestamp?.toDate().getTime(),
        }))
      );
    });
  }, []);

  console.log(data);

  const handlerSumbit = async (e) => {
    e.preventDefault();

    const docref = collection(firestore, "data");
    await addDoc(docref, {
      name: user.displayName,
      email: user.email,
      komen: komen,
      image: user.photoURL,
    });
    setKomen("");
  };

  const handleDelete = async (id) => {
    const docRef = doc(firestore, "data", id);
    await deleteDoc(docRef);
  };

  const handlerChange = (e) => {
    const even = e.target.value;
    setKomen(even);
  };

  console.log(data);
  return (
    <>
      <Flex alignItems="center" p={8} justifyContent="flex-end">
        <Text>{user.displayName}</Text>
        <Button bg="yellow.500" color="white" _hover={{bg: "yellow.400"}} ml={3} onClick={() => signOut(auth)}>Log Out</Button>
      </Flex>

      <Center h="calc(100vh - 140px)" display="flex" flexDir="column">
        <form onSubmit={handlerSumbit}>
          <Input placeholder="comment" onChange={handlerChange} value={komen} />

          <Button color="white" _hover={{bg: "green.400"}} fontSize={15} p="0.5rem 1.5rem" bg="green.500" mt={3} type="sumbit" disabled={komen === ""}>
            send
          </Button>
        </form>
        {data.map((item, i) => {
          return (
            <Box mt={5} key={i}>
              <Flex align="center">
                <Image rounded="100%" w="25px" h="25px" src={item.image} />
                <Text as="h1" mx={3}>
                  {item.name}
                </Text>
                <Text color="gray.500" as="h2" fontSize="lg">
                  {item.email}
                </Text>
              </Flex>
              <Flex ml={3} justifyContent="center" flexDirection="column">
                <Text ml={6} my={3} fontSize="lg">
                  {item.komen}
                </Text>
                {user.email === item.email && (
                  <Button bg="blue.500" color="white" _hover={{bg: "blue.400"}} onClick={() => handleDelete(item.id)}>delete</Button>
                )}
              </Flex>
            </Box>
          );
        })}
      </Center>
    </>
  );
}
