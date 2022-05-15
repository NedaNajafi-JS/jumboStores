const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({

    city: String,
    postalCode: String,
    street: String,
    street2: String,
    street3: String,
    addressName: String,
    uuid: String,
    longitude: Number,
    latitude: Number,
    complexNumber: Number,
    showWarningMessage: Boolean,
    todayOpen: String,
    locationType: String,
    collectionPoint: Boolean,
    sapStoreID: Number,
    todayClose: String

});

module.exports = mongoose.model('store', storeSchema);