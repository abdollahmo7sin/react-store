import { Route, Routes } from "react-router"
import { Home } from "./pages/home"
import { Products } from "./pages/products"
import { RootLayout } from "./layouts/RootLayout"
import { ProductPage } from "./pages/product"
import { Cart } from "./pages/cart"
import { Checkout } from "./pages/checkout"
import { OrderSuccess } from "./pages/success"
import { ErrorPage } from "./pages/404"
import { Login } from "./pages/login"
import { ProtectedRoute } from "./components/ProtectedRoute"


function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<OrderSuccess />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default App
