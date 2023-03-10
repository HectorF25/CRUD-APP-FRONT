import getConfig from 'next/config';

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();

const usersConfig = {
    usersListEnpoint: publicRuntimeConfig.BASE_URL + '/api/users/',
    usersRegisterEnpoint: publicRuntimeConfig.BASE_URL + '/api/users/register',
    usersUpdateEnpoint: publicRuntimeConfig.BASE_URL + '/api/users/update/',
    usersActivateEnpoint: publicRuntimeConfig.BASE_URL + '/api/users/activate/',
    usersInactivateEnpoint: publicRuntimeConfig.BASE_URL + '/api/users/inactivate/',
    storageToken: 'accessToken',
    storageUserKey: 'userData'
};

export default usersConfig;