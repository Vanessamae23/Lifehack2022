export const getChatTime = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    if(minute < 10) {
        return `${hour} : 0${minute}`
    } 
    return `${hour} : ${minute}`
}

export const setDateChat = (today) => {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${year}-${month}-${date}`
} 