import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../../utils/auth/AuthContext";
import { Header } from ".";

const TestWrapper = ({ isLogged }: { isLogged: boolean }) => {
  const { isAuth, login } = useAuth();
  useEffect(() => {
    if (isLogged) {
      login("existingUser", "pwd");
    }
  }, []);
  return isAuth ? <Header /> : <h1>Not logged in</h1>;
};

describe("header", () => {
  it("can logout", async () => {
    render(
      <AuthContextProvider>
        <TestWrapper isLogged />
      </AuthContextProvider>
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Not logged in"));
    await userEvent.click(screen.getByRole("button", { name: "User menu" }));
    await userEvent.click(screen.getByRole("button", { name: "Logout" }));
    await expect(
      screen.findByText("Not logged in")
    ).resolves.toBeInTheDocument();
  });
});
