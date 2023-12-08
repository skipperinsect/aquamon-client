import Api from '../Api';

const getUser = () => {
    return Api.get('/users');
};

const UserServices = {
    getUser
};

export default UserServices;