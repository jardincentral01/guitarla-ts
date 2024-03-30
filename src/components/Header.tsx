import { Dispatch, useMemo } from "react"
import type { Item } from "../types"
import { CartActions } from "../reducers/cart-reducer"

type HeaderProps = {
    cart: Item[]
    dispatch: Dispatch<CartActions>
}

const Header = ({cart, dispatch} : HeaderProps) => {

    // State derivado
    const isEmpty = useMemo(() => cart.length == 0, [cart])
    const getTotal = useMemo(() => cart.reduce((acc, itemState) => acc + (itemState.price * itemState.quantity), 0), [cart])
    const cartCount = useMemo(() => cart.length, [cart])

    return (
        <header className="py-5 header">
          <div className="container-xl">
              <div className="row justify-content-center justify-content-md-between">
                  <div className="col-8 col-md-3">
                      <a href="index.html">
                          <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                      </a>
                  </div>
                  <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                      <div 
                          className="carrito"
                      >
                        <div className="cart">
                          <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />
                          <span className="cart-count" data-empty={isEmpty}>{cartCount}</span>
                        </div>

                          <div id="carrito" className="bg-white p-3">

                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(({id, name, image, price, quantity}) => (
                                                    <tr key={id}>
                                                        <td>
                                                            <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                                                        </td>
                                                        <td>{name}</td>
                                                        <td className="fw-bold">
                                                                ${price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => dispatch({ type: "decrease-quantity", payload: { id } })}
                                                            >
                                                                -
                                                            </button>
                                                            {quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => dispatch({ type: "increase-quantity", payload: { id } })}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => dispatch({ type: "remove-from-cart", payload: { id } })}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <p className="text-end">Total pagar: <span className="fw-bold">${getTotal}</span></p>
                                        <button onClick={() => dispatch({ type: "clear-cart" })} className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                                    </>
                                )}
                          </div>
                      </div>
                  </nav>
              </div>
          </div>
        </header>
    )
}

export default Header