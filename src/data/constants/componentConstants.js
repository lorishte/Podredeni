
const ELEMENTS_ON_PAGE = {10: 10, 20: 20, 30: 30, 40: 40, 50: 50};

const ORDER_STATUS = {0: "Непотвърдена", 1: "Потвърдена", 2: "Изпратена", 3: "Отказана"};

const ORDER_STATUS_EN = {0: "ordered", 1: "confirmed", 2: "dispatched", 3: "cancelled"};

const LABELS_BG = {
    number: "#",
    status: "Статус",
    lastModification: "Последна редакция",
    customer: "Получател",
    product: "Продукт",
    phone: "Телефон",
    email: "Емейл",
    amount: "Сума",
    quantity: "Количество",
    price: "Цена",
    total: "Общо",
    edit: "Редакция",
    orderNumber: "Поръчка номер",
    deliveredTo: "Доставка до",
    comments: "Забележка",
    streetShort: "ул.",
    districtShort: "кв.",
    blockShort: "бл.",
    entranceShort: "вх.",
    floorShort: "ет.",
    apartmentShort: "ап."
};

export default {
    ELEMENTS_ON_PAGE,
    ORDER_STATUS,
    ORDER_STATUS_EN,
    LABELS_BG
}

