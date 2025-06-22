export default function getInitials(string) {

    if (!string || typeof string !== 'string' || string.trim() === '') {
        return '';
    }


    const cleanString = string.trim();

    if (cleanString.includes(' ')) {
        const parts = cleanString.split(/\s+/); 

        const firstLetter = parts[0]?.[0] || '';
        const secondLetter = parts[1]?.[0] || '';
        return firstLetter.toUpperCase() + secondLetter.toUpperCase();
    } else {

        return cleanString[0].toUpperCase() + cleanString[1].toUpperCase();
    }
}