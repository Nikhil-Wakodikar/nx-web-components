export const checkDateValidity = (date: string): boolean => {
    const dateRegex: RegExp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;  // For DD/MM/YYYY format
    // return !isNaN(new Date(date).getDate())  // Generic way to check the validity of date
    return dateRegex.test(date);
}

export const checkAgeValidity = (date: string, lowerLimit: number, upperLimit: number): boolean => {
    if (!date) return false;

    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= lowerLimit && age <= upperLimit
}