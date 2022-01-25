// NodeJS que vamos a 

const { MongoClient } = require('mongodb');

// connection string a la base de datos
// unique resource identifier

const uri = "mongodb+srv://root:root@cluster0.uxg9l.mongodb.net";

// configuramos una nueva instancia de conexión MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// preguntar a la base de datos sample_airbnb de nuestro servidor Atlas que nos devuelve un apartamento cuyo precio sea como máximo 100 dólares

async function find(price) {

    // Conectar al servidor de base de datos (Atlas)
    await client.connect();

    // Seleccionar la base de datos
    const database = client.db("sample_airbnb");

    // Seleccionar una colección
    const reviews = database.collection("listingsAndReviews");

    // Configurar la búsqueda: un documento que su campo "price" sea menor a 100 dólares
    const query = { "price": { $lte: price } };

    // utilizamos el método findOne de 'reviews' para obtener un documento que cumpla con este criterio. Si no encuentra ningun documento cumpliendo el criterio devuelve un valor null

    const apartment = await reviews.findOne(query);

    if (!apartment) {
        console.log(`No hay apartamentos por menos de ${price} dólares.`);
        await client.close();

        return;
    }

    console.log(apartment.price);
    console.log(apartment.listing_url);

    await client.close();

};

// Vamos a gestionar una base de datos nueva sobre álbumes de música
// Típcamente los álbumes tienen un nombre, un cantante, año que salió, estilo de la música

// Vamos a crear una función que permite insertar esta información en una base de datos de nombre 'music'. 

// Nuevo requisito: el número de ventas

async function newAlbum(name, singer, year, styles, ventas) {
    // Conectar al servidor de base de datos (Atlas)
    await client.connect();

    // Seleccionamos la base de datos 'albums'
    const database = client.db('music');

    // Seleccionamos la colección 
    const albums = database.collection('albums');

    // Creamos el documento a insertar
    const album = {
        name,
        singer,
        year,
        styles,
        ventas
    };

    // Utilizamos el método insertOne para añadirlo a la colección
    const result = await albums.insertOne(album);

    console.log(result);

    await client.close();

}

newAlbum("20 Exitos de Plata", "Raphael", 2004, ['Flamenco'], 500000);



