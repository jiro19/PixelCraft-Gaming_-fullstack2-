const API_URL = "http://172.25.240.1:8080/api/v1";

const getHeaders = (auth = false) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (auth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const loginUsuario = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Credenciales incorrectas");
  const data = await response.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("usuario", JSON.stringify(data));
  return data;
};

export const registrarUsuario = async (datos) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify(datos),
  });
  if (!response.ok) throw new Error("Error al registrar usuario");
  return response.json();
};

export const cerrarSesion = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
};


export const obtenerProductos = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) throw new Error("Error al cargar productos");
  return response.json();
};

export const obtenerCategorias = async () => {
  const response = await fetch(`${API_URL}/categorias`);
  if (!response.ok) throw new Error("Error al cargar categorías");
  return response.json();
};


export const crearProducto = async (producto) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(producto),
  });
  if (!response.ok) throw new Error("No autorizado o error al crear producto");
  return response.json();
};
export const actualizarProducto = async (id, producto) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(producto),
  });
  if (!response.ok) throw new Error("No autorizado o error al actualizar producto");
  return response.json();
};
export const eliminarProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
    headers: getHeaders(true),
  });
  if (!response.ok) throw new Error("Solo ADMIN puede eliminar productos");
};


export const generarBoleta = async (usuarioId, items) => {
  const response = await fetch(`${API_URL}/boletas`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify({ usuarioId, items }),
  });
  if (!response.ok) throw new Error("Error al procesar la compra");
  return response.json();
};

export const obtenerBoletasUsuario = async (usuarioId) => {
  const response = await fetch(`${API_URL}/boletas/usuario/${usuarioId}`, {
    headers: getHeaders(true),
  });
  if (!response.ok) throw new Error("Error al cargar historial de compras");
  return response.json();
};