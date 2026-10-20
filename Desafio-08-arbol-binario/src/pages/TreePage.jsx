
import { useState } from 'react';
import Tree from 'react-d3-tree';
import { BinarySearchTree } from '../structures/BinarySearchTree';

const valoresIniciales = [50, 30, 70, 20, 40, 60, 80];

function crearArbol() {
  const arbol = new BinarySearchTree();
  valoresIniciales.forEach((valor) => arbol.insert(valor));
  return arbol;
}

export default function TreePage() {
  const [arbol, setArbol] = useState(crearArbol);
  const [valor, setValor] = useState('');
  const [mensaje, setMensaje] = useState('');

  function agregarNumero(event) {
    event.preventDefault();
    const numero = Number(valor);

    if (valor.trim() === '' || !Number.isFinite(numero)) {
      setMensaje('Ingresa un número válido.');
      return;
    }

    if (arbol.search(numero)) {
      setMensaje('Ese número ya existe en el árbol.');
      return;
    }

    const nuevoArbol = new BinarySearchTree();
    [...arbol.inOrder(), numero].forEach((n) => nuevoArbol.insert(n));

    setArbol(nuevoArbol);
    setValor('');
    setMensaje(`Número ${numero} agregado correctamente.`);
  }

  function buscarNumero() {
    if (valor.trim() === '' || !Number.isFinite(Number(valor))) {
      setMensaje('Ingresa un número válido para buscar.');
      return;
    }

    const numero = Number(valor);
    setMensaje(
      arbol.search(numero)
        ? `El número ${numero} sí existe en el árbol.`
        : `El número ${numero} no existe en el árbol.`
    );
  }

  const datosArbol = arbol.toD3Tree();

  console.log('Recorrido inorden:', arbol.inOrder());
console.log('Recorrido preorden:', arbol.preOrder());
console.log('Recorrido postorden:', arbol.postOrder());

  return (
    <main className="panel">
      <h1>Desafío 08: Árbol binario</h1>
      <p>Agrega números, búscalos y explora la estructura del árbol.</p>

      <form className="formulario" onSubmit={agregarNumero}>
        <label>
          Número
          <input
            type="number"
            value={valor}
            onChange={(event) => setValor(event.target.value)}
            placeholder="Ej. 45"
            required
          />
        </label>

        <button type="submit">Agregar número</button>
        <button type="button" onClick={buscarNumero}>
          Buscar número
        </button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <h2>Visualización del árbol</h2>
      <div className="arbol">
        {datosArbol && (
          <Tree
            data={datosArbol}
            orientation="vertical"
            translate={{ x: 350, y: 60 }}
            zoomable
            collapsible={false}
            separation={{ siblings: 1.2, nonSiblings: 1.5 }}
          />
        )}
      </div>

      <h2>Recorridos en consola</h2>
      <p>Abre las herramientas del navegador con F12 y selecciona Console.</p>
      <ul>
        <li>Inorden: {arbol.inOrder().join(', ')}</li>
        <li>Preorden: {arbol.preOrder().join(', ')}</li>
        <li>Postorden: {arbol.postOrder().join(', ')}</li>
      </ul>
    </main>
  );
}
