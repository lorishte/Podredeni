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

function calculatePriceAfterDiscount(price, discount) {
    price = Number(price);
    discount = Number(discount);

    return discount > 0 ? price - discount / 100 * price : price;
}

function formatDate(inputDate) {

    let date = new Date(inputDate);

    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let day = date.getDate();

    return `${('0' + day).slice(-2)}.${('0' + months).slice(-2)}.${years}`;

}

function formatDateYearFirst(inputDate) {

    let date = new Date(inputDate);

    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let day = date.getDate();

    return `${years}-${('0' + months).slice(-2)}-${('0' + day).slice(-2)}`;

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

function getDay(inputDate) {
    let date = new Date(inputDate);
    let day = date.getDate();
    return day;
}

function getMonth(inputDate) {
    let date = new Date(inputDate);
    let month = months[date.getMonth()];

    return month;
}

function getYear(inputDate) {
    let date = new Date(inputDate);
    let year = date.getFullYear();

    return year;
}

function getVideoDescription(input) {
    let indexOfDescriptionFirstLetter = getPosition(input, ' ', 2) + 1;

    return input.substr(indexOfDescriptionFirstLetter);
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

function createStateCopy(state) {
    return JSON.parse(JSON.stringify(state))
}

function generateRouteName(name) {
    let transliterated = transliterate(name.toLowerCase()).split(' ').filter(w => w !== '').join('_')
    return transliterated
}


function transliterate(word){
    return word.split('').map(function (char) {
        return chars[char] || char;
    }).join("");
}

const sefUrls = {
    'aksesoari_i_ochila': '2d256711-5f08-4d68-ba1a-30311f0b9c6f',
    'vakantsiya_i_sport': '92e8f56e-1a18-46bb-be40-633559284cdc',
    'smart_kuhnenski_uredi': '58a4edb3-4946-4f28-bd62-c18e7d763099'
}


export default {
    calculatePriceAfterDiscount,
    formatDate,
    formatDateAndTime,
    formatDateYearFirst,
    getDay,
    getMonth,
    getYear,
    getVideoDescription,
    createStateCopy,
    generateRouteName,
    sefUrls
}

const chars = {
    "а":"a",
    "б":"b",
    "в":"v",
    "г":"g",
    "д":"d",
    "е":"e",
    "ж":"zh",
    "з":"z",
    "и":"i",
    "й":"y",
    "к":"k",
    "л":"l",
    "м":"m",
    "н":"n",
    "о":"o",
    "п":"p",
    "р":"r",
    "с":"s",
    "т":"t",
    "у":"u",
    "ф":"f",
    "х":"h",
    "ц":"ts",
    "ч":"ch",
    "ш":"sh",
    "щ":"sht",
    "ъ":"u",
    "ь":"i",
    "ю":"yu",
    "я":"ya",
};

