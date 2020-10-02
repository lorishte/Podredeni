import utils from '../../utils/utils'

import productsService from "../../services/products/productsService";


// Get all products from server - in case there have been made corrections in product names
// const state = {
//     products: [],
//     newProductsOrder: [],
// };
//
// let productSefUrlsServer = {}
//
// productsService
//     .loadProducts(state, true)
//     .then(res => {
//
//         res.products.map(p => {
//             let key = '[utils.generateRouteName(' + '"' + p.name + '"' + ')]'
//             productSefUrlsServer[key] = p.id
//         })
//     })

const categorySefUrls = {
    [utils.generateRouteName('Аксесоари и очила')]: '2d256711-5f08-4d68-ba1a-30311f0b9c6f',
    [utils.generateRouteName('Ваканция и спорт')]: '92e8f56e-1a18-46bb-be40-633559284cdc',
    [utils.generateRouteName('Смарт кухненски уреди')]: '58a4edb3-4946-4f28-bd62-c18e7d763099'
}

const productSefUrls = {
    [utils.generateRouteName(" Еко бързосъхнещи шорти Корал")]: "a896c05e-3e88-42c3-a977-3262300aaad3",
    [utils.generateRouteName(" Плоча  за натурално размразяване ThawTHAT")]: "f9d71ea4-cf35-43d8-bbc8-2cc51a3cdbd6",
    [utils.generateRouteName("Mагнитен клипс Черен")]: "96d0e2d2-b543-4f3a-b356-b123aaf81b9f",
    [utils.generateRouteName("Бързосъхнеща  кърпа Cabana Beach  Синя ")]: "4165456b-83f3-4961-8443-a2f616abb750",
    [utils.generateRouteName("Бързосъхнеща  кърпа Classic Лилаво")]: "b9a3233f-35c5-4abd-b878-11d57586be39",
    [utils.generateRouteName("Бързосъхнеща кърпа  Синьо&Червено")]: "b78e588c-6d23-4f28-b09e-9842a3fe8068",
    [utils.generateRouteName("Бързосъхнеща кърпа Cabana Beach Жълта")]: "73c6f4a5-838e-4f90-920f-cd7fe892951c",
    [utils.generateRouteName("Бързосъхнеща кърпа Cabana Beach Зелена")]: "9aff4cac-d8f9-489b-907a-2c4ddf77d6c7",
    [utils.generateRouteName("Бързосъхнеща кърпа Cabana Beach Оранж")]: "6809a53e-c6ea-4f5f-a606-a1aa4db65c70",
    [utils.generateRouteName("Бързосъхнеща кърпа Cabana Beach Розова ")]: "ceded535-9a75-4d69-96e2-07d19b742bc0",
    [utils.generateRouteName("Бързосъхнеща кърпа Cabana Beach Червен Корал")]: "992aebe6-e600-4bc9-b2fd-84023d4f6d74",
    [utils.generateRouteName("Бързосъхнеща кърпа Summer Beach Дъга ")]: "0d2af795-b20a-41ab-8974-6bf8fcae55af",
    [utils.generateRouteName("Бързосъхнеща кърпа Summer Sway")]: "ea492fd1-984c-44c9-95dd-2a0c85610a54",
    [utils.generateRouteName("Бързосъхнеща кърпа Summer Зелено Лято ")]: "15c67d93-70e8-4d35-9c1e-d05cce2288f1",
    [utils.generateRouteName("Бързосъхнеща кърпа Summer Лавандула ")]: "3e08389d-f686-4da3-9432-c57b2cd4af44",
    [utils.generateRouteName("Бързосъхнеща кърпа Зелено&Оранж")]: "37c461c3-5ebf-4d12-853e-b79cbd7f7d92",
    [utils.generateRouteName("Бързосъхнеща кърпа Лилаво/Розово")]: "604b291b-b6e8-409c-8be6-f5ec4bbb8323",
    [utils.generateRouteName("Бързосъхнеща кърпа Синьо&Жълто")]: "5ffc07ea-fdca-4845-ad7e-531f76155c40",
    [utils.generateRouteName("Двустенна чаша за запазване на температурата ChillTHAT")]: "570d0dda-4dd9-48a4-9fa9-f1838aaf039b",
    [utils.generateRouteName("Детско пончо Dock&Bay UK Жълто ")]: "cbdf66d2-5a19-48aa-a5d2-b21c581ced50",
    [utils.generateRouteName("Детско пончо Dock&Bay UK Корал")]: "9997e45f-900e-4b26-a71c-c26636ee15e8",
    [utils.generateRouteName("Детско пончо Dock&Bay UK Пинк ")]: "06d92090-4b1d-4df6-8485-58aa1b0f6e3f",
    [utils.generateRouteName("Детско пончо Dock&Bay UK Сиво")]: "3e1b033a-4195-4563-a336-52bcca508043",
    [utils.generateRouteName("Детско пончо Dock&Bay UK Синьо ")]: "2de6ddbd-7c92-40ba-8210-f1580ec6e1b4",
    [utils.generateRouteName("Дизайнерски клипс  Стрела")]: "97bc4e15-63b6-47f6-8f78-37714b345e51",
    [utils.generateRouteName("Дизайнерски клипс Криле GOLD")]: "fe4882cc-3b44-4c19-90ce-d678ebbdac94",
    [utils.generateRouteName("Дизайнерски клипс Панделка GOLD")]: "90654c36-581b-401c-b3d6-b3343c4e3aff",
    [utils.generateRouteName("Дизайнерски клипс Панделка")]: "8e339b6e-91e0-48a1-80ee-e0390951dc11",
    [utils.generateRouteName("Дизайнерски клипс Пеперуди GOLD")]: "907c10de-8576-4a10-a291-1277254e8a6b",
    [utils.generateRouteName("Дизайнерски клипс Пеперуди")]: "02f4575c-fea9-4a67-b531-ac8393b8cef7",
    [utils.generateRouteName("Дизайнерски клипс Перо")]: "785372e7-bb77-429e-82ad-b922000b7631",
    [utils.generateRouteName("Дизайнерски клипс Сърца GOLD")]: "c13bc442-f8c6-4df3-8a4e-96d655026895",
    [utils.generateRouteName("Дизайнерски клипс Сърца")]: "ba6162ea-6840-40bf-8c78-07afb31ea5be",
    [utils.generateRouteName("Еко бързосъхнещи шорти  Морско синьо ")]: "3c57eeb8-41b7-471d-8078-34a310f7dd06",
    [utils.generateRouteName("Еко бързосъхнещи шорти Дъга - изчерпан")]: "418ffa90-c1ae-4c5f-8084-272b2307e1c1",
    [utils.generateRouteName("Еко бързосъхнещи шорти Зелени")]: "6d89723b-2895-4d66-964d-35b57f7d84d6",
    [utils.generateRouteName("Еко бързосъхнещи шорти Оранж ")]: "dfc8c09e-4f1c-4bd6-8c2c-babcea8974ae",
    [utils.generateRouteName("Еко бързосъхнещи шорти Тъмно синьо ")]: "ea79da0b-bc06-46c4-8df3-b6a898adc700",
    [utils.generateRouteName("Еко кърпа  Active Сива")]: "880e1499-ad02-4fee-9332-5dbe7cd52717",
    [utils.generateRouteName("Еко кърпа  Activе Оранж")]: "3230b8ed-0a7b-4f8e-afa4-9b3fc047f266",
    [utils.generateRouteName("Еко кърпа Active Зелена")]: "f8d65391-276c-4e4f-9f77-cd3a55574a28",
    [utils.generateRouteName("Еко кърпа Active Пинк")]: "15b543eb-3362-4392-a76f-3b21853cbc3c",
    [utils.generateRouteName("Еко кърпа Active Синя")]: "0d14b8a3-bb41-4b49-b499-2f1d7c38b2f6",
    [utils.generateRouteName("Еко кърпа Fin-tastic  ")]: "3d01b6d7-c3f0-422d-9cfb-5a995e4600fd",
    [utils.generateRouteName("Еко кърпа Jungle- Тигър ")]: "d939b687-4868-4428-acb4-4f1d3f4c4643",
    [utils.generateRouteName("Еко кърпа Jungle- Токан ")]: "5c69e750-a108-4053-9b4c-a47a5618afeb",
    [utils.generateRouteName("Еко кърпа Jungle- Фламинго ")]: "fba468b2-75b0-4a9e-b9de-9dc66185078e",
    [utils.generateRouteName("Кокетна хладилна чанта THAT ")]: "80dd2d4f-08c7-489e-b67c-e6d7ed191419",
    [utils.generateRouteName("Магнитен клипс FUN колекция - pink")]: "fa3e7412-89ca-4fed-a1a5-732a4891acd0",
    [utils.generateRouteName("Магнитен клипс FUN колекция")]: "e7005fe7-8314-4da3-905b-7b8ab241ca2a",
    [utils.generateRouteName("Магнитен клипс Swarovski Бял ")]: "c1c725fa-cb50-42ed-94af-a13979dd02ee",
    [utils.generateRouteName("Магнитен клипс Swarovski Черен")]: "9e67e561-4588-4250-9a2a-0b17f3760c3a",
    [utils.generateRouteName("Магнитен клипс Голд")]: "77f0fe12-2f33-4445-b5a3-723519d413f6",
    [utils.generateRouteName("Магнитен клипс Инокс")]: "f36db29b-f846-4145-9e7a-89b858da2a7f",
    [utils.generateRouteName("Магнитен клипс Очила")]: "8726552e-5202-47a7-80b2-6cbd8bd7df4a",
    [utils.generateRouteName("Магнитен клипс Перла")]: "4856eb1e-4981-4c83-a548-370986c56c02",
    [utils.generateRouteName("Магнитен клипс Пинк ")]: "798eb977-dcaa-4100-bbb7-4c69ffecc0b5",
    [utils.generateRouteName("Магнитен клипс със Swarovski crystal")]: "a0adf102-3519-4aa0-af65-6b043cf25395",
    [utils.generateRouteName("Нож за лесно размазване SpreadTHAT")]: "d7122f48-3dfc-49c1-aa92-7abdb839b001",
    [utils.generateRouteName("Очила за четене Брауни Блу ИЗЧЕРПАН")]: "a3a75ea3-3dcf-4c28-a319-5966334dccff",
    [utils.generateRouteName("Очила за четене Класик")]: "ff397632-5472-4d03-8a79-9f902c8ec1b6",
    [utils.generateRouteName("Очила за четене Пепел от Рози")]: "8252f15f-6904-4461-9cb7-fb176037aa70",
    [utils.generateRouteName("Очила за четене Пролетно Настроение")]: "d8938438-9c36-4128-81e5-52bcc21397b2",
    [utils.generateRouteName("Очила за четене Розово Изкушение")]: "d73a5eac-c674-4a30-9b1b-ce0e4d18fc5e",
    [utils.generateRouteName("Тюрбан Лавандула - изчерпан")]: "bb92f5bf-dc9e-457c-b055-3275c0365575",
    [utils.generateRouteName("Тюрбан Нежно Зелено ")]: "e2cc1bb2-4b0c-47ac-9d11-7523a68ae710",
    [utils.generateRouteName("Тюрбан Нежно Розово")]: "78fe95d1-51d6-4cd0-bd9f-5fc6028e840e",
    [utils.generateRouteName("Тюрбан Розово")]: "3b1d2a4b-1e13-4feb-9a6f-644cfe0a7f6d",
    [utils.generateRouteName("Тюрбан Синьо")]: "3083a198-a5bd-4696-bba0-f439d713898d",
    [utils.generateRouteName("Тюрбан-кърпа Нежно Зелен")]: "51c2fd12-eb5f-4d7b-b1c6-eced909f2fbd",
    [utils.generateRouteName('Двустенна чаша ChillWhiskey - очаквайте')]: '5bd46498-29cb-4961-a338-98e7f924422e',
    [utils.generateRouteName('Лъжица за сладолед ScoopTHAT')]: '265560d2-d53b-40cf-b178-03a93253d769',
}


export {
    categorySefUrls,
    productSefUrls
}
