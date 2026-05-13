export function formatShowtime(value) {
  if (!value) return "Sin horario";

  const text = String(value).trim();

  const ampmMatch = text.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (ampmMatch) {
    const hour = Number(ampmMatch[1]);
    const minutes = ampmMatch[2] ?? "00";
    const meridiem = ampmMatch[3].toLowerCase();
    return `${hour}:${minutes}${meridiem}`;
  }

  const twentyFourHourMatch = text.match(/^(\d{1,2}):(\d{2})$/);
  if (!twentyFourHourMatch) return text;

  const hour24 = Number(twentyFourHourMatch[1]);
  const minutes = twentyFourHourMatch[2];
  const meridiem = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12 || 12;

  return `${hour12}:${minutes}${meridiem}`;
}

export function formatMoney(value) {
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) return "$0";

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);
}
