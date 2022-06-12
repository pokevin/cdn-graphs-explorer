import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";
import { useAuth } from "../../libs/auth/AuthContext";
import { CenteredPage } from "./Login.styled";
import type { FormEventHandler } from "react";

const LoginPage = () => {
  const { isAuth, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const submitLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginError = await login(
      formData.get("username") as string,
      formData.get("password") as string
    );
    if (loginError) {
      setError(loginError);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <CenteredPage>
      <Heading as="h1" color="white" size="xl">
        CDN Graphs Explorer
      </Heading>
      <LoginForm onSubmit={submitLogin} error={error} />
    </CenteredPage>
  );
};

export default LoginPage;
