// utils/amountToWordsINR.js
const BELOW_TWENTY = [
  "zero","one","two","three","four","five","six","seven","eight","nine",
  "ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen",
  "seventeen","eighteen","nineteen"
];
const TENS = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

function twoDigitsToWords(n) {
  if (n < 20) return BELOW_TWENTY[n];
  const t = Math.floor(n / 10), o = n % 10;
  return TENS[t] + (o ? "-" + BELOW_TWENTY[o] : "");
}

function threeDigitsToWords(n) {
  if (n < 100) return twoDigitsToWords(n);
  const h = Math.floor(n / 100), rem = n % 100;
  return (
    BELOW_TWENTY[h] +
    " hundred" +
    (rem ? " and " + twoDigitsToWords(rem) : "")
  );
}

// Supports up to 99,99,99,99,99,999 (kharab scale)
function integerToIndianWords(n, useAndBeforeLast = true) {
  if (n === 0) return "zero";
  const units = [
    { div: 100000000000, name: "kharab" },
    { div: 1000000000,   name: "arab"   },
    { div: 10000000,     name: "crore"  },
    { div: 100000,       name: "lakh"   },
    { div: 1000,         name: "thousand" }
  ];
  let parts = [];
  for (const u of units) {
    const q = Math.floor(n / u.div);
    if (q) {
      parts.push((q < 100 ? twoDigitsToWords(q) : threeDigitsToWords(q)) + " " + u.name);
      n %= u.div;
    }
  }
  if (n) {
    if (useAndBeforeLast && n < 100 && parts.length) {
      parts.push("and " + twoDigitsToWords(n));
    } else {
      parts.push(threeDigitsToWords(n));
    }
  }
  return parts.join(" ");
}

function toTitleCase(s) {
  return s.replace(/\b[a-z]/g, c => c.toUpperCase()).replace(/\bAnd\b/g, "and"); // keep 'and' lower
}

/**
 * Convert a number to Indian currency words.
 * @param {number|string} amount
 * @param {{titleCase?: boolean, addOnly?: boolean}} opts
 * @returns {string}
 */
export function amountToWords(amount, opts = {}) {
  const { titleCase = true, addOnly = true } = opts;
  if (amount === null || amount === undefined || amount === "") return "";

  let num = Number(amount);
  if (!Number.isFinite(num)) return "";

  const sign = num < 0 ? "Minus " : "";
  num = Math.abs(num);

  const rupees = Math.floor(num);
  const paise  = Math.round((num - rupees) * 100); // 2-dec rounding

  let words = rupees === 0
    ? "zero"
    : integerToIndianWords(rupees, true);

  let out = `${sign} ${words}`;
  if (paise > 0) {
    out += ` and ${twoDigitsToWords(paise)} paise`;
  }
  if (titleCase) out = toTitleCase(out);
  if (addOnly && paise === 0) out += " Only";

  return out;
}
