import { jugadoresModel } from "../DAO/models/jugadores.models.js";

class JugadoresService {
  getAll = () => {
    let jugadoresEncontrados = jugadoresModel.getAll();
    return jugadoresEncontrados;
  };

  createOne = (jugador) => {
    let jugadorCreado = jugadoresModel.createOne(jugador);
    return jugadorCreado;
  };
}

export const jugadoresService = new JugadoresService();
