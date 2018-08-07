/**
 * Created by Marian on 05/07/2018.
 */

let months = {
	0: 'януари',
	1: 'февруари',
	2: 'март',
	3: 'април',
	4: 'май',
	5: 'юни',
	6: 'юли',
	7: 'август',
	8: 'септември',
	9: 'октомври',
	10: 'ноември',
	11: 'декември'
};

function formatDate(inputDate) {

    let date = new Date(inputDate);

    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let day = date.getDate();

    return `${('0' + day).slice(-2)}.${('0' + months).slice(-2)}.${years}`;

}

function formatDateAndTime(inputDate) {

    let date = new Date(inputDate);

    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${('0' + day).slice(-2)}.${('0' + months).slice(-2)}.${years} ${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}`;
}


function getDay (inputDate) {
	let date = new Date(inputDate);
	let day = date.getDate();
	return day;
}

function getMonth (inputDate) {
	let date = new Date(inputDate);
	let month = months[date.getMonth()];

	return month;
}

function getYear (inputDate) {
	let date = new Date(inputDate);
	let year = date.getFullYear();

	return year;
}

export default {
    formatDate,
    formatDateAndTime,
    getDay,
	getMonth,
	getYear
}