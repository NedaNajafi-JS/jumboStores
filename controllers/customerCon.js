const mongoose = require('mongoose');
const storeModel = require('../models/store');
const validation = require('../middlewares/validation');
const {validationResult} = require('express-validator');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const path = require('path');
//const {createClient} = require('redis');

//const client = createClient();

// client.on('error', error => {
//     console.log('Redis client error ', error);
// });

// (async () => {
//     // Connect to redis server
//     await client.connect();
// })();

// client.on('connect', () => {
//     console.log('Connected!');
// });

exports.findHTML = (req, res, next) => {console.log(path.dirname(require.main.filename) + '/statics/customer.html')
    res.sendFile(path.dirname(require.main.filename) + '/statics/customer.html');
}
exports.findKnearest = async (req, res, next) => {
    
    try{
        
        const customerLat = req.query.lat;
        const customerLon = req.query.lon;
        const k = 5;

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                status: 'fail',
                message: 'Validation failed'
            });
        }

        let stores = [];

        let cachedStores = myCache.get('stores');

            if(cachedStores){
                stores = cachedStores;
            }else{
                stores = await storeModel.find();

                myCache.set('stores', stores, 1800);
            }

            let distance = 0;
            let distanceArray = [];

            await Promise.all(stores.map(store => {
                distance = Math.pow((customerLon - store.longitude), 2) + Math.pow(((customerLat - store.latitude)), 2);
                distanceArray.push({distance, store});
            }));

            distanceArray.sort((a, b) => a.distance > b.distance ? 1 : -1);
            let k_nearest = distanceArray.slice(0, k);
            k_nearest = k_nearest.filter(a => a.store)

            return res.status(200).json({
                status: 'Success',
                data: {
                    k_nearest
                }
            });

        

    }catch(err){console.log(err)
        return res.status(400).json({
            status: 'fail',
            message: 'Server error',
            error: err
        });
    }
}