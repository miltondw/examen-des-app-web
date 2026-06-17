import axios from 'axios';

const api = axios.create({
  baseURL: "https://6a0e46811736097c3609a5f9.mockapi.io/api/v1",
  headers: {
    'Content-Type': 'application/json'
  }
});

function getLocalReservations() {
  if (typeof window === 'undefined' || !window.localStorage) return {}
  try {
    return JSON.parse(window.localStorage.getItem('local_reservations') || '{}')
  } catch (err) {
    console.error('Error leyendo las reservas locales:', err)
    return {}
  }
}

function saveLocalReservations(data) {
  if (typeof window === 'undefined' || !window.localStorage) return
  try {
    window.localStorage.setItem('local_reservations', JSON.stringify(data))
  } catch (err) {
    console.error('Error guardando las reservas locales:', err)
  }
}

function addLocalReservation(movieId, reservation) {
  const local = getLocalReservations()
  const key = String(movieId)
  if (!Array.isArray(local[key])) local[key] = []
  local[key].push(reservation)
  saveLocalReservations(local)
}

async function getMovieById(movieId) {
  const res = await api.get('/movies', { params: { id: movieId } })
  const movies = res.data || []
  return Array.isArray(movies) ? movies[0] : null
}

export async function getProducts() {
  const res = await api.get('/movies');
  const movies = res.data || []
  const localReservations = getLocalReservations()
  // Normalizar para evitar errores cuando MockAPI no tenga campos esperados
  return movies.map((m, idx) => ({
    ...m,
    id: m.id,
    showtimes: Array.isArray(m.showtimes) ? m.showtimes.map((s, i) => ({ id: s.id ?? `st-${m.id}-${i}`, time: s.time, price: s.price, availableSeats: s.availableSeats })) : [],
    reservations: Array.isArray(m.reservations) ? [...m.reservations, ...(localReservations[String(m.id)] || [])] : [...(localReservations[String(m.id)] || [])]
  }))
}

export async function createProduct(product) {
  const payload = { ...product, reservations: [] }
  // Ensure showtimes have ids
  if (Array.isArray(payload.showtimes)) {
    payload.showtimes = payload.showtimes.map((s, i) => ({ id: s.id ?? `st-${Date.now()}-${i}`, time: s.time, price: s.price, availableSeats: s.availableSeats }))
  }
  const res = await api.post('/movies', payload)
  return res.data
}

export async function updateProduct(id, changes) {
  // Fetch existing, merge and PUT full object to preserve nested arrays
  const existingRes = await api.get(`/movies/${id}`)
  const existing = existingRes.data || {}
  const merged = { ...existing, ...changes }
  if (Array.isArray(merged.showtimes)) {
    merged.showtimes = merged.showtimes.map((s, i) => ({ id: s.id ?? `st-${id}-${i}`, time: s.time, price: s.price, availableSeats: s.availableSeats }))
  } else {
    merged.showtimes = []
  }
  if (!Array.isArray(merged.reservations)) merged.reservations = existing.reservations || []
  const res = await api.put(`/movies/${id}`, merged)
  return res.data
}

export async function deleteProduct(id) {
  const res = await api.delete(`/movies/${id}`);
  return res.status === 200 || res.status === 201;
}

export async function getUsers() {
  const res = await api.get('/users');
  return res.data;
}

export async function createUser(user) {
  const payload = { ...user, reservations: user.reservations || [] };
  const res = await api.post('/users', payload);
  return res.data;
}

export async function updateUser(id, changes) {
  const res = await api.put(`/users/${id}`, changes);
  return res.data;
}

export async function deleteUser(id) {
  const res = await api.delete(`/users/${id}`);
  return res.status === 200 || res.status === 201;
}

export async function getReservations() {
  const res = await api.get('/movies');
  const movies = res.data || [];
  const localReservations = getLocalReservations()
  const reservations = movies.flatMap((movie) => {
    const apiRes = (movie.reservations || []).map((reservation) => ({
      ...reservation,
      movieId: movie.id,
      movieTitle: movie.title,
    }))
    const localRes = (localReservations[String(movie.id)] || []).map((reservation) => ({
      ...reservation,
      movieId: movie.id,
      movieTitle: movie.title,
    }))
    return [...apiRes, ...localRes]
  });
  return reservations;
}

export async function getReservationsByMovie(movieId) {
  try {
    const movie = await getMovieById(movieId)
    const apiReservations = movie?.reservations || []
    const localReservations = getLocalReservations()[String(movieId)] || []
    return [...apiReservations, ...localReservations]
  } catch (e) {
    console.error('Error al obtener reservas de la película:', e)
    return getLocalReservations()[String(movieId)] || []
  }
}

export async function createReservation(reservation) {
  if (!reservation || !reservation.movieId) {
    throw new Error('movieId is required to create a reservation')
  }
  if (!reservation.user || !reservation.user.id) {
    throw new Error('reservation.user.id is required to create a reservation')
  }

  const movie = await getMovieById(reservation.movieId)

  if (!movie) throw new Error('Movie not found')
  if (!Array.isArray(movie.reservations)) movie.reservations = []

  const newReservation = {
    id: `res-${Date.now()}`,
    ...reservation,
    createdAt: new Date().toISOString()
  }

  movie.reservations.push(newReservation)

  // Actualizar la película en MockAPI si es posible
  try {
    await api.put(`/movies/${movie.id}`, movie)
  } catch (err) {
    console.error('Error al guardar la reserva en MockAPI, usando almacenamiento local como fallback:', err)
    addLocalReservation(movie.id, newReservation)
  }

  try {
    const userRes = await api.get(`/users/${reservation.user.id}`)
    const user = userRes.data
    if (user) {
      if (!Array.isArray(user.reservations)) user.reservations = []
      user.reservations.push(newReservation)
      await api.put(`/users/${reservation.user.id}`, user)
    }
  } catch (err) {
    console.error('Error al sincronizar la reserva en el usuario:', err)
  }

  return newReservation
}

const apiService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getReservations,
  getReservationsByMovie,
  createReservation
};

export default apiService;