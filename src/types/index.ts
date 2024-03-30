export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type Item = Guitar & {
    quantity: number
}

export type GuitarID = Pick<Guitar, 'id'>

// otra opcion export type GuitarID = Guitar['id']