import requesterService from '../requester';

const contactFormEndpoint = '/contactForm';

export default {

    sendContactForm: (name, email, subject, content) => {

        let data = {
            Name: name,
            Email: email,
            Subject: subject,
            Content: content,
        };

        return requesterService.post(contactFormEndpoint, null, data);
    }
}