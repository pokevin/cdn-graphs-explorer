import { Heading } from "@chakra-ui/react";
import { LoginForm } from "../../components/LoginForm";
import { CenteredPage } from "./Login.styled";

const LoginPage = () => (
  <CenteredPage>
    <Heading as="h1" color="white" size="xl">
      CDN Graphs Explorer
    </Heading>
    <LoginForm />
  </CenteredPage>
);

export default LoginPage;
