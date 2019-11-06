import { Want, ErrorHandler } from "../../types";

const API_URL = process.env.REACT_APP_API_URL;

type DeleteSuccessHandler = (want: Want) => void;

const useDeleteWant = (
    handleDeleteSuccess: DeleteSuccessHandler,
    errorHandler: ErrorHandler,
) => {
    const initiateDelete = async (id: string) => {
        const url = new Request(`${ API_URL }/want/delete/${ id }`);

        let response;
        try {
            response = await fetch(url, {
                method: "DELETE",
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
        } catch (error) {
            errorHandler("Unable to parse delete repsonse");
            return;
        }

        handleDeleteSuccess(jsonResponse);
    };

    return { initiateDelete };
};

export default useDeleteWant;
