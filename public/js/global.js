"use strict";
function modalBase(titulo, mensagem, btns) {
    var id = new Date().getTime();
    var modal = $('<div id="modal' + id + '" class="modal mensagem-sistema">' +
        '<div class="modal-content">' +
        '<h4>' + titulo + '</h4>' +
        '<p>' + mensagem + '</p>' +
        '</div>' +
        '<div class="modal-footer"></div>' +
        '</div>');
    modal.appendTo('body');
    modal.find('div.modal-footer').append(btns);
    modal.modal({
        dismissible: false,
        onCloseEnd: function () {
            modal.modal('destroy');
            modal.remove();
        }
    });
    modal.modal('open');
    return modal;
}
function aviso(titulo, mensagem, onOk) {
    var btnOk = $('<button class="modal-action modal-close waves-effect waves-green btn-flat">OK</button>');
    if (typeof onOk === 'function') {
        btnOk.on('click', onOk);
    }
    return modalBase(titulo, mensagem, btnOk);
}

function confirmacao(titulo, mensagem, onSim, onNao) {
    var btnSim = $('<button class="modal-action modal-close waves-effect waves-green btn-flat">Sim</button>');
    var btnNao = $('<button class="modal-action modal-close waves-effect waves-red btn-flat">Não</button>');
    if (typeof onSim === 'function') {
        btnSim.on('click', onSim);
    }
    if (typeof onNao === 'function') {
        btnNao.on('click', onNao);
    }
    return modalBase(titulo, mensagem, [btnNao, btnSim]);// Devido ao float-right da classe deve ser enviado invertido do que se deseja na visualizção
}

// Em desenvolvimento, não deu boa ainda =[
function wait() {
    var wait = $('<div class="modal"><div class="preloader-wrapper big active"><div class="spinner-layer spinner-white-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');
    wait.appendTo('body');
    wait.openModal({
        dismissible: false,
        starting_top: '29%',
        ending_top: '35%',
        complete: function () {
            wait.remove();
        }
    });
    return wait;
    // Para fechar basta chamar o .closeModal();
}

function getUrlParams(paramName) {
    if (!getUrlParams.urlParams) {
        var search = window.location.search;
        getUrlParams.urlParams = {};
        if (search.length > 0) {
            var pieces = search.replace('?', '').split('&')
            for (var i in pieces) {
                var param = pieces[i].split('=');
                getUrlParams.urlParams[param[0]] = decodeURIComponent(param[1]);
            }
        }
    }
    if (paramName) {
        return getUrlParams.urlParams[paramName];
    }
    return getUrlParams.urlParams
}

$(document).ready(function () {
    // Setando defaults do validator
    $.validator.setDefaults({
        onkeyup: false,
        errorClass: 'invalid',
        validClass: "valid",
        errorPlacement: function (error, element) {
            error.insertAfter($(element).siblings('label'));
        }
    });

    // Inicualização dos componentes Materialize
    $('.dropdown-trigger').dropdown();
    $('select').formSelect();
});