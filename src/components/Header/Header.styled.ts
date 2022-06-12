import { IconButton, PopoverContent } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  height: 3.5rem;
`;

export const UserIconButton = styled(IconButton)`
  margin-left: auto;
`;

export const UserMenuContent = styled(PopoverContent)`
  color: var(--chakra-colors-blue-600);
`;
