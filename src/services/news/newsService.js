import requesterService from '../requester';

const newsEndPoint = '/news';
const auth = 'admin';

function generateNewsDetails (state) {

    return {
        Title: state.title,
        Content: state.content,
        ImageUrl: state.imageUrl
    }
};

export default {

    loadNews: (newsId) => {

        let endPoint = newsEndPoint + '/' + newsId;

        return requesterService.get(endPoint);

    },

    loadNewsList: (state) => {

        let query =
            '?page=' + state.page +
            '&size=' + state.size;

        return requesterService.get(newsEndPoint, null, query);
    },

    updateNews: (state, newsId) => {

        let endPointId = newsEndPoint + '/' + newsId;

        let news = generateNewsDetails(state);

        return requesterService
            .update(endPointId, auth, news);
    },

    createNews: (state) => {

        let news = generateNewsDetails(state);

        return requesterService
            .post(newsEndPoint, auth, news);
    },

    deleteNews: (newsId) => {

        let endPointId = newsEndPoint + '/' + newsId;

        return requesterService
            .remove(endPointId);
    }
};
