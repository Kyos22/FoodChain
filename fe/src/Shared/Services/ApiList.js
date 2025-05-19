

const urlList = {
    
    account: {
        findByFullnameApi: 'http://127.0.0.1:8000/api/account/findByFullname/',
        findByUsernameApi: 'http://127.0.0.1:8000/api/account/getAccountById/268000/api/account/findByUsername/',
        findByRoleApi:     'http://127.0.0.1:8000/api/account/findByRole/',
        getAccountApi:     'http://127.0.0.1:8000/api/account/get',
        register:          'http://127.0.0.1:8000/api/account/register',
        updateStatus:      'http://127.0.0.1:8000/api/account/updateStatusAccount/',
        getAccountById:    'http://127.0.0.1:8000/api/account/getAccountById/',
        update:            'http://127.0.0.1:8000/api/account/edit/',
    },
    role: {
        getRoleApi: 'http://127.0.0.1:8000/api/role/get',
    },
    product: {
        getProductApi: 'http://127.0.0.1:8000/api/product/get'
    }
};

export const getUrlApiList = () => {
    return urlList;
};

