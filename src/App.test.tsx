import { render, screen } from "@testing-library/react";
import App from "./App";

describe("app", () => {
  it("renders title", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "CDN Graphs Explorer" })
    ).toBeInTheDocument();
  });
});
