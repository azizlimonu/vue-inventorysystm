export const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-EN', { day: 'numeric', month: 'long', year: 'numeric' })
}