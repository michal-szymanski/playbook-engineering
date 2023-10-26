export const convertAmount = (amount: number, conversionRate: number) => {
    const value = amount / conversionRate;
    const [beforeDot, afterDot] = value.toString().split('.');

    if (!afterDot) {
        return Number(beforeDot);
    }

    return Number(`${beforeDot}.${afterDot.substring(0, 2)}`);
};
