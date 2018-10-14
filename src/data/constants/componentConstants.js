const FILTER_INPUT_WAIT_INTERVAL = 2000;

const REDIRECT_DELAY = 2000;

const TESTIMONIALS_TIMER_INTERVAL = 8000;

const MAIN_CAROUSEL_TIMER_INTERVAL = 5000;

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

const FACEBOOK_VIDEOS = [
	"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoiteochila%2Fvideos%2F1810413359013020%2F",
	"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoiteochila%2Fvideos%2F1798411130207027%2F",
	"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoiteochila%2Fvideos%2F1080324425467690%2F",
	"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoiteochila%2Fvideos%2F229243904443991%2F",
	"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoiteochila%2Fvideos%2F185537282147987%2F",
	"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoiteochila%2Fvideos%2F185212032180512%2F",
	"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoiteochila%2Fvideos%2F183209762380739%2F",
	"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoiteochila%2Fvideos%2F176997756335273%2F",
	"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoiteochila%2Fvideos%2F180041719364210%2F"
];

const ORDER_DELIVERY_INPUTS = {

	firstName: 'Име',
	lastName: 'Фамилия',
	email: 'Имейл',
	phone: 'Телефон',

	country: 'Държава',
	city: 'Населено място',

	officeName: 'Офис',

	postalCode: 'Пощенски код',
	street: 'Улица',
	streetNo: 'Улица №',
	district: 'Квартал',
	block: 'Блок',
	entrance: 'Вход',
	floor: 'Етаж',
	apartment: 'Апартамент',

	comment: 'Коментар',

	termsAgreed: 'Условия за ползване'
};

const NOT_REQUIRED_ORDER_INPUTS = {
	street: 'улица',
	streetNo: 'улица №',
	district: 'квартал',
	block: 'блок',
	entrance: 'вход',
	floor: 'етаж',
	apartment: 'апартамент',
};

const CREATE_INPUTS = {
	title: 'Заглавие',
	content: 'Съдържание',
	imageUrl: 'Картинка URL'
};

const BUTTONS_BG = {
	confirm: 'Потвърди',
	cancel: 'Отказ',
	continue: 'Продължи',
	next: 'Напред',
	back: 'Назад',
	yes: 'Да',
	no: 'Не',
	send: 'Изпрати',
	delete: 'Изтрий',
	edit: 'Редактиране',
	more: 'Повече',
	create: 'Създай',
	add: 'Добави',
	saveOrder: 'Запази подреждането',

	//Cart
	saveChanges: 'Запази промените',
	sendOrder: 'Изпрати',

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

const TOASTR_MESSAGES = {
	//Errors
	error: 'Грешка',
	passwordsMismatch: 'Паролите не съвпадат.',

	//Warnings
	requestEmptyFields: 'Моля, попълнете следните полета:',
	productAlreadyInCart: 'Този продукт вече е добавен.',
	editQuantityFromCart: 'За редакция, моля, отидете в кошница.',

	//Success
	productAddedToCart: 'Продуктът е добавен в кошницата Ви.',
	successOrderEdit: 'Успешна редакция.',
	successNewsEdit: 'Новината е редактирана успешно.',
	successHomeContentModification: 'Съдържанието на началната страница беше променено.',
	successNewsCreate: 'Новината е създадена успешно.',
    successCarouselItemCreate: 'Съдържанието беше добавено успешно.',
    successCarouselItemEdit: 'Съдържанието беше редактирано успешно успешно.',
    successCarouselItemDelete: 'Съдържанието беше изтрито успешно успешно.',
    successNewsDelete: 'Новината е изтрита успешно.',
	successCancelOrder: 'Поръчката е отказана.',
	messageSent: 'Вашето съобщение беше изпратено!',
    videoAdded: 'Видеото беше добавено!'
};

const CONFIRM_DIALOGS = {
	cancelOrder: 'Желаете ли да откажете поръчката?',
	deleteOrder: 'Сигурни ли сте, че искате да откажете поръчката?',
	deleteProduct: 'Сигурни ли сте, че искате да изтриете този продукт?',
	deleteNews: 'Сигурни ли сте, че искате да изтриете тази новина?',
	deletePromo: 'Сигурни ли сте, че искате да изтриете промоцията?',
    deletePartner: 'Сигурни ли сте, че искате да изтриете партньора?'
};

const RESOLUTIONS = {
	xs: 450,
	sm: 680,
	md: 980,
	smTopSellers: 640,
	mdTopSellers: 1000,
};

const PRODUCT = {
	price: 'Цена:',
	addToCart: 'Добави'
};

const HOME = {
	topSellers: 'Най-продавани',
};

const TERMS_AND_CONDITIONS = {
	terms: 'Общи условия и поверителност'
};

const NEWS = {
	published: 'Публикуван на: '
};

const CURRENCY = 'лв.';

const CONTACT_FORM = {
	name: 'Име и Фамилия',
	email: 'Имейл',
	subject: 'Относно',
	message: 'Съобщение'
};

const CART = {
	//Main
	edit: 'Преглед и редакция',
	deliveryData: 'Данни за доставка',
	confirm: 'Потвърждение',
	step1: 'Стъпка 1',
	step2: 'Стъпка 2',
	step3: 'Стъпка 3',
	noProductAdded: 'Нямате добавени продукти',

	//Products table
	product: 'Продукт',
	quantity: 'Брой',
	price: 'Цена',
	sum: 'Сума',
	totalSum: 'Общо:',

	//Delivery details


	//Review
	recipient: 'Получател',
	toEkontOffice: 'Доставка до офис на ЕКОНТ',
	toAddress: 'Доставка до адрес',
	comment: 'Коментар',
	noComment: 'Няма добавени забележки.',
};

const PARTNERS = {
	city: 'град',
	address: 'адрес',
	logoUrl: 'лого',
	name: 'име',
	webUrl: 'уеб сайт',
	category: 'категория'
};

const PARTNER_CATEGORIES = {
	optics: 'оптики',
	others: 'други',
	gsm: 'GSM аксесоари',
	fishing: 'лов и риболов'
};


export {
	FILTER_INPUT_WAIT_INTERVAL,
	MAIN_CAROUSEL_TIMER_INTERVAL,
	TESTIMONIALS_TIMER_INTERVAL,
	ADMIN_PRODUCTS_FILTER_OPTIONS,
	ELEMENTS_ON_PAGE,
	ORDER_STATUS_BG,
	ORDER_STATUS_EN,
	LABELS_BG,
	USER_ACCOUNT,
	TOASTR_MESSAGES,
	ORDER_DELIVERY_INPUTS,
	NOT_REQUIRED_ORDER_INPUTS,
    CREATE_INPUTS,
	BUTTONS_BG,
	RESOLUTIONS,
	REDIRECT_DELAY,
	CONFIRM_DIALOGS,
	PRODUCT,
	HOME,
    TERMS_AND_CONDITIONS,
	CURRENCY,
	CONTACT_FORM,
	CART,
	FACEBOOK_VIDEOS,
	NEWS,
	PARTNERS,
	PARTNER_CATEGORIES
};

