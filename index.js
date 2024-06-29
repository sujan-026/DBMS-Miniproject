import express from 'express';
import bodyParser from "body-parser";
import mysql from "mysql";

const app = express();
const port = 3000;

//Database connection
const db = mysql.createConnection({
    host: 'localhost',
    database: 'miniproject',
    user: 'root',
    password: 'Sujan@2004'
});

db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    const countryQuery = 'SELECT * FROM COUNTRIES';
    const productsQuery = 'SELECT * FROM PRODUCTS';

    const getCountryData = new Promise((resolve, reject) => {
        db.query(countryQuery, (err, countryResults) => {
            if (err) return reject(err);
            resolve(countryResults);
        });
    });

    const getProductsData = new Promise((resolve, reject) => {
        db.query(productsQuery, (err, productResults) => {
            if (err) return reject(err);
            resolve(productResults);
        });
    });

    Promise.all([getCountryData, getProductsData])
        .then(([countryResults, productResults]) => {
            // Combine the results into a single array
            const combinedResults = [
                ...countryResults.map(country => ({ type: 'country', name: country.name })),
                ...productResults.map(product => ({ type: 'product', name: product.name }))
            ];

            res.render('index1.ejs', {
                countryMsg: countryResults,
                productMsg: productResults,
                combinedMsg: combinedResults
            });
        })
        .catch(err => {
            res.status(500).send('Database query error');
        });
});

// !!!Additonal feature tat im working on not important!!!
// Fetch all products
// db.query('SELECT id, name, country FROM products', (err, results) => {
//     if (err) {
//         return console.error('error fetching records: ' + err.message);
//     }

//     results.forEach((product) => {
//         let role = 'default'; // Default role

//         // Determine role based on product id and country_id
//         if (product_id === 1 || product_id === 2 || product_id === 3 || country_id === 1) {
//             role = 'Exports';
//         } else {
//             console.log('All the respective countries have been updated');
//         }

//         // Update the role for the product
//         db.query('UPDATE products SET role = ? WHERE id = ?', [role, product.id], (err, results) => {
//             if (err) {
//                 return console.error(`error updating record with id ${product.id}: ` + err.message);
//             }
//             console.log(`Updated product id ${product.id} with role ${role}`);
//         });
//     });
// });

app.get('/logout', (req, res) => {
    res.redirect('/login.ejs');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});