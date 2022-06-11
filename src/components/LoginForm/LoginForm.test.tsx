import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from ".";
import type { FormEventHandler } from "react";

describe("login form", () => {
  it("submit username and password", async () => {
    const spy = jest.fn();
    const mockSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      spy({
        username: formData.get("username"),
        password: formData.get("password"),
      });
    };
    render(<LoginForm onSubmit={mockSubmitHandler} />);
    await userEvent.type(screen.getByPlaceholderText("Username"), "name");
    await userEvent.type(screen.getByPlaceholderText("Password"), "pwd");
    await userEvent.click(screen.getByRole("button", { name: "Connexion" }));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ username: "name", password: "pwd" });
  });

  it("check username and password required", async () => {
    render(
      <LoginForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Connexion" }));
    expect(screen.getByPlaceholderText("Username")).toBeInvalid();
    expect(screen.getByPlaceholderText("Password")).toBeInvalid();
  });

  it("can show errors", () => {
    render(<LoginForm error="Some error" />);
    expect(screen.getByRole("alert").textContent).toBe("Some error");
  });
});
