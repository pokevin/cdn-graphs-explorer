import { render, screen } from "@testing-library/react";
import { AuthContextProvider } from "../../libs/auth/AuthContext";
import HomePage from ".";

describe("home page", () => {
  it("has a header", () => {
    render(
      <AuthContextProvider>
        <HomePage />
      </AuthContextProvider>
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
