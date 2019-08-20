const API_URL = process.env.REACT_APP_API_URL;

const useAddWant = (handleAddSuccess = () => {}, errorHandler = () => {}) => {
    const initiateAdd = async (thing, category, cost) => {
        const url = new URL(`${ API_URL }/want/add/`);
        
        const searchParams = new URLSearchParams();
        searchParams.append("thing", thing);
        searchParams.append("category", category);
        searchParams.append("cost", cost);

        let response;
        try {
            response = await fetch(url, {
                method: "POST",
                body: searchParams
            });
        } catch (error) {
            errorHandler("Unable to connect to server");
            return;
        }
    
        if (response.status >= 400) {
            errorHandler("Unable to add want");
            return;
        }
    
        let jsonResponse;
        try {
            jsonResponse = await response.json();
        } catch(error) {
            errorHandler("Unable to parse add want server repsonse");
            return;
        }
    
        handleAddSuccess({
            id: jsonResponse.id,
            thing,
            category,
            cost
        });
    }

    return { initiateAdd };
};

export default useAddWant;
