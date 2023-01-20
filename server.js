import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import usuariosRouter from './routes/usuarios.router.js'

const __dirname = dirname(fileURLToPath(import.meta.url))




const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))


// RUTA RAIZ
app.get('/', (req, res) => {
    res.send('Ruta raiz')
})

app.get('/usuarios', (req, res) => {
    res.send('Usuarios get')
})

app.use('/usuarios', usuariosRouter)



const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
})




// RUTAS POSIBLES
// app.post
// app.put
// app.delete


export default router