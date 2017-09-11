let notificacions = (()=> {
    function showInfo(message) {
        let infoBox = $('.success');
        let infoBoxp = $('.success > p');
        infoBoxp.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function loading(message) {
        let errorBox = $('.info');
        let infoBoxp = $('.info > p');
        infoBoxp.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 1000);

    }

    function showError(message) {
        let errorBox = $('.error');
        let infoBoxp = $('.error > p');
        infoBoxp.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }
    function handleError(reason) {
        showError(reason.responseJSON);
    }


    return{
        showInfo,
        showError,
        loading,
        handleError
    }
})();