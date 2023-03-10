import * as yup from 'yup';

export const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    stateUser: true,
    token: '',
    identification: '',
};

const showErrors = (field, valueLen, minLen, maxLen) => {
    if (valueLen === 0) {
        return `${field} is required`;
    } else if (valueLen < minLen) {
        return `${field} must be at least ${minLen} characters`;
    } else if (valueLen > maxLen) {
        return `${field} must be at most ${maxLen} characters`;
    }
    return '';
};

export const schemaValidation = yup.object().shape({
    first_name: yup.string().required('El campo nombre es requerido'),
    last_name: yup.string().required('El campo apellido es requerido'),
    identification: yup.string().min(4, obj => showErrors('Identification', obj.value.length, 4, 10)).max(10, obj => showErrors('Identification', obj.value.length, 4, 10)).required('El campo identificación es requerido'),
}).required();