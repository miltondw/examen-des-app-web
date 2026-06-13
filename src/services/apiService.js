import axios from 'axios';

const api = axios.create({
  baseURL: "https://6a0e46811736097c3609a5f9.mockapi.io/api/v1",
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function getProducts() {
  const res = await api.get('/movies');
  return res.data; 
}

export async function createProduct(product) {
  const res = await api.post('/movies', { ...product, reservations: [] });
  return res.data;
}

export async function updateProduct(id, changes) {
  const res = await api.put(`/movies/${id}`, changes);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await api.delete(`/movies/${id}`);
  return res.status === 200 || res.status === 201;
}


export async function getReservationsByMovie(movieId) {
  try {
    const res = await api.get(`/movies/${movieId}`);
    return res.data.reservations || [];
  } catch (e) {
    console.error("Error al obtener reservas de la película:", e);
    return [];
  }
}

export async function createReservation(reservation) {
  const movieRes = await api.get(`/movies/${reservation.movieId}`);
  const movie = movieRes.data;
  
  if (!movie.reservations) movie.reservations = [];
  
  const newReservation = {
    id: `res-${Date.now()}`,
    ...reservation
  };
  
  movie.reservations.push(newReservation);
  
  await api.put(`/movies/${reservation.movieId}`, { reservations: movie.reservations });

  try {
    const userRes = await api.get(`/users/${reservation.user.id}`);
    const user = userRes.data;
    
    if (!user.reservations) user.reservations = [];
    user.reservations.push(newReservation);
    
    await api.put(`/users/${reservation.user.id}`, { reservations: user.reservations });
  } catch (err) {
    console.error("Error al sincronizar la reserva en el usuario:", err);
  }

  return newReservation;
}

const apiService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getReservationsByMovie,
  createReservation
};

export default apiService;