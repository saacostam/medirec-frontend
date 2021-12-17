<template>
    <div class="flex-fill patient-2 d-flex flex-column">
        <button class="btn btn-back p-0 m-4" @click="back">
            <img src="../../../public/static/svg/arrow-left-circle.svg">
        </button>
        <img src="../../../public/static/svg/MedirecLogo.svg" alt="logo" width="auto" height="65" viewBox="0 0 65 65" class="m-3">
        <div class="d-flex">
            <hr>
            <div class="col-4 text-center">
                <div class="circle circle-active">1</div>
                <p>Información Personal</p>
            </div>
            <div class="col-4 text-center">
                <div class="circle circle-active">2</div>
                <p>Contraseña</p></div>
            <div class="col-4 text-center">
                <div class="circle">3</div>
                <p>Bienvenida</p>
            </div>
        </div>
        <form  @submit="signUp" class="data form-group flex-fill d-flex flex-column">
            <div class="flex-fill d-flex align-items-center">
                <div class="offset-2 col-8">
                    <div class="form-group mb-4">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text bg-color-secondary-dark border-0">
                            <img src="../../../public/static/svg/shield-lock.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                            </div>
                        </div>
                        <input v-model="password" type="password" class="form-control bg-color-secondary-light border-0" placeholder="Contraseña" required>
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text bg-color-secondary-dark border-0 text-light">
                            <img src="../../../public/static/svg/check-circle.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                            </div>
                        </div>
                        <input class="form-control bg-color-secondary-light border-0" type="password"
                            placeholder="Confirmar Contraseña" v-model="cPassword" required
                            :class="{ 'is-invalid': cPassword !== '' && cPassword !== password,
                                        'is-valid': cPassword !== '' && cPassword === password }"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="termModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-color-main-dark" id="termModalTitle">Terminos y Condiciones</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Esta página web es propiedad y está operado por MediRec Development Team. Estos Términos establecen los términos y condiciones bajo los cuales usted puede usar nuestra página web y servicios ofrecidos por nosotros. Esta página web ofrece a los visitantes un sistema de gestión de historial clínico de la EPS a la cual se encuentra afiliado, interacciones de comunicación con los doctores. Al acceder o usar la página web de nuestro servicio, usted aprueba que haya leído, entendido y aceptado estar sujeto a estos Términos:</p>
                                <ol>
                                    <li>Para usar nuestra página web y / o recibir nuestros servicios, debe tener al menos 18 años, estar bajo la supervisión de un adulto, o la mayoría de edad legal en su jurisdicción, y poseer la autoridad legal, el derecho y la libertad para participar en estos Términos como un acuerdo vinculante.</li>
                                    <li>Podemos, con aviso previo, cambiar los servicios; dejar de proporcionar los servicios o cualquier característica de los servicios que ofrecemos; o crear límites para los servicios. Podemos suspender de manera permanente o temporal el acceso a los servicios sin previo aviso ni responsabilidad por cualquier motivo, o sin ningún motivo.</li>
                                    <li>El Servicio y todos los materiales incluidos o transferidos, incluyendo, sin limitación, software, imágenes, texto, gráficos, logotipos, patentes, marcas registradas, marcas de servicio, derechos de autor, fotografías, audio, videos, música y todos los Derechos de Propiedad Intelectual relacionados con ellos, son la propiedad exclusiva de MediRec Development Team, o son de uso libre. Salvo que se indique explícitamente en este documento, no se considerará que nada en estos Términos crea una licencia en o bajo ninguno de dichos Derechos de Propiedad Intelectual, y usted acepta no vender, licenciar, alquilar, modificar, distribuir, copiar, reproducir, transmitir, exhibir públicamente, realizar públicamente, publicar, adaptar, editar o crear trabajos derivados de los mismos.</li>
                                    <li>Podemos terminar o suspender de manera permanente o temporal su acceso al servicio sin previo aviso y responsabilidad por cualquier razón, incluso si a nuestra sola determinación usted viola alguna disposición de estos Términos o cualquier ley o regulación aplicable. Puede descontinuar el uso y solicitar cancelar su cuenta y / o cualquier servicio en cualquier momento.</li>
                                    <li>Usted acuerda indemnizar y eximir de responsabilidad a MediRec Development Team, de cualquier demanda, pérdida, responsabilidad, reclamación o gasto (incluidos los honorarios de abogados) que terceros realicen en su contra como consecuencia de, o derivado de, o en relación con tu uso de la página web o cualquiera de los servicios ofrecidos en la página web.</li>
                                    <li>En la máxima medida permitida por la ley aplicable, en ningún caso el MediRec Development Team será responsable por daños indirectos, punitivos, incidentales, especiales, consecuentes o ejemplares, incluidos, entre otros, daños por pérdida de beneficios, buena voluntad, uso, datos. u otras pérdidas intangibles, que surjan de o estén relacionadas con el uso o la imposibilidad de utilizar el servicio.</li>
                                    <li>En la máxima medida permitida por la ley aplicable, MediRec Development Team no asume responsabilidad alguna por (i) errores, errores o inexactitudes de contenido; (ii) lesiones personales o daños a la propiedad, de cualquier naturaleza que sean, como resultado de su acceso o uso de nuestro servicio; y (iii) cualquier acceso no autorizado o uso de nuestros servidores seguros y / o toda la información personal almacenada en los mismos.</li>
                                    <li>Nos reservamos el derecho de modificar estos términos de vez en cuando a nuestra entera discreción. Por lo tanto, debe revisar estas páginas periódicamente. Cuando cambiemos los Términos de una manera material, le notificaremos que se han realizado cambios importantes en los Términos. El uso continuado de la página web o nuestro servicio después de dicho cambio constituye su aceptación de los nuevos Términos. En el caso de no aceptar nuestros términos y condiciones, se negará el acceso a la página web.</li>
                                </ol>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-4 p-0 border-0 text-center alert alert-danger  " role="alert">
                <small id="my-message" class=""></small>
            </div>
            <div class="form-check form-check-inline d-flex justify-content-center mb-4">
                <input class="form-check-input" type="checkbox" id="termCheckbox" value="" required>
                <label class="form-check-label" for="termCheckbox">
                    Autorizo tratamiento de datos y <button type="button" class="text-color-main-light" id="term-and-conditions" data-toggle="modal" data-target="#termModal">Términos y condiciones</button>
                </label>
            </div>
            <div class="d-flex justify-content-center m-4">
                <button type="submit" class="btn bg-color-main-light text-white">Siguiente</button>
            </div>
        </form>
    </div>
</template>

<script>
  import axios from 'axios'
  import {setPaciente, getPaciente, deletePaciente} from '@/dataStorage';

  const path = '/register/patient';

  export default {
    name: "SignUpPatient",
    data(){
        let userObject;
        if ( getPaciente()){
            userObject = getPaciente();
            if (userObject.source !== 1){
                this.$router.push( {name: 'signuppatient1'} );
            }
            deletePaciente();
        }else{
            this.$router.push( {name: 'signuppatient1'} );
        }

        const retorno = {
            firstName: userObject.firstName,
            lastName: userObject.lastName,
            docType: userObject.docType,
            doc: userObject.doc,
            email: userObject.email,
            eps:userObject.eps,
            password: '',
            cPassword: ''
        }

        return retorno;
    },
    beforeCreate(){},
    methods:{
      signUp( event ){
        if( this.password !== this.cPassword ){
          event.preventDefault( );
          return;
        }
        axios
          .post( this.$store.state.backURL + path,
            {
              firstName: this.firstName.trim( ),
              lastName: this.lastName.trim( ),
              docType: this.docType.trim( ),
              doc: this.doc.trim(),
              email: this.email.trim(),
              password: this.password.trim(),
              eps: this.eps.trim()
            }
          ).then( response => {
            if( response.status !== 200 ){
              this.myAlert("Error en el registro del usuario");
            }else{
              setPaciente({source:2});
              this.$router.push( {name: 'signuppatient3'} );
            }
          }).catch( error =>{
            if( error.response.status === 400 ){
              this.myAlert("Parece que ya existe un usuario con el correo \"" + this.email + "\"");
            }else{
              this.myAlert( "Error en la aplicación" );
            }
          });
        event.preventDefault( );
        return true;
      },
      back(){
        setPaciente({
            source: 2, 
            firstName: this.firstName.trim( ),
            lastName: this.lastName.trim( ),
            docType: this.docType.trim( ),
            doc: this.doc.trim(),
            email: this.email.trim(),
            password: this.password.trim(),
            eps: this.eps.trim()
        })
        this.$router.push( {name: 'signuppatient1'} );
      },
      myAlert(text){
        document.getElementById('my-message').innerText = text;
      }
    }
  }
</script>

<style scoped>
    .circle{
        border: solid 2px #FB7837;
        background-color: white;
        width: 50px;
        height: 50px;
        margin: 0 auto;
        text-align: center;
        border-radius: 25px;
        font-size: 30px;
        font-weight: bold;
    }

    .circle-active{
        background-color: #FB7837;
        color: white;
    }

    .text-color-main-light{
	    color: #418ef2;
    }

    hr {
        position: absolute;
        width: 65%;
        margin-left: 13%;
        margin-right: 13%;
        color: #FB7837;
        border: solid 5px #FB7837;
    }

    .form-control::placeholder{
        color: black;
        opacity: 50%;
    }

    .form-group{
        border-radius: 20px;
    }

    .text-color-main-dark{
        color: #1F4567;
    }

    .text-color-main-light{
        color: #418ef2;
    }

    .border-color-main-light{
        border-color: #418ef2;
    }

    .border-color-main-dark{
        border-color: #1F4567;
    }

    .bg-color-main-light{
        background-color: #418ef2;
    }

    .bg-color-main-dark{
        background-color: #1F4567;
    }

    .bg-color-secondary-light{
        background-color: #F6A78B;
    }

    .bg-color-secondary-dark{
        background-color: #FB7837;
    }

    .btn-back{
      width: 44px;
      height: 44px;

      border-radius: 22px;
      position: absolute;

      
    }

    .btn-back:focus {
      box-shadow:unset;
    }

    #term-and-conditions{
        background-color: inherit;
        border: none;
        padding: 0;
    }

    #term-and-conditions:focus{
        border: none;
        outline: none;
    }
</style>