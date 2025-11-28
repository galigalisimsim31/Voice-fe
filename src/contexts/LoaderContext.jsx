import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

let _setLoading = () => { };

export const useLoader = () => useContext(LoaderContext);

export const setGlobalLoading = (state) => _setLoading?.(state); // ✅ usable anywhere

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    _setLoading = setLoading; // ✅ assign reference

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};
