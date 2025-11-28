// PhoneNumberField.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import CountryDialSelect, { findDial } from "./CountryDialSelect";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FormHelperText } from "@mui/material";
import MuiInput from "../input";

const onlyDigits = (s) => (s || "").replace(/\D/g, "");

const formatDisplay = (e164) => {
    try {
        const p = parsePhoneNumberFromString(e164 || "");
        return p?.formatInternational() || e164 || "";
    } catch {
        return e164 || "";
    }
};

export default function PhoneNumberField(props) {
    const {
        control,                 // RHF control (optional)
        name = "mobileNo",
        value, onChange,         // non-RHF props (optional)
        defaultCountry = "IN",
        label = "Phone Number",
        requiredMsg = "Phone number is required",
        onBlur = () => { },
        autoDetectCountryFromValue = true,
    } = props;

    const [country, setCountry] = useState(defaultCountry);
    const dialDigits = useMemo(() => onlyDigits(findDial(country)), [country]);

    useEffect(() => {
        if (!autoDetectCountryFromValue || !value) return;
        const parsed = parsePhoneNumberFromString(value || "");
        // parsed.country is like "IN", "US", etc., when the number is valid/complete
        if (parsed?.country && parsed.country !== country) {
            setCountry(parsed.country);
        }
    }, [value]);

    const handleFormatAndBuild = (raw) => {
        let digits = onlyDigits(raw);
        if (digits.startsWith(dialDigits)) digits = digits.slice(dialDigits.length);
        const full = findDial(country) + digits;
        const parsed = parsePhoneNumberFromString(full);
        return parsed?.number || full || "";
    };

    if (control) {
        // RHF path
        return (
            <Controller
                name={name}
                control={control}
                rules={{
                    required: requiredMsg,
                    validate: (v) => !!parsePhoneNumberFromString(v || "")?.isValid() || "Enter a valid phone number",
                }}
                render={({ field, fieldState }) => (
                    <MuiInput
                        label={label}
                        placeholder="+1 234 567 8900"
                        startIcon={
                            <CountryDialSelect
                                value={country}
                                onChange={(e) => { setCountry(e); field.onChange(""); }}
                            />
                        }
                        value={formatDisplay(field.value)}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={(e) => field.onChange(handleFormatAndBuild(e.target.value))}
                        onBlur={onBlur}
                        inputRef={field.ref}
                        type="text"
                    />
                )}
            />
        );
    }

    // Non-RHF controlled path
    return (
        <MuiInput
            label={label}
            placeholder="+1 234 567 8900"
            startIcon={
                <CountryDialSelect
                    value={country}
                    onChange={(e) => { setCountry(e); onChange?.({ target: { value: "" } }); }}
                />
            }
            value={formatDisplay(value)}
            onChange={(e) => onChange?.({ target: { value: handleFormatAndBuild(e.target.value) } })}
            onBlur={onBlur}
            type="text"
        />
    );
}

