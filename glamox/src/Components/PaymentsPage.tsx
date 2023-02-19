import { CloseIcon } from "@chakra-ui/icons";
import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  useColorModeValue,
  Heading,
  Text,
  Input,
  Box,
  HStack,
  VStack,
  Button,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  PinInputField,
  PinInput,
  Toast,
  useToast,
  Flex,
} from "@chakra-ui/react";
// import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";
import PinModal from "./PinModal";


export default function PaymentsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const toast = useToast();

  const colors = useColorModeValue(
    ["red.50", "teal.50", "blue.50"],
    ["red.900", "teal.900", "blue.900"]
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  let entered: any;
  const random = Math.floor(Math.random() * 10000);
  const handleChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    entered = el.target.value;
  };

  const handleCash = () => {
    let alertdata = {
      title: " Incorrect Capcha",
      description: "Please try again",
      status: "warning",
    };

    if (random != entered) toast(Alert(alertdata));
    else navigate("/successpayment");
  };

  const handlePayment = () => {
    onOpen();
  };

  const handlePin = () => {
    onClose();
    navigate("/loader");
  };

  return (
    <div style={{ margin: "5%" }}>
      <Tabs
        isFitted
        variant="solid-rounded"
        onChange={(index) => setTabIndex(index)}
        bg={bg}
        orientation="horizontal"
        w="80%"
        margin="auto"
      >
        <TabList mb="1em" borderBlockEnd="1px" borderBlockEndColor="gray.300">
          <Tab>Cash on Delivery</Tab>
          <Tab>UPI ( GooglePay / PhonePay / BHIM )</Tab>
          <Tab>Debit/Credit Card</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack>
              <Heading size="md">Pay on delivery (Cash/UPI)</Heading>

              <Text>Capcha</Text>
              <Text border="1px solid" padding="2%" as="s">
                {random}
              </Text>
              <Input
                placeholder="Enter code shown in above image"
                w="auto"
                type="number"
                onChange={handleChange}
              />
            </VStack>
            <VStack>
              <Text>
                You can pay via Cash or UPI enabled app at the time of delivery.
                Ask your delivery executive for these options.
              </Text>
              <Button bg="red.500" onClick={handleCash}>
                PLACE ORDER
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel marginBottom="180px">
            <VStack>
              <Heading size="md">UPI ID</Heading>
              <Input placeholder="Enter your UPI ID here" />
              <Button bg="red.500" onClick={handlePayment}>
                PLACE ORDER
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              <Heading size="md">CREDIT/DEBIT CARD</Heading>
              <Text>
                Please ensure your card can be used for online transactions.
              </Text>
              <VStack w="20em" margin="auto">
                <Input placeholder="Card Number" type="number" />
                <Input placeholder="Name on Card" type="text" />
                <HStack>
                  <Input placeholder="Valid Thru(MM/YY)" />
                  <Input placeholder="CVV" type="number" />
                </HStack>
              </VStack>
              <Button bg="red.500" onClick={handlePayment}>
                PLACE ORDER
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <PinModal
        handlePin={handlePin}
        isOpen={isOpen}
        onClose={onClose}
        device={"mobile number"}
      />
    </div>
  );
}
