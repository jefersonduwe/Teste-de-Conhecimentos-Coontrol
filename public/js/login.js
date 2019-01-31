$(document).ready(() => {
    $('#login-form').validate({
        rules: {
            dateField: {
                date: true
            }
        },
        submitHandler: (form) => {
            var usuario = {
                login: $(form).find('#login').val(),
                senha: $(form).find('#senha').val()
            };
            $.post('/login', usuario)
                .done((data, status, jqXHR) => {
                    window.location.href = '/api';
                })
                .fail((jqXHR, status, statusText) => {
                    if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                        aviso('Aviso', jqXHR.responseJSON.message);
                    } else {
                        aviso('Erro', 'Erro inesperado.');
                    }
                });
        }
    });
});