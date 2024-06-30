import { Card, Flex } from "@chakra-ui/react";
import { Step } from "./Step";

const Steps = [
  {
    icon: "/steps/1.svg",
    title: "Scan a Receipt / Manually Enter Ingredients",
    description: "Adds ingredients to your fridge",
  },
  {
    icon: "/steps/2.svg",
    title: "Upload the receipt",
    description: "Upload your receipt and AI list the ingredients, quantities, and expiration dates",
  },
  {
    icon: "/steps/3.svg",
    title: "Earn rewards",
    description: "Earn B3TR for using ingredients for meals before they reach their expected expiration date.",
  },
];

export const Instructions = () => {
  return (
    <Card mt={3} w={"full"}>
      <Flex
        p={{ base: 4 }}
        w="100%"
        direction={{ base: "column", md: "row" }}
      >
        {Steps.map((step, index) => (
          <Step key={index} {...step} />
        ))}
      </Flex>
    </Card>
  );
};
