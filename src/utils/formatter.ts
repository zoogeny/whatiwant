
export const formatCurrency = (amount: number) => {
    const negativeSign = amount < 0 ? "-" : "";
    const amountAsString = Math.abs(amount).toString();
    const prefixLength = (amountAsString.length > 3) ? amountAsString.length % 3 : 0;
    const prefix = prefixLength ? `${ amountAsString.substr(0, prefixLength) },` : "";
    const rest = amountAsString.substr(prefixLength).replace(/(\d{3})(?=\d)/g, "$1,");

    return `${ negativeSign }${ prefix }${ rest }`;
};
