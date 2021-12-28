import config from '../global/global';
import axios from 'axios';
class ContactService {

    deleteContact(contact) {
        return axios.delete(config.apiAddress + '/contact/delete/' + contact)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }
    searchEmergencyContact(contact) {
        return axios.get(config.apiAddress + '/contact/search/emer/' + contact)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }
    getChartContact() {
        return axios.get(config.apiAddress + '/contact/chart')
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }
    searchUserContact(contact) {
        return axios.get(config.apiAddress + '/contact/search/' + contact)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }
    searchUserbyId(contact) {
        return axios.get(config.apiAddress + '/contact/' + contact)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }
    editContact(id, contact) {
        return axios.put(config.apiAddress + '/contact/edit/' + id, contact)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }
    sendFeedBack(feedback) {
        return axios.post(config.apiAddress + '/feedback/add', feedback)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }
    getFeedback() {
        return axios.get(config.apiAddress + '/feedback')
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }
    getEmergencyContact() {
        return axios.get(config.apiAddress + '/contact/emergency')
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }
    getUserContact() {
        return axios.get(config.apiAddress + '/contact/')
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }
    addContact(contact) {

        return axios.post(config.apiAddress + '/contact/add', contact)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });


    }
}

const contact = new ContactService();
export default contact;