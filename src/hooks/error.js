import { useState, useEffect } from "react";

export const useLocalError = (err) => {
    const [localError, setLocalError] = useState("");

    useEffect(() => {
        let errorTimer;

        // Set localError when err changes
        if (err) {
            setLocalError(err);
        }

        // Clear localError after 3 seconds if it's set
        if (localError) {
            errorTimer = setTimeout(() => {
                setLocalError("");
            }, 3000);
        }

        // Cleanup timer on component unmount or when dependencies change
        return () => {
            if (errorTimer) clearTimeout(errorTimer);
        };
    }, [err, localError]); // Only depend on err and localError

    return { localError, setLocalError };
};
