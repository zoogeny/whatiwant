import { useState, useCallback } from "react";

import { Want, ErrorHandler } from "@wiw/types";

const API_URL = process.env.REACT_APP_API_URL;

const useListWants = (
    errorHandler: ErrorHandler,
): {
    wantList: Want[], 
    loadList: () => void
} => {
    const [ wantList, setWantList ] = useState<Want[]>([]);

    // NOTE: useCallback allows the reuse of logic for loading the document
    // list both in the useEffect case as well as within an action
    const loadList = useCallback(() => {
        // NOTE: we have to wrap the async call since useEffect has specific
        // requirements on return types and promises are not valid return types
        const wrappedCall = async () => {
            const url = new Request(`${ API_URL }/want/list`);

            let response;
            try {
                response = await fetch(url);
            } catch (error) {
                errorHandler("Unable to connect to server");
                return;
            }

            if (response.status >= 400) {
                errorHandler("Unable to load want list");
                return;
            }

            let responseJson;
            try {
                responseJson = await response.json();
            } catch (error) {
                errorHandler("Unable to parse want list");
                return;
            }

            setWantList(responseJson.wants);
        };

        wrappedCall();
    }, [ errorHandler ]);

    return { wantList, loadList };
};

export default useListWants;
