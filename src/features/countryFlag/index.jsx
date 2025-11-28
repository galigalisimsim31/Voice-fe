import ReactCountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

const ALIASES = {
  usa: "US",
  "united states": "US",
  uk: "GB",
  "south korea": "KR",
  "north korea": "KP",
  russia: "RU",
  "czech republic": "CZ",
  "côte d’ivoire": "CI",
  "cote d'ivoire": "CI",
};

function nameToAlpha2(name = "") {
  const clean = name.trim();
  let code = countries.getAlpha2Code(clean, "en");
  if (!code) {
    const key = clean.toLowerCase().replace(/\./g, "");
    code = ALIASES[key];
  }
  return code || null;
}

export default function CountryFlag({ countryName, size = 24, title = true }) {
  const code = nameToAlpha2(countryName);
  if (!code) return <label>{"NA"}</label>;

  return (
    <ReactCountryFlag
      svg
      countryCode={code}
      style={{ width: size, height: size, borderRadius: 4, display: "inline-block" }}
      title={title ? `Flag of ${countryName}` : undefined}
      aria-label={`Flag of ${countryName}`}
    />
  );
}
