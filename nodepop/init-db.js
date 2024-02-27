'use strict'

//connect to db
const connection = require('./lib/connectMongoose');
//import Advert
const Advert = require('./models/Advert');

const exadverts = require('./ex-adverts.json')


async function main() {

    await initAdverts();

    connection.close();

}

async function initAdverts() {

    //delete all data
    const deleted = await Advert.deleteMany();
    console.log(`Deleted ${deleted.deletedCount} adverts.`);

    //create example adverts
    const inserted = await Advert.insertMany(exadverts)
    console.log(`Created ${inserted.length} adverts.`)

}

// call function main and handle error in case promise return error
main().catch(err => console.log('Error:', err));