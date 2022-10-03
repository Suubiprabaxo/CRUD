import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import "../style.css";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [name, setName] = useState(dataEdit.name || "");
  const [email, setEmail] = useState(dataEdit.email || "");
  const [senha, setsenha] = useState(dataEdit.senha || "");

  const handleSave = () => {
    if (!name || !email) return;

    if (emailAlreadyExists()) {
      return alert("E-mail já cadastrado!");
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, email, senha };
    }

    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { name, email, senha }]
      : [...(data ? data : [])];

    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

    setData(newDataArray);

    onClose();
  };

  function emailAlreadyExists() {
    if (dataEdit.email !== email && data?.length) {
      return data.find((item) => item.email === email);
    }

    return false;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" className="modal">Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="modal">
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={senha}
                  onChange={(e) => setsenha(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="center" className="modal">
            <Button colorScheme="green" mr={3} id="btsalvar" onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" id="btcancelar" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
