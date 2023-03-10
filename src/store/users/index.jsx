import axios from 'axios';

import usersConfig from 'src/config/usersConfig';

const fetchDataUser = async () => {
    console.log('fetchDataUser');
    const response = await axios.get(usersConfig.usersListEnpoint, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'x-access-token': `${localStorage.getItem(usersConfig.storageToken)}`,
        },
    });

    return response.data.data;
};

const handleRegisterUser = async (data, successCallback, errorCallback) => {
    await axios.post(usersConfig.usersRegisterEnpoint, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'x-access-token': `${localStorage.getItem(usersConfig.storageToken)}`,
        },
    }).then(res => {
        successCallback({ status: res.status, data: res.data.data });
    }).catch(err => {
        errorCallback({ status: err.response.status, data: err.response.data });
    });
};

const handleUpdateUser = async (id, data, successCallback, errorCallback) => {
    await axios.put(usersConfig.usersUpdateEnpoint + id, data, {	
        headers: {
            'Access-Control-Allow-Origin': '*',
            'x-access-token': `${localStorage.getItem(usersConfig.storageToken)}`,
        },
    }).then(res => {
        successCallback({ status: res.status, data: res.data.data });
    }).catch(err => {
        errorCallback({ status: err.response.status, data: err.response.data });
    });
};

const inactivateUser = async (id, successCallback, errorCallback) => {
    await axios.put(usersConfig.usersInactivateEnpoint + id, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'x-access-token': `${localStorage.getItem(usersConfig.storageToken)}`,
        },
    }).then(res => {
        successCallback({ status: res.status, data: res.data.data });
    }).catch(err => {
        errorCallback({ status: err.response.status, data: err.response.data });
    });
};

const activateUser = async (id, successCallback, errorCallback) => {
    await axios.put(usersConfig.usersActivateEnpoint + id, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'x-access-token': `${localStorage.getItem(usersConfig.storageToken)}`,
        },
    }).then(res => {
        successCallback({ status: res.status, data: res.data.data });
    }).catch(err => {
        errorCallback({ status: err.response.status, data: err.response.data });
    });
};

const userStore = {
    fetchDataUser,
    handleRegisterUser,
    handleUpdateUser,
    inactivateUser,
    activateUser,
};

export default userStore;
