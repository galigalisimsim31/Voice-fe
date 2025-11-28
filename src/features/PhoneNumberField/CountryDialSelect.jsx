// CountryDialSelect.jsx
import { Select, MenuItem, Box } from "@mui/material";
import countriesList from '../../assets/json/countriesminified.json';
import CountryFlag from "../countryFlag";
import styles from "./index.module.css";

const countryList = countriesList?.map(x => {
    return {
        code: x?.iso2,
        dial: `+${x?.phone_code}`,
        label: x?.name,
        flag: x?.emoji
    }
});

export const findDial = (code) =>
    countryList.find((c) => c.code === code)?.dial || "+91";


export default function CountryDialSelect({ value, onChange }) {

    return (
        <Select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            variant="standard"
            disableUnderline
            sx={{
                minWidth: 98,
                ".MuiSelect-select": { padding: 0, pr: 1, fontWeight: 500 },
                color: "red"
            }}
            MenuProps={{ PaperProps: { style: { maxHeight: 320 } } }}
            className={styles.country_select}
        >
            {countryList.map((c) => (
                <MenuItem key={c.code} value={c.code}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CountryFlag countryName={c.label} size={20} />
                        <span>{c.dial}</span>
                    </Box>
                </MenuItem>
            ))}
        </Select>
    );
}
