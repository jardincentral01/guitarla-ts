import { useReducer, useEffect } from "react"
import { cartReducer, initialState } from "./reducers/cart-reducer"
import Header from "./components/Header"
import Guitarra from "./components/Guitarra"

function App() {

    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { cart, guitars } = state

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(cart))
    }, [cart])

    return (

        <>
            <Header 
                cart={cart} 
                dispatch={dispatch}
            />

            <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {guitars?.map(guitar => (
                    <Guitarra 
                        key={guitar.id} 
                        guitar={guitar} 
                        dispatch={dispatch}
                    />
                ))}
            </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
