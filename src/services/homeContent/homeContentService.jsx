import requesterService from '../requester';

const homeContentEndPoint = '/homeContent';
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

    loadHomeContent: () => {

        return requesterService.get(homeContentEndPoint);

    },

    modifyHomeContent: (state) => {

        let content = generateHomeContentDetails(state);

        return requesterService
            .post(homeContentEndPoint, auth, content);
    },
};
