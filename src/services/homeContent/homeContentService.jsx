import requesterService from '../requester';

const articleEndPoint = '/homeContent/articles';
const carouselItemsEndPoint = '/homeContent/carousel/items';
const auth = 'admin';

function generateHomeContentDetails(state){

    return {
        SectionHeading: state.sectionHeading,
        SectionContent: state.sectionContent,
        ArticleHeading: state.articleHeading,
        ArticleContent: state.articleContent
    }

}

export default {

    loadArticle: () => {

        return requesterService.get(articleEndPoint);

    },

    modifyArticle: (state) => {

        let content = generateHomeContentDetails(state);

        return requesterService
            .post(articleEndPoint, auth, content);
    },

    loadCarouselItems: () => {
        return requesterService.get(carouselItemsEndPoint);
    },

    loadCarouselItem: (itemId) => {

        let endPoint = carouselItemsEndPoint + '/'  + itemId;

        return requesterService.get(endPoint);
    },

    createCarouselItem: (state) => {

        let data = {
            Heading: state.heading,
            ImageUrl: state.imageUrl,
            Content: state.content
        };

        return requesterService.post(carouselItemsEndPoint, auth, data);
    },

    editCarouselItem: (itemId, state) => {

        let endPoint = carouselItemsEndPoint + '/'  + itemId;

        let data = {
            Heading: state.heading,
            ImageUrl: state.imageUrl,
            Content: state.content
        };

        return requesterService.update(endPoint, auth, data);
    },

    deleteCarouselItem: (itemId) => {

        let endPoint = carouselItemsEndPoint + '/'  + itemId;

        return requesterService.remove(endPoint, auth)
    }
};
