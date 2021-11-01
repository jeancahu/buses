// Contact form page JS

// Se hace query del formulario
const formulario = document.querySelector('form');
const form_alerts = formulario.getElementsByClassName("form_alerts")[0]; // .childNodes[1];

// TODO agregar listener a cada input para validar los datos por aparte con JS

formulario.addEventListener(
    'change',
    event => {
        // Al introducir cosas en el Form se ocultan las alertas del formulario
        form_alerts.classList.add("form_alerts_hide");
        form_alerts.querySelector("DIV").classList.remove("alert-success");
    }
);

formulario.addEventListener(
    'submit',
    event => {
        // Se cancela el refresh
        event.preventDefault();

        // Hacemos el post a través de fetch
        if (form_alerts.querySelector("DIV").classList.contains("alert-success")){
            // Ya fue enviado el formulario, no hacer nada
        } else {
            // Enviar el formulario por primera vez
            fetch("post_form", {
            method: "POST",
            body: new FormData(event.target)
        })
            .then(response => response.json())
            .then(data => {
                // Notificar correcto POST
                console.log(data.message);

                // Success banner
                form_alerts.classList.remove("form_alerts_hide");
                form_alerts.querySelector("DIV").classList.remove("alert-danger");
                form_alerts.querySelector("DIV").classList.add("alert-success");
                form_alerts.querySelector("DIV").innerHTML='<i class="fas fa-info-circle"></i> Formulario <strong>enviado</strong> correctamente! Gracias!';

                // TODO presentar cuando hay errores del lado del servidor (5xx)
            })
            .catch((error) => {
                // Notificar POST erróneo
                console.error('Error:', error);
                form_alerts.classList.remove("form_alerts_hide");
                form_alerts.querySelector("DIV").classList.remove("alert-success");
                form_alerts.querySelector("DIV").classList.add("alert-danger");
                form_alerts.querySelector("DIV").innerHTML="Formulario <strong>no enviado</strong> debido a error de conectividad.";
            });
        }
    }
);

formulario.addEventListener(
    'reset',
    event => {
        // Al ejecutar un reset se ocultan las alertas del formulario
        form_alerts.classList.add("form_alerts_hide");
        form_alerts.querySelector("DIV").classList.remove("alert-success");
    }
);
