/**
 * Created by Marian on 05/07/2018.
 */

function formatDate(inputDate) {

    let date = new Date(inputDate);

    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let day = date.getDate();

    return `${'0' + (day.toString()).slice(-2)}.${'0' + (months.toString()).slice(-2)}.${years}`;

}

export default {
    formatDate
}