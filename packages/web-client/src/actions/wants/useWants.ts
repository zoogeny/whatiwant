import { useEffect } from "react";

import { Want, ErrorHandler } from "@wiw/types";
import useListWants from "./useListWants";
import useAddWant from "./useAddWant";
import useDeleteWant from "./useDeleteWant";
import { formatCurrency } from "../../utils/formatter";

type MessageHandler = (message: string) => void;

const useWants = (
    messageHandler: MessageHandler = () => { /* nothing */ },
    errorHandler: ErrorHandler = () => { /* nothing */ },
): {
    wantList: Want[], 
    initiateAdd: (thing: string, category: string, cost: number) => void, 
    initiateDelete: (id: string) => void
} => {
    const { wantList, loadList } = useListWants(errorHandler);

    const handleAddSuccess = (addResponse: Want) => {
        messageHandler(`Added new want: ${ addResponse.thing } ($${ formatCurrency(addResponse.cost) })`);
        loadList();
    };
    const { initiateAdd } = useAddWant(handleAddSuccess, errorHandler);

    const handleDeleteSuccess = (deleteResponse: Want) => {
        messageHandler(`Deleted want: ${ deleteResponse.thing } ($${ formatCurrency(deleteResponse.cost) })`);
        loadList();
    };
    const { initiateDelete } = useDeleteWant(handleDeleteSuccess, errorHandler);

    // initial load
    useEffect(loadList, []);

    return { wantList, initiateAdd, initiateDelete };
};

export default useWants;
