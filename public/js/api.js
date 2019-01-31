$(document).ready(() => {
    let options = {
        format: 'dd/mm/yyyy',
        i18n: {
            cancel: 'Cancelar',
            clear: 'Limpar',
            done: 'Ok',
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        }
    };
    $('.datepicker').datepicker(options);

    $('#pessoa-form').validate({
        submitHandler: (form) => {
            var pessoa = {
                nome: $(form).find('#nome').val(),
                dataNasc: $(form).find('#data-nasc').val(),
                sexo: $(form).find('#sexo').val()
            };
            $.post('/pessoa', pessoa)
                .done((data, status, jqXHR) => {
                    aviso('Idade e Signo', 'Você tem ' + data.idade + ' anos e é do signo de ' + data.signo + '.');
                    $(form).trigger('reset')
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

    $('#fibonacci-form').validate({
        submitHandler: (form) => {
            let inicial = $(form).find('#primeiro').val();
            let qtde = $(form).find('#qtde').val();
            let url = '/fibonacci/' + inicial + '&' + qtde;
            $.get(url)
                .done((data, status, jqXHR) => {
                    aviso('Fibonacci', 'Os números fibonacci calculados são: ' + data.join(', '));
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