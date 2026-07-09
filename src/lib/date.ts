export function inputDateToUtc(value: string) {
  return new Date(`${value}T12:00:00.000Z`);
}

export function todayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric"
  }).format(value);
}

export function formatInputDate(value: Date) {
  return value.toISOString().slice(0, 10);
}
