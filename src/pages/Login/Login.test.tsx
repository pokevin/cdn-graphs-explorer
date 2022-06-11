import { render, screen } from "@testing-library/react";
import LoginPage from ".";

describe("app", () => {
  it("renders title", () => {
    render(<LoginPage />);
    expect(
      screen.getByRole("heading", { name: "CDN Graphs Explorer" })
    ).toBeInTheDocument();
  });
});
