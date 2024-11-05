class Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad) {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
    this.defensa = defensa;
    this.velocidad = velocidad;
  }

  atacar(objetivo) {
    let ataqueReal = Math.floor(Math.random() * this.ataque);
    let defensaReal = Math.floor(Math.random() * objetivo.defensa);
    let dano = ataqueReal - defensaReal;
    if (dano < 0) dano = 0;

    objetivo.vida -= dano;
    console.log(
      `${this.nombre} ataca a ${objetivo.nombre} y causa ${dano} de daño.`
    );

    if (objetivo.vida <= 0) {
      console.log(`${objetivo.nombre} ha muerto.`);
    }
  }

  saludar() {
    console.log(`¡Hola! Soy ${this.nombre}.`);
  }
}

class Mago extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, hechizos) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.hechizos = hechizos;
  }

  lanzarHechizo(objetivo) {
    let hechizo =
      this.hechizos[Math.floor(Math.random() * this.hechizos.length)];
    let dano = hechizo.daño;
    objetivo.vida -= dano;

    console.log(
      `${this.nombre} lanza el hechizo ${hechizo.nombre} a ${objetivo.nombre} y causa ${dano} de daño.`
    );

    if (objetivo.vida <= 0) {
      console.log(`${objetivo.nombre} ha muerto.`);
    }
  }
}

class Guerrero extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, armas) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.armas = armas;
  }

  atacarConArma(objetivo) {
    let arma = this.armas[Math.floor(Math.random() * this.armas.length)];
    let dano = arma.daño;
    objetivo.vida -= dano;

    console.log(
      `${this.nombre} ataca con ${arma.nombre} a ${objetivo.nombre} y causa ${dano} de daño.`
    );

    if (objetivo.vida <= 0) {
      console.log(`${objetivo.nombre} ha muerto.`);
    }
  }
}

class Arquero extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, flechas) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.flechas = flechas;
  }

  dispararFlecha(objetivo) {
    let dano = Math.floor(Math.random() * 10) + 10; // Daño aleatorio de la flecha
    objetivo.vida -= dano;

    console.log(
      `${this.nombre} dispara una flecha a ${objetivo.nombre} y causa ${dano} de daño.`
    );

    if (objetivo.vida <= 0) {
      console.log(`${objetivo.nombre} ha muerto.`);
    }
  }
}

// Crear personajes
let personajes = [
  new Mago("Mago 1", 100, 50, 30, 20, [
    { nombre: "Fuego", daño: 50 },
    { nombre: "Hielo", daño: 40 },
  ]),
  new Mago("Mago 2", 100, 50, 30, 20, [
    { nombre: "Fuego", daño: 50 },
    { nombre: "Hielo", daño: 40 },
  ]),
  new Guerrero("Guerrero 1", 120, 60, 40, 15, [
    { nombre: "Espada", daño: 30 },
    { nombre: "Hacha", daño: 40 },
  ]),
  new Guerrero("Guerrero 2", 120, 60, 40, 15, [
    { nombre: "Espada", daño: 30 },
    { nombre: "Hacha", daño: 40 },
  ]),
  new Arquero("Arquero", 80, 40, 25, 30, ["Flecha común", "Flecha explosiva"]),
];

// Función para iniciar el combate
function iniciarCombate() {
  while (personajes.length > 1) {
    // Ordenar personajes aleatoriamente en cada ronda
    personajes.sort(
      (a, b) =>
        Math.floor(Math.random() * a.velocidad) -
        Math.floor(Math.random() * b.velocidad)
    );

    personajes.forEach((atacante) => {
      if (atacante.vida <= 0) return;

      // Seleccionar un objetivo aleatorio diferente al atacante
      let objetivo;
      do {
        objetivo = personajes[Math.floor(Math.random() * personajes.length)];
      } while (objetivo === atacante || objetivo.vida <= 0);

      // Accion aleatoria del atacante
      if (atacante instanceof Mago) {
        let accion = Math.random();
        if (accion < 0.5) atacante.atacar(objetivo);
        else atacante.lanzarHechizo(objetivo);
      } else if (atacante instanceof Guerrero) {
        let accion = Math.random();
        if (accion < 0.5) atacante.atacar(objetivo);
        else atacante.atacarConArma(objetivo);
      } else if (atacante instanceof Arquero) {
        let accion = Math.random();
        if (accion < 0.5) atacante.atacar(objetivo);
        else atacante.dispararFlecha(objetivo);
      }

      // Eliminar personajes muertos
      personajes = personajes.filter((personaje) => personaje.vida > 0);
    });
  }

  console.log(
    `¡${personajes[0].nombre} es el último en pie y ha ganado la batalla!`
  );
}

// Iniciar el juego
iniciarCombate();
