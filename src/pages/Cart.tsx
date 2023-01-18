import Layout from "components/common/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CartState,
  cartState,
  removeItemFromCart,
} from "store/slices/cartSlice";
import { formatCurrency } from "utilities/formatCurrency";
import { XCircleIcon } from "@heroicons/react/outline";

const Cart = () => {
  const cart: CartState = useSelector(cartState);
  const dispatch = useDispatch();

  const removeItemHandler = (item: any) => {
    dispatch(removeItemFromCart(item));
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cart.cartItems.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <Link to="/" className="underline">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item: any) => (
                  <tr key={item._id} className="border-b">
                    <td>
                      <Link
                        to={`/product/${item._id}`}
                        className="flex items-center"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20"
                        />
                        &nbsp; {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">{item.quantity}</td>
                    <td className="p-5 text-right">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="p-5 text-center">
                      <button
                        type="button"
                        onClick={() => removeItemHandler(item)}
                      >
                        <XCircleIcon className="w-5 h-5 text-red-700"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col justify-between rounded-lg border border-gray-200  shadow-md p-5">
            <div>
              <div className="pb-3 text-xl">
                Subtotal (
                {cart.cartItems.reduce(
                  (acc, item: any) => acc + item.quantity,
                  0
                )}
                ) : $
                {cart.cartItems.reduce(
                  (acc, item: any) => acc + item.quantity * item.price,
                  0
                )}
              </div>
            </div>
            <div>
              <button
                type="button"
                className="button w-full bg-red-700 text-white"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;