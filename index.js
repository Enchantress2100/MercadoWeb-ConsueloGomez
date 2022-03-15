//instalacion de dependencias
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

//creacion del servidor
app.listen(3000, () => {
    console.log('server on and working OK')
})

//middleware para cargar bootstrap, bootstrap JS y jquery
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/BootstrapJs', express.static(__dirname + '/node_modules/bootstrap/dist/js'))

//disponibilizar la carpeta assets como carpeta publica del servidor
app.use(express.static('assets'))

//integrar handlebars como motos de plantillas
app.set('view engine', 'handlebars')

//configurar el motor de plantilla con el metodo engine
app.engine(
    'handlebars', exphbs.engine({
        layoutsDir: __dirname + '/views',
        partialsDir: __dirname + '/views/componentes',
    })
)
//creacion de parcial menu que se renderice antes que dashboard
app.get('/', (_, res) => {
    res.render('Menu', {
        layout: 'Menu',
        dashboard
    })
})

//creacion de ruta raiz que al ser consultada renderice una vista con un parcial "dashboard", enviando en el render un arreglo con los nombres de los productos.
let dashboard = [];
dashboard.push({ src: "banana.png", name: "banana" });
dashboard.push({ src: "cebollas.png", name: "cebollas" });
dashboard.push({ src: "lechuga.png", name: "lechuga" });
dashboard.push({ src: "papas.png", name: "papas" });
dashboard.push({ src: "pimenton.png", name: "pimenton" });
dashboard.push({ src: "tomate.png", name: "tomate" });
app.get('/Dashboard', (_, res) => {
    res.render('Dashboard', {
        layout:'Dashboard',
        dashboard
    })
})
//crear parcial producto para mostrar template de cada uno de los productos, recibiendo como parametro su nombre
app.get('/:producto', (req, res) => {
    let { producto } = req.params
    productos = dashboard.find((verdura) => verdura.name === producto);
    res.render('Producto', {
        layout: 'Producto',
        productos
    })
})
