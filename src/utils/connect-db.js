import { connect } from "mongoose";

export async function connectMongo() {
  try {
    //entorno.MONGO_URL
    await connect(
      "mongodb+srv://rostmalena:nv0PPp1IhmBjRv9d@cluster1.wdy42ir.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Conectado a la base de datos");
  } catch (e) {
    console.log(e);
    throw "Falló la conexion";
  }
}
