const BASE_URL = "https://6a0e46811736097c3609a5f9.mockapi.io/api/v1";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/movies`);
  return await res.json();
}

export async function createProduct(product) {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  return await res.json();
}

export async function updateProduct(id, changes) {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes)
  });
  return await res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/movies/${id}`, { method: 'DELETE' });
  return res.ok;
}

export async function getReservations() {
  const res = await fetch(`${BASE_URL}/reservations`);
  return await res.json();
}

export async function createReservation(reservation) {
  const res = await fetch(`${BASE_URL}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservation)
  });
  return await res.json();
}
export async function getReservationsByMovie(movieId) {
  const res = await fetch(`${BASE_URL}/reservations?movieId=${movieId}`);
  return await res.json();
}

const apiService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getReservations,
  createReservation,
  getReservationsByMovie
};

export default apiService;