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
    }
};
