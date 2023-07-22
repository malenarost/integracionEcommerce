let jugadores = [
  {
    id: "123",
    name: "juan roman",
    goles: 10000,
    importantes: "casi todos definitivos",
  },
  { id: "456", name: "cresto", goles: 100, importantes: "casi ninguno" },
];

class JugadoresModel {
  getAll = () => {
    let jugadoresEncontrados = jugadores;
    return jugadoresEncontrados;
  };
  createOne = (jugador) => {
    jugador.id = Math.floor(Math.random() * 1000);
    jugadores.push(jugador);
    return jugador;
  };
}

export const jugadoresModel = new JugadoresModel();
