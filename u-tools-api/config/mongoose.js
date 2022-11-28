
const Mongoose = require("mongoose");
const debug = require("debug")("app:mongoose");

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "u-tools"

//const dburi = process.env.DBURI || `mongodb://${dbhost}:${dbport}/${dbname}`;


//const dburi ="mongodb+srv://admin_01:U_tools2022@cluster0.kipdxyq.mongodb.net/?retryWrites=true&w=majority";
const dburi ="mongodb+srv://admin_01:U_tools2022@cluster0.kipdxyq.mongodb.net/u-tools";


const connect = async () => {
  debug(dburi);
  try {
    await Mongoose.connect(dburi);
    debug("Conexión a la base exitosa");
  } catch (error) {
    debug("Error en la conexión de la base");
    process.exit(1);
  }
}

module.exports = {
  connect
}




















