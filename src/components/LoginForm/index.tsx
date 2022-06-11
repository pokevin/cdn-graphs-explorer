import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FormDescription, BoxForm } from "./LoginForm.styled";
import type { FormHTMLAttributes } from "react";

export const LoginForm = (props: FormHTMLAttributes<HTMLFormElement>) => {
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
          placeholder="Username"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password:</FormLabel>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Connexion
      </Button>
    </BoxForm>
  );
};
