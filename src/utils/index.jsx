import countriesList from '../assets/json/countriesminified.json';


const MESSAGES = {
  required: "Password is required.",
  min: "Password must be at least 8 characters.",
  lower: "Password must contain at least one lowercase letter.",
  upper: "Password must contain at least one uppercase letter.",
  number: "Password must contain at least one number.",
  special: "Password must contain at least one special character.",
};

export function validatePassword(password) {
  if (!password || typeof password !== "string") {
    return { ok: false, errors: [MESSAGES.required] };
  }

  if (password.length < 8) return MESSAGES.min;
  if (!/[a-z]/.test(password)) return MESSAGES.lower;
  if (!/[A-Z]/.test(password)) return MESSAGES.upper;
  if (!/[0-9]/.test(password)) return MESSAGES.number;
  if (!/[^a-zA-Z0-9]/.test(password)) return MESSAGES.special;

  return "";
}

export function isNumber(val) {
  return typeof val === "number" && Number.isFinite(val);
}

export const getCurrencySymbol = (currency = "USD") => {
  const single = countriesList.find(c => c.iso2 === currency);
  return single?.currency_symbol ? single.currency_symbol : "$";
}

export const getCurrencyName = (currency = "USD") => {
  const single = countriesList.find(c => c.iso2 === currency);
  return single?.currency ? single.currency : "USD";
}

export const getAmountFormatValue = (amount = 0) => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}