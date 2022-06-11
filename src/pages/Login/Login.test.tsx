import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../utils/auth/AuthContext";
import LoginPage from ".";

const setupLoginPage = () =>
  render(
    <AuthContextProvider>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<h1>Home page</h1>} />
        </Routes>
      </MemoryRouter>
    </AuthContextProvider>
  );

const fillAndSubmitLoginForm = async (username: string, password: string) => {
  await userEvent.type(screen.getByPlaceholderText("Username"), username);
  await userEvent.type(screen.getByPlaceholderText("Password"), password);
  await userEvent.click(screen.getByRole("button", { name: "Connexion" }));
};

describe("app", () => {
  it("redirect to home page then logging in", async () => {
    setupLoginPage();
    await fillAndSubmitLoginForm("existingUser", "pwd");
    await expect(screen.findByText("Home page")).resolves.toBeInTheDocument();
  });
});
