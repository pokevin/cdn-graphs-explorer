import { Heading } from "@chakra-ui/react";
import { CenteredPage } from "./App.styled";
import { LoginForm } from "./components/LoginForm";

function App() {
  return (
    <CenteredPage>
      <Heading as="h1" color="white" size="xl">
        CDN Graphs Explorer
      </Heading>
      <LoginForm />
    </CenteredPage>
  );
}

export default App;
