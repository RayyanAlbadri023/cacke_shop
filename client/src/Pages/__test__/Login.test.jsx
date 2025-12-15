import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";

// ✅ FIXED MOCK (keeps BrowserRouter & others — only replaces useNavigate)
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // keep original exports
  return {
    ...actual,
    useNavigate: () => mockNavigate, // only mock navigate
  };
});

describe("Login Component Tests", () => {

  // 1️⃣ Snapshot Test
  test("should match snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  // 2️⃣ Title Exists
  test("renders Login title text", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  // 3️⃣ Email input test
  test("email input should update value", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText("Enter email");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(input.value).toBe("test@example.com");
  });

  // 4️⃣ Password input test
  test("password input should update value", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText("Enter password");
    fireEvent.change(input, { target: { value: "123456" } });

    expect(input.value).toBe("123456");
  });

  // 5️⃣ Navigation: Sign Up → /home
  test("Sign Up button navigates to /home", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const btn = screen.getByText("Sign Up");
    fireEvent.click(btn);

    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  // 6️⃣ Navigation: Admin Login → /admin
  test("Admin Login navigates to /admin", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const link = screen.getByText("Admin Login");
    fireEvent.click(link);

    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  // 7️⃣ Navigation: Sign In → /register
  test("Sign In navigates to /register", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const link = screen.getByText("Sign In");
    fireEvent.click(link);

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
