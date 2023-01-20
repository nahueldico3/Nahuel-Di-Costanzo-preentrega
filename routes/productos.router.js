const fs = require('fs');
import { application, Router } from "express"
const router = Router()
const rutaProductos = './listaProductos.json'

router.post('/routes/carts/:idCarrito/products/:idProduct', (req, res) => {
    class ProductManager {
    
        constructor() {
            this.items = []
        }
    
        getItems(){
            return this.items
        }
    
        async addItem(title,description,code,price,status,stock,category){
            try{
                const item = {
                id: this.#generarId(),
                title,
                description,
                code,
                price: price*this.#precioBaseDeGanancia,
                status:true,
                stock,
                category,
            }
            this.items.push(item)
            } catch (error) {
                console.log(error);
            }
        }
    
        ponerEventoEnGira(idItem,nuevoPrice,nuevoStock){
            const item = this.#evaluarItem(idItem)
            if(item){
                const nuevoItem = {
                    ...item,
                    id: this.#generarId(),
                    price: nuevoPrice,
                    stock: nuevoStock,
                }
                this.items.push(nuevoItem)
            } else {
                console.log('Este item no existe');
            }
        }
        
        async consultarItems() {
            try {
                if (fs.existsSync(rutaProductos)){
                    const infoItems = await fs.promises.readFile(rutaProductos, 'utf-8')
                    const infoItemsJS = JSON.parse(infoItems)
                    return infoItemsJS
                } else {
                    return []
                }
            } catch (error) {
                console.log(error);
            }
        }
    
    
        async addItem(item) {
            try {
                const items = await this.consultarItems()
                items.push(item)
                await fs.promises.writeFile(rutaProductos, JSON.stringify(items))
            } catch (error) {
                console.log(error);
            }
        }
    
        #generarId(){
            let id
            this.items.length===0 ? id = 1 : this.items[this.items.length - 1].id + 1
            return id
        }
    
        #evaluarItem(id) {
            return this.items.find((item) => item.id === id)
        }
        
    }
    res.send('error')
})

const product = new ProductManager()


export default router

// ESCRIBIR ARCHIVO
// fs.writeFileSync('listaProductos.txt','frutilla')


// LEER ARCHIVO
// const info = fs.readFileSync('listaProductos.txt', 'utf-8')
// console.log(info);


// ELIMINAR ARCHIVO
// fs.unlinkSync('listaProductos.txt')


//AGREGAR INFO
// fs.appendFileSync('listaProductos.txt', 'fruto rojo')



// if(fs.existsSync('listaProductos.txt')){
//     console.log('Este archivo existe');
// } else {
//     console.log('Este archivo no existe');
// }


// product.addItem('frutilla','fruto rojo de facil acceso',300,'sadadadadadada',20)
// console.log(product.getItems(product))
// console.log(product)

