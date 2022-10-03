import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import "./style.css";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Center,
  background,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import "./style.css";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (

    <Flex className="back"
      justify="center"
      >
      <Box maxW={1000} className="box" w="100%" h="100vh" py={5} px={2}>
        <Button id="btcadastro" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>
        <Box overflowY="auto" height="100%" className="box2">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px" color= "#fff">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px" color= "#fff">
                  E-Mail
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px" color= "#fff">
                  Senha
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, email, senha }, index ) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{senha}</Td>
                  <Td p={0}>
                    <EditIcon
                      color="green"
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ name, email, senha, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      color="red"
                      fontSize={20}
                      onClick={() => handleRemove(email)}
                      
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      

      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
