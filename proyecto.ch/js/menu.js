const hamburguer = document.querySelector('.cosito'); /*el ('.') refleja la clase que seleccionamos*/
const menu = document.querySelector('.menu-navegacion');

console.log(menu)
console.log(hamburguer)

hamburguer.addEventListener('click', ()=>{ /*le hadiero a menu-navegacion, la clase spread*/
menu.classList.toggle("spread") /*cada vez q toques el icono menu aside hambur. vas a ponerle la clase spread,clickeo icono y sale el menu*/
})

window.addEventListener('click', e=>{ /*FUNSION DE FLECHAS */
if(menu.classList.contains('spread') /*se ejecuta al hacer clcik en cualquier parte de la web*/
&& e.target != menu && e.target != hamburguer){

    menu.classList.toggle("spread")
}
}) /*console.log (e.target) me dice en consola a que elemento doy click de la pag web */



// Disable Mobile Keyboard
$(document).ready(function() {  
    if (Modernizr.touch) {  
      // Disable keyboard by adding readonly attribute to field
       $('[data-disable-touch-keyboard]').attr('readonly', 'readonly');
      // Appear RUT keyboard
      $("input").on("focus", function() {
          $("#layer").removeClass('full');
          $("#rutkeys").hide(); 
      });
      $("#rut").on("focus", function() {
        $("#layer").addClass('full');
        $("#rutkeys").show();
      });
    } 
  });
  
  // Mask Settings
  // Info: http://igorescobar.github.io/jQuery-Mask-Plugin/docs.html
  $('#name').mask('Z',{translation: {
    'Z': {pattern: /[a-zA-Z ]/, recursive: true}
  }});
  
  $('#lastname').mask('Z',{translation: {
    'Z': {pattern: /[a-zA-Z ]/, recursive: true}
  }});
  
  $('#phone').mask('(+56) C 0000 0000', {'translation': {
      C: {pattern: /[2,9]/}
    },
      placeholder: "(+__) _ ____ ____"
  });
  
  var options = {translation:  {
    'Z': {pattern: /[0-9]/, optional: true},
    'V': {pattern: /[0-9,kK]/}
  }, placeholder: "1111111-1"
  };
  
  $('#rut').mask('0Z0ZZ0ZZ-V', options);
  
  // Rut Validator
  function validaRut(campo) {
    // Si todos los numeros son iguales es falso.
    if (/^(.)\1+$/.test(campo.replace(/[^0-9]/gi, ''))) { return false; }
    if (campo.length == 0) {
      return false;
    }
    if (campo.length < 8) {
      return false;
    }
  
    campo = campo.replace('-', '')
    campo = campo.replace(/\./g, '')
  
    var suma = 0;
    var caracteres = "1234567890kK";
    var contador = 0;
    for (var i = 0; i < campo.length; i++) {
      u = campo.substring(i, i + 1);
      if (caracteres.indexOf(u) != -1)
        contador++;
    }
    if (contador == 0) {
      return false
    }
  
    var rut = campo.substring(0, campo.length - 1)
    var drut = campo.substring(campo.length - 1)
    var dvr = '0';
    var mul = 2;
  
    for (i = rut.length - 1; i >= 0; i--) {
      suma = suma + rut.charAt(i) * mul
      if (mul == 7) mul = 2
      else mul++
    }
    res = suma % 11
    if (res == 1) dvr = 'k'
    else if (res == 0) dvr = '0'
    else {
      dvi = 11 - res
      dvr = dvi + ""
    }
    if (dvr != drut.toLowerCase()) {
      return false;
    } else {
      return true;
    }
  }
  
  // Validator Settings
          $.validator.addMethod("letters", function(value, element) {
            return this.optional(element) || value == value.match(/^[a-zA-Z\s]*$/);
          });
          // RUT Validate
          $.validator.addMethod("rut", function(value, element) {
            if (validaRut(value) !== false) {
              return true;
            } else {
              return false;
            }
          }, "Introduzca un RUT válido");
  
  // Envio a Google Spreadsheet
          function goo(f) {
          console.log("function goo");
          var form = "#" + f;
  
              // Disable Button Submit and Show Loading
              $(form).find("button[type=submit]").prop('disabled', true);
              $(form).find(".submit").hide();
          $(form).find(".loading").show();
  
              // Set Google Form
              var id_formulario = "1FAIpQLSfNNm1v9FaD5UbwiI4DOS-y8I6YcL_RhByxBaHpYgJDHtz8-g";
  
              // Campos del formulario
              var name = $(form + " #name").val()
              var rut = $(form + " #rut").val()
              var email = $(form + " #email").val()
              var mensaje = $(form + " #mensaje").val()
              // Extrae el Numero de Telefono sin caracteres especiales
              var phone = $(form + " #phone").val().replace(/[^0-9]/gi, '');
  
              var form_url = "https://docs.google.com/forms/d/e/" + id_formulario + "/formResponse?";
        var datos = 'entry.1507454919=' + name + '&entry.271409913=' + rut + '&entry.654025105=' + email + '&entry.493669882=' + phone + '&entry.313507154=' + mensaje + '&submit=-3400392729357099109';
  
              var r = $("<iframe id='no-target' src='" + form_url + encodeURI(datos) + "' style='display:none;' />", {});
          r.appendTo("body");
  
              var redirect = $(form).attr('data-redirect');
              window.top.location.replace(redirect);
        };
  
          // Submit Nuevo
          $("#formulario-1").submit(function(e) {
              $("#formulario-1.submit").remove();
        e.preventDefault();
        return false;
      }).validate({
        onkeyup: false,
        onclick: false,
        submitHandler: function(form) {
          goo(form.id);
        },
              rules: {
              name: {
                required: true,
                minlength: 3,
                letters: true
              },
              email: {
                required: true,
                email: true
              },
              phone: {
                required: true,
                minlength: 17
              },
              rut: {
                    rut: true,
                    required: true,
                    minlength: 9,
                    maxlength: 10
              }
            },
            messages: {
              name: "Por favor introduzca su nombre",
              email: "Por favor introduzca un mail válido",
              phone: "Introduzca un número de telefono completo",
                  rut: "Introduzca un RUT válido"
            }
      });
  
  // Virtual Keyboard Functions
  // Inpired in: https://codepen.io/thecountgs/pen/JRZGNR
  // Select all the from document using queryselectAll
  var keys = document.querySelectorAll('#rutkeys span');
  
  // loop through all keys
  for(var i = 0; i < keys.length; i++) {
    //add onclick event to the keys
      keys[i].onclick = function(e) {
          // Get the input and button values
      if (this.innerHTML.length <= 1) {
        var input = $('#rut');
        var inputVal = input.val();
        var btnVal = this.innerHTML;
  
        input.val(input.val()+btnVal);
        $('input').trigger('input');
      }
      } 
  }
  
  $('#clear').on("click", function() {
    $('#rut').val('');
  });
  
  $('#del').on("click", function() {
    var oldStr = $('#rut').val();
    var newStr = oldStr.substr(0, oldStr.length-1);
    $('#rut').val(newStr);
  });
  
  $( "#next" ).click(function() {
    $( "#email" ).focus();
  });
  
  // Envio a Google Spreadsheet
          function goo(f) {
          console.log("function goo");
          var form = "#" + f;
  
              // Disable Button Submit and Show Loading
              $(form).find("button[type=submit]").prop('disabled', true);
              $(form).find(".submit").hide();
          $(form).find(".loading").show();
  
              // Set Google Form
              var id_formulario = "1FAIpQLSfNNm1v9FaD5UbwiI4DOS-y8I6YcL_RhByxBaHpYgJDHtz8-g";
  
              // Campos del formulario
              var name = $(form + " #name").val()
              var rut = $(form + " #rut").val()
              var email = $(form + " #email").val()
              var mensaje = $(form + " #mensaje").val()
              // Extrae el Numero de Telefono sin caracteres especiales
              var phone = $(form + " #phone").val().replace(/[^0-9]/gi, '');
  
              var form_url = "https://docs.google.com/forms/d/e/" + id_formulario + "/formResponse?";
        var datos = 'entry.1507454919=' + name + '&entry.271409913=' + rut + '&entry.654025105=' + email + '&entry.493669882=' + phone + '&entry.313507154=' + mensaje + '&submit=-3400392729357099109';
  
              var r = $("<iframe id='no-target' src='" + form_url + encodeURI(datos) + "' style='display:none;' />", {});
          r.appendTo("body");
  
              var redirect = $(form).attr('data-redirect');
              window.top.location.replace(redirect);
        };
  
          // Submit Nuevo
          $("#formulario-1").submit(function(e) {
              $("#formulario-1.submit").remove();
        e.preventDefault();
        return false;
      }).validate({
        onkeyup: false,
        onclick: false,
        submitHandler: function(form) {
          goo(form.id);
        },
              rules: {
              name: {
                required: true,
                minlength: 3,
                letters: true
              },
              email: {
                required: true,
                email: true
              },
              phone: {
                required: true,
                minlength: 17
              },
              rut: {
                    rut: true,
                    required: true,
                    minlength: 9,
                    maxlength: 10
              }
            },
            messages: {
              name: "Por favor introduzca su nombre",
              email: "Por favor introduzca un mail válido",
              phone: "Introduzca un número de telefono completo",
                  rut: "Introduzca un RUT válido"
            }
      });