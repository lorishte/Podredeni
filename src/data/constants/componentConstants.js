const FILTER_INPUT_WAIT_INTERVAL = 2000;

const ADMIN_PRODUCTS_FILTER_OPTIONS = {'name': 'име', 'number': 'номер'};

const ELEMENTS_ON_PAGE = {10: 10, 20: 20, 30: 30, 40: 40, 50: 50};

const ORDER_STATUS_BG = {0: 'Получена', 1: 'Потвърдена', 2: 'Изпратена', 3: 'Отказана'};

const ORDER_STATUS_EN = {0: 'ordered', 1: 'confirmed', 2: 'dispatched', 3: 'cancelled'};

const LABELS_BG = {
    number: '#',
    status: 'Статус',
    lastModification: 'Последна редакция',
	lastModificationTableHeader: 'Редакция',
    customer: 'Получател',
    product: 'Продукт',
    phone: 'Телефон',
    email: 'Емейл',
    amount: 'Сума',
    quantity: 'Брой',
    price: 'Цена',
    total: 'Общо',
    edit: 'Редакция',
    address: 'Адрес',
    office: 'Офис',
    orderNumber: 'Поръчка номер',
    deliveredTo: 'Доставка до',
    markAs: 'Отбележи като',
    comments: 'Забележка',
    streetShort: 'ул.',
    districtShort: 'кв.',
    blockShort: 'бл.',
    entranceShort: 'вх.',
    floorShort: 'ет.',
    apartmentShort: 'ап.'
};

const REQUIRED_ORDER_INPUTS = {

		firstName: 'име',
		lastName: 'фамилия',
		email: 'имейл',
		phone: 'телефон',

		country: 'държава',
		officeName: 'име на офис',

		city: 'град',
		postalCode: 'пощенски код',
		street: 'улица',
		streetNo: 'улица №',
		district: 'квартал',
		block: 'блок',
		entrance: 'вход',
		floor: 'етаж',
		apartment: 'апартамент',

	    comment: 'комнетар',

        termsAgreed: 'условия за плзване'
};

const BUTTONS_BG = {
    confirm: 'Потвърди',
    cancel: 'Отказ',
    continue: 'Продължи',
    back: 'Назад',

    // Order
	received: 'Получена',
    confirmed: 'Потвърдена',
    dispatched: 'Изпратена',
    cancelled: 'Отказана'
};

const USER_ACCOUNT = {
	email: 'Имейл',
	password: 'Парола',
    confirmPassword: 'Повтори парола',
    register: 'Регистрация',
    login: 'Вход',
    cancel: 'Отказ',
};

const ERROR_MESSAGES = {
    passwordsMismatch: 'Паролите не съвпадат.'
};

const RESOLUTIONS = {
    xs: 450,
    sm: 680,
    md: 980
};

export {
	FILTER_INPUT_WAIT_INTERVAL,
	ADMIN_PRODUCTS_FILTER_OPTIONS,
    ELEMENTS_ON_PAGE,
	ORDER_STATUS_BG,
    ORDER_STATUS_EN,
    LABELS_BG,
    USER_ACCOUNT,
	ERROR_MESSAGES,
	REQUIRED_ORDER_INPUTS,
    BUTTONS_BG,
    RESOLUTIONS
}

