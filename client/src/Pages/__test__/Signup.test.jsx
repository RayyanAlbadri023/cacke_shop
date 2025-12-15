import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Register from "../Signup";

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Signup/Register Component Tests", () => {
  test("should match snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test("inputs should update values", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter full name..."), {
      target: { value: "Zahraa" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter email..."), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter phone number..."), {
      target: { value: "98989898" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password..."), {
      target: { value: "mypassword" },
    });

    expect(screen.getByPlaceholderText("Enter full name...").value).toBe("Zahraa");
    expect(screen.getByPlaceholderText("Enter email...").value).toBe("test@example.com");
    expect(screen.getByPlaceholderText("Enter phone number...").value).toBe("98989898");
    expect(screen.getByPlaceholderText("Enter password...").value).toBe("mypassword");
  });

  test("Sign In button should navigate to /login", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const signInButton = screen.getAllByText("Sign In")[0]; // FIX: First element
    fireEvent.click(signInButton);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("Sign In link in text should navigate to /login", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const signInLink = screen.getAllByText("Sign In")[1]; // FIX: Second element
    fireEvent.click(signInLink);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
