const API_URL = process.env.REACT_APP_API_URL;

const useDeleteWant = (handleAddSuccess = () => {}, errorHandler = () => {}) => {
    const initiateDelete = async (id) => {
        const url = new URL(`${ API_URL }/want/delete/${ id }`);

        let response;
        try {
            response = await fetch(url, {
                method: "DELETE"
            });
        } catch (error) {
            errorHandler("Unable to connect to server");
            return;
        }
    
        if (response.status >= 400) {
            errorHandler("Unable to delete want");
            return;
        }
    
        let jsonResponse;
        try {
            jsonResponse = await response.json();
        } catch(error) {
            errorHandler("Unable to parse delete repsonse");
            return;
        }
    
        handleAddSuccess(jsonResponse);
    }

    return { initiateDelete };
};

export default useDeleteWant;
