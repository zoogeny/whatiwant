
export type ErrorHandler = (message: string) => void;

export type Want = {
    id: string,
    thing: string,
    category: string,
    cost: number,
};

export type Message = {
    type: string;
    content: string;
    messageId: number;
};
