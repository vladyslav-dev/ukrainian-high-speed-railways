export const isValidDate = (date: Date): boolean => {
    return !isNaN(date.getTime());
}