const productos = [
  { id: 1, nombre: "Café 250g", precio: 31000 },
  { id: 2, nombre: "Café 500g", precio: 56000 },
  { id: 3, nombre: "Frutos rojos deshidratados", precio: 18000 },
  { id: 4, nombre: "Frutos amarillos deshidratados", precio: 17000 },
  { id: 5, nombre: "Frutos verdes deshidratados", precio: 16000 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Convertimos a objeto con cantidades
carrito = carrito.reduce((acc, p) => {
  const existe = acc.find(item => item.id === p.id);
  if (existe) {
    existe.cantidad++;
  } else {
    acc.push({...p, cantidad: 1});
  }
  return acc;
}, []);

actualizarCarrito();

actualizarCarrito(); // Mostrar carrito al cargar la página

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({...producto, cantidad: 1});
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  // 1️⃣ Contador total de productos
  const totalProductos = carrito.reduce((sum, p) => sum + p.cantidad, 0);
  document.getElementById("contador").innerText = totalProductos;

  // 2️⃣ Lista de productos con botones +, - y eliminar
const lista = carrito.map(p => `
  <p>
    ${p.nombre} - $${(p.precio * p.cantidad).toLocaleString()} COP
    <span>
      <button class="carrito-btn" onclick="cambiarCantidad(${p.id}, -1)">-</button>
      ${p.cantidad}
      <button class="carrito-btn" onclick="cambiarCantidad(${p.id}, 1)">+</button>
      <button class="carrito-btn eliminar" onclick="eliminarProducto(${p.id})">🗑️</button>
    </span>
  </p>
`).join("");

  document.getElementById("carrito-lista").innerHTML = lista;

  // 3️⃣ Total del carrito
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  document.getElementById("carrito-total").innerText = `Total: $${total.toLocaleString()} COP`;

  // 4️⃣ Botón vaciar carrito
  if (carrito.length > 0) {
    document.getElementById("carrito-lista").innerHTML += `<button onclick="vaciarCarrito()">Vaciar carrito</button>`;
  }
}
function cambiarCantidad(id, cambio) {
  const producto = carrito.find(p => p.id === id);
  if (!producto) return;

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarCarrito();
}
// Cafés
document.getElementById("cafe").innerHTML = `
  <div class="productos-contenedor">
    <div class="producto">
      <img src="cafe-250.jpg" alt="Café 250g">
      <p><strong>Café 250g</strong> – Disfruta el sabor de la frescura del campo con nuestro café gourmet. 100% colombiano. – $31.000 COP</p>

      <button onclick="agregarAlCarrito(1)">Agregar al carrito</button>
    </div>
    <div class="producto">
      <img src="cafe-500.jpg" alt="Café 500g">
      <p><strong>Café 250g</strong> – Disfruta el sabor de la frescura del campo con nuestro café gourmet. 100% colombiano. – $56.000 COP</p>
      <button onclick="agregarAlCarrito(2)">Agregar al carrito</button>
    </div>
  </div>
`;

// Frutas
document.getElementById("frutas").innerHTML = `
  <div class="productos-contenedor">
    <div class="producto">
      <img src="frutos-rojos.jpg" alt="Frutos Rojos">
      <p>🍓 Frutos rojos deshidratados</p>
      <button onclick="agregarAlCarrito(3)">Agregar al carrito</button>
    </div>
    <div class="producto">
      <img src="frutos-amarillos.jpg" alt="Frutos Amarillos">
      <p>🍍 Frutos amarillos deshidratados</p>
      <button onclick="agregarAlCarrito(4)">Agregar al carrito</button>
    </div>
    <div class="producto">
      <img src="frutos-verdes.jpg" alt="Frutos Verdes">
      <p>🥝 Frutos verdes deshidratados</p>
      <button onclick="agregarAlCarrito(5)">Agregar al carrito</button>
    </div>
  </div>
`;
