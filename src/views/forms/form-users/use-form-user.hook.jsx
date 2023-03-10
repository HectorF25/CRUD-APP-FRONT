import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';

import { initialValues, schemaValidation } from './utils/schemaValidation';
import userStore from 'src/store/users';

export const useUserForm = ({ isUpdate, values, setState, toggle, open }) => {
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schemaValidation),
    });

    /*---- Hook -----*/
    useEffect(() => {
        if(open) {
            if(isUpdate && values) {
                reset({ isUpdate: true, ...values });
            } else {
                reset(initialValues);
            }
        }
    }, [values, reset, isUpdate, open]);

    /* ---- Callbacks ---- */
    const handleReset = () => {
        toggle();
        reset(initialValues);
    };

    const errorCallback = ({ status, data }) => {
        if(status === 404 && data?.message === 'El usuario ya está registrado') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data?.message,
            });
        }
    };

    /* ---- Events ---- */
    const handleRegister = async ({ status, data }) => {
        Swal.fire({
            icon: 'success',
            title: 'Usuario registrado con éxito',
            showConfirmButton: false,
            timer: 1500,
        });
        setState((users) => [...users, data.user]);
        handleReset();
    };

    const handleUpdate = async ({ status, data }) => {
        Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado con éxito',
            showConfirmButton: false,
            timer: 1500,
        });
        setState((users) => {
            let arrayUsers = [...users];
            const index = arrayUsers.findIndex((user) => user.id === data.user.id);
            arrayUsers[index] = data.user;
            return [...arrayUsers];
        });
        handleReset();
    };


    /* ---- Submit ---- */
    const onSubmit = (data) => {
        if (!isUpdate) {
            userStore.handleRegisterUser(
                data,
                (res) => handleRegister(res),
                (res) => errorCallback(res),
            );
        } else {
            userStore.handleUpdateUser(
                values.id,
                data,
                (res) => handleUpdate(res),
                (res) => errorCallback(res),
            );
        };
    };

    return { 
        handleSubmit: handleSubmit(onSubmit), 
        control, 
        errors 
    };
};