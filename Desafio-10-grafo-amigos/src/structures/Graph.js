
class Graph {
  constructor() {
    this.nodes = [];
    this.links = [];
    this.people = [];
    this.cities = [];
  }

  addCity(name) {
    const cityExists = this.cities.some(
      (city) => city.name.toLowerCase() === name.toLowerCase()
    );

    if (cityExists) return;

    const city = {
      id: `city-${name.toLowerCase().replace(/\s+/g, "-")}`,
      name,
      type: "city",
    };

    this.cities.push(city);
    this.nodes.push({
      id: city.id,
      name: city.name,
      type: "city",
    });
  }

  addPerson(name, age, cityName) {
    const city = this.cities.find(
      (item) => item.name.toLowerCase() === cityName.toLowerCase()
    );

    if (!city) {
      throw new Error(`La ciudad ${cityName} no existe en el grafo.`);
    }

    const person = {
      id: `person-${this.people.length + 1}`,
      name,
      age,
      city: city.name,
      type: "person",
    };

    this.people.push(person);
    this.nodes.push({
      id: person.id,
      name: `${person.name} (${person.age} años)`,
      type: "person",
    });

    this.links.push({
      source: person.id,
      target: city.id,
    });
  }

  getPeopleByCity(cityName) {
    return this.people.filter(
      (person) => person.city.toLowerCase() === cityName.toLowerCase()
    );
  }

  getGraphData() {
    return {
      nodes: this.nodes,
      links: this.links,
    };
  }
}

export default Graph;
