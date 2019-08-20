import { useEffect } from "react";
import useListWants from "./useListWants";
import useAddWant from "./useAddWant";
import useDeleteWant from "./useDeleteWant";
import { formatCurrency } from "../../utils/formatter";

const useWants = (messageHandler = () => {}, errorHandler = () => {}) => {
    const { wantList, loadList } = useListWants(errorHandler);

    const handleAddSuccess = (addResponse) => {
        messageHandler(`Added new want: ${ addResponse.thing } ($${ formatCurrency(addResponse.cost) })`);
        loadList();
    };
    const { initiateAdd } = useAddWant(handleAddSuccess, errorHandler);

    const handleDeleteSuccess = (deleteResponse) => {
        messageHandler(`Deleted want: ${ deleteResponse.thing } ($${ formatCurrency(deleteResponse.cost) })`);
        loadList();
    };
    const { initiateDelete } = useDeleteWant(handleDeleteSuccess, errorHandler);

    // initial load
    useEffect(loadList, []);

    return { wantList, initiateAdd, initiateDelete };
};

export default useWants;
