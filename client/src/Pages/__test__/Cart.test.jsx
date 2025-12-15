// src/Pages/__test__/Cart.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Cart from "../Cart";
import { vi } from "vitest";

// -----------------------------
// Mock Redux useSelector + useDispatch
// -----------------------------
const mockDispatch = vi.fn();

vi.mock("react-redux", () => ({
  ...vi.importActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: (selector) =>
    selector({
      cart: {
        cartItems: [
          {
            uid: "abc123",
            name: "Chocolate Cake",
            price: 2.8,
            quantity: 1,
            image: "cake.jpg",
          },
        ],
      },
    }),
}));

// -----------------------------
// Mock useNavigate
// -----------------------------
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// -----------------------------
// TEST SUITE
// -----------------------------
describe("Cart Component Tests", () => {
  
  // 1️⃣ Snapshot Test
  test("matches snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  // 2️⃣ Check if dessert name renders correctly
  test("renders cart item name", () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    expect(screen.getByText("Chocolate Cake")).toBeInTheDocument();
  });

  // 3️⃣ Test quantity increase button (+)
  test("quantity + button dispatches updateQuantity", () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    const plusBtn = screen.getByText("+");
    fireEvent.click(plusBtn);

    expect(mockDispatch).toHaveBeenCalled();
  });

  // 4️⃣ Test deleting item
  test("delete button dispatches removeFromCart", () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    const deleteBtn = screen.getByText("×");
    fireEvent.click(deleteBtn);

    expect(mockDispatch).toHaveBeenCalled();
  });

  // 5️⃣ Test checkout button navigation
  test("checkout navigates to /checkout", () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    const checkoutBtn = screen.getByText("Checkout");
    fireEvent.click(checkoutBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/checkout");
  });
});
