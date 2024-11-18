import { useState } from "react";

const useRandomId = (length: number = 8): number => {
    const [randomId] = useState(() => {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10); 
        }
        return parseInt(result, 10); 
    });

    return randomId;
};

export default useRandomId;