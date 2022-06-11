import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FormDescription, BoxForm } from "./LoginForm.styled";
import type { FormHTMLAttributes } from "react";

type LoginFormProps = FormHTMLAttributes<HTMLFormElement> & {
  error?: string;
};

export const LoginForm = ({ error, ...props }: LoginFormProps) => {
  return (
    <BoxForm {...props}>
      <FormDescription>Hello guys!</FormDescription>
      <FormDescription>{`Let's explore thoses graphs. But first login!`}</FormDescription>
      <FormControl>
        <FormLabel htmlFor="username">Username:</FormLabel>
        <Input
          type="text"
          name="username"
          id="username"
          required
          placeholder="Username"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password:</FormLabel>
        <Input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
        />
      </FormControl>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Button type="submit" colorScheme="blue">
        Connexion
      </Button>
    </BoxForm>
  );
};
