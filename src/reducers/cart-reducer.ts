import type { Guitar, Item } from "../types"
import { db } from "../data/db"

export type CartActions = 
    { type: "add-to-cart", payload: { newItem: Item } } |
    { type: "remove-from-cart", payload: { id: Guitar['id'] } } |
    { type: "increase-quantity", payload: { id: Guitar['id'] } } |
    { type: "decrease-quantity", payload: { id: Guitar['id'] } } |
    { type: "clear-cart" }

export type CartState = {
    cart: Item[]
    guitars: Guitar[]
}

const initialCart = () : Item[] => {
    const localStorageCart = localStorage.getItem("carrito")
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState : CartState = {
    cart: initialCart(),
    guitars: db
}

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

export const cartReducer = (
    state : CartState = initialState,
    action : CartActions
) => {

    if(action.type == "add-to-cart"){
        let updatedCart : Item[] = []

        const itemExists = state.cart.some(itemState => itemState.id == action.payload.newItem.id)
        if(itemExists){
            updatedCart = state.cart.map(itemState => (itemState.id == action.payload.newItem.id && itemState.quantity < MAX_ITEMS) ? {...itemState, quantity: itemState.quantity + 1} : itemState)
        }else{
            updatedCart = [...state.cart, action.payload.newItem]
        }

        return {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type == "remove-from-cart"){
        const updatedCart = state.cart.filter(itemState => itemState.id != action.payload.id)
        return {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type == "increase-quantity"){
        const updatedCart = state.cart.map(itemState => (itemState.id == action.payload.id && itemState.quantity < MAX_ITEMS) ? { ...itemState, quantity: itemState.quantity + 1 } : itemState)

        return {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type == "decrease-quantity"){
        let updatedCart : Item[] = []

        const itemState = state.cart.find(itemState => itemState?.id == action.payload.id)
        if(itemState!.quantity <= MIN_ITEMS){
            updatedCart = state.cart.filter(itemState => itemState.id != action.payload.id)
        }else{
            updatedCart = state.cart.map(itemState => itemState.id == action.payload.id ? {...itemState,
            quantity: itemState.quantity - 1} : itemState)
        }

        return {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type == "clear-cart"){
        return {
            ...state,
            cart: []
        }
    }

    return state
}