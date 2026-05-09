const PRODUCTS_KEY = "app_products_v1";

async function seedProductsIfNeeded() {
  const existing = localStorage.getItem(PRODUCTS_KEY);
  if (existing) return JSON.parse(existing);

  try {
    const res = await fetch("/data/products.json");
    const data = await res.json();
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data));
    return data;
  } catch (e) {
    console.error("No se pudo cargar products.json:", e);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
    return [];
  }
}

export async function getProducts() {
  await seedProductsIfNeeded();
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]");
}

export async function createProduct(product) {
  const list = await getProducts();
  const id = (list.reduce((m, p) => Math.max(m, p.id), 0) || 0) + 1;
  const newItem = { ...product, id };
  list.push(newItem);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
  return newItem;
}

export async function updateProduct(id, changes) {
  const list = await getProducts();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Producto no encontrado");
  list[idx] = { ...list[idx], ...changes };
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
  return list[idx];
}

export async function deleteProduct(id) {
  const list = await getProducts();
  const filtered = list.filter((p) => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
  return true;
}

export default {
  seedProductsIfNeeded,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
