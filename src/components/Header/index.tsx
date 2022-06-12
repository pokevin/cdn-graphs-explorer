import {
  Button,
  Heading,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "../../utils/auth/AuthContext";
import {
  HeaderContainer,
  UserIconButton,
  UserMenuContent,
} from "./Header.styled";

export const Header = () => {
  const { logout } = useAuth();

  return (
    <HeaderContainer>
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
