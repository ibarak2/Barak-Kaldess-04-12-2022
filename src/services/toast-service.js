import { toast } from 'react-toastify';

export const toastService = {
    addedMsg,
    removedMsg,
    showErrorMsg
}

function addedMsg() {
    toast.success('Location Added to Favorites !', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}

function removedMsg() {
    toast.info('Location Removed from Favorites.', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

function showErrorMsg() {
    toast.error('API Request failed.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}