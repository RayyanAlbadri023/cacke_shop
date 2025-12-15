import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MenuPage from "../Menu";   // ✔ FIXED
import { vi } from "vitest";

// Mock Redux
const mockDispatch = vi.fn();

vi.mock("react-redux", () => ({
  ...vi.importActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: (selector) =>
    selector({
      desserts: {
        desserts: [
          { _id: "1", name: "Chocolate Cake", price: 3.5, image: "cake.jpg" },
        ],
        isLoading: false,
      },
      user: { user: { _id: "123" } },
    }),
}));

// Mock navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("MenuPage Component Tests", () => {
  test("should match snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <MenuPage />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test("renders dessert name correctly", () => {
    render(
      <BrowserRouter>
        <MenuPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Chocolate Cake")).toBeInTheDocument();
  });

  test("clicking + button dispatches addToCart", () => {
    render(
      <BrowserRouter>
        <MenuPage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("+"));

    expect(mockDispatch).toHaveBeenCalled();
  });

  test("clicking Register should navigate to /register", () => {
    render(
      <BrowserRouter>
        <MenuPage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Register"));

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
