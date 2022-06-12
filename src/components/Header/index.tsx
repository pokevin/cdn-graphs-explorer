import {
  Button,
  Heading,
  Icon,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "../../libs/auth/AuthContext";
import {
  HeaderContainer,
  UserIconButton,
  UserMenuContent,
} from "./Header.styled";

export const Header = () => {
  const { logout } = useAuth();

  return (
    <HeaderContainer>
      <Image src="/logo.png" w="10" h="10" alt="Logo" />
      <Popover placement="bottom">
        <PopoverTrigger>
          <UserIconButton
            aria-label="User menu"
            variant="unstyled"
            icon={<Icon as={VscAccount} w="10" h="10" color="white" />}
          />
        </PopoverTrigger>
        <UserMenuContent>
          <PopoverArrow />
          <PopoverHeader>
            <Heading as="h2" size="md">
              Profil
            </Heading>
          </PopoverHeader>
          <PopoverBody>
            <Button variant="unstyled" onClick={logout}>
              Logout
            </Button>
          </PopoverBody>
        </UserMenuContent>
      </Popover>
    </HeaderContainer>
  );
};
