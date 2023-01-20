import { application, Router } from "express"

// const cart = []
const router = Router()


// router.post('/', (req, res) => {
//     const cart = req.body
//     users.push(cart)
//     res.json({message:'Producto agregado con exito', cart})
// })


router.post('/routes/carts/:idCarrito/products/:idProduct', (req, res) => {
    const { idCart, idProduct } = req.params
    const cart = carts.find((c) => c.id === parseInt(idCart))
    const product = products.find((p) => p.id === parseInt(idProduct))
    if (product) {
        res.send('error')
    }
    const index = cart.product.findIndex(p => p.product === parseInt(idProduct))
    if (index === 1) {
        cart.products.push({ product: parseInt(idProduct), quantity: 1 })
    } else {
        cart.product[index].quantity++
    }
})





export default router