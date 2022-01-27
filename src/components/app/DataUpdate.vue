<template>
  <div class="profile h-100 d-flex p-0">
    <div class="container">
        <div class="row p-5">
            <div class="col-lg-6 d-flex justify-content-center flex-column" v-if="this.petitionSent===false">
                <div class="d-inline title text-white pl-5 pr-5">Actualización de Datos</div>
                <form @submit="submit" class="bg-white p-5 form-group border">
                    <!---->
                    <div class="form-group mb-4" v-if="this.showBirthDay">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text border-0" v-bind:class="this.bgClass">
                                <img src="../../../public/static/svg/calendar-check.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                            </div>
                        </div>
                        <input v-model="userBirthDay" type="date" class="form-control border-0" placeholder="Fecha de Nacimiento" required v-bind:class="this.bgFormClass" v-bind:max="new Date().toISOString().split('T')[0]">
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text border-0" v-bind:class="this.bgClass">
                                <img src="../../../public/static/svg/person-circle.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                            </div>
                        </div>
                        <select v-model="userGender" type="date" class="form-control border-0" placeholder="Genero" required v-bind:class="this.bgFormClass">
                            <option disabled value="sel">Seleccione su Género</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text border-0" v-bind:class="this.bgClass">
                                <img src="../../../public/static/svg/shop-window.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                            </div>
                        </div>
                        <input v-model="userAddress" type="text" class="form-control border-0" placeholder="Direccción" required v-bind:class="this.bgFormClass">
                        </div>
                    </div>

                    <!---->

                    <div class="form-group mb-4" v-if="this.authority==='PATIENT'">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text border-0" v-bind:class="this.bgClass">
                                <img src="../../../public/static/svg/people-fill.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                            </div>
                        </div>
                        <select v-model="patientMaritalStatus" type="text" class="form-control border-0" placeholder="Estado Civil" required v-bind:class="this.bgFormClass">
                            <option disabled value="sel">Selecciona su Estado Civil</option>
                            <option value="Soltero/a">Soltero/a</option>
                            <option value="Casado/a">Casado/a</option>
                            <option value="Unión Libre">Unión Libre</option>
                            <option value="Separado/a">Separado/a</option>
                            <option value="Divorciado/a">Divorciado/a</option>
                            <option value="Viudo/a">Viudo/a</option>
                        </select>
                        </div>
                    </div>

                    <div class="form-group mb-4" v-if="this.authority==='DOCTOR'">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text border-0" v-bind:class="this.bgClass">
                                <img src="../../../public/static/svg/building.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                            </div>
                        </div>
                        <input v-model="doctorConsultory" type="text" class="form-control border-0" placeholder="Consultorio" required v-bind:class="this.bgFormClass">
                        </div>
                    </div>
                    <div class="form-group mb-4" v-if="this.authority==='DOCTOR' && this.showDoctorUniversity">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text border-0" v-bind:class="this.bgClass">
                                <img src="../../../public/static/svg/book.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                            </div>
                        </div>
                        <input v-model="doctorUniversity" type="text" class="form-control border-0" placeholder="Universidad" required v-bind:class="this.bgFormClass">
                        </div>
                    </div>
                    <div class="form-group mb-4" v-if="this.authority==='DOCTOR'">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text border-0" v-bind:class="this.bgClass">
                                    <img src="../../../public/static/svg/award.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                </div>
                            </div>
                            <input v-model="doctorExperience" type="number" class="form-control border-0" placeholder="Experiencia" required v-bind:class="this.bgFormClass">
                            <div class="input-group-append">
                                <div class="input-group-text border-0 text-white" v-bind:class="this.bgClass">años</div>
                            </div>
                        </div>
                    </div>

                    <!---->
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
                        <label class="form-check-label text-center" for="termCheckbox">
                            Autorizo tratamiento de datos y <button type="button" class="text-color-main-light" id="term-and-conditions">Términos y condiciones</button>
                        </label>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn bg-color-main-light text-white">Actualizar</button>
                    </div>
                </form>
            </div>
            <div v-else class="col-lg-6 d-flex justify-content-center flex-column">
                <div class="d-inline title text-white pl-5 pr-5">Actualización de Datos</div>
                <div class="bg-white p-5 form-group border">
                    <div class="flex-fill d-flex flex-column align-items-center justify-content-center">
                        <img v-if="this.authority=='PATIENT'" src="../../../public/static/img/comprobado-patient.png" class="col-4 img-fluid">
                        <img v-else src="../../../public/static/img/comprobado-doctor.png" class="col-4 img-fluid">
                        <div class="message row">
                            <p class="offset-2 col-8 text-center">Actualización de datos <b class="text-color-main-light">satisfactoria</b></p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button @click="toProfile" class="btn bg-color-main-light text-white">Volver</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 p-4">
                <img src="../../../public/static/img/updatePatientInfoIcon.jpg" class="img-fluid rounded-circle border border-danger" v-if="this.authority==='PATIENT'">
                <img src="../../../public/static/img/updateDoctorInfoIcon.png" class="img-fluid rounded-circle border border-primary" v-else>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
  name: 'Roles',
  data( ){
    let dataObject = {
      bgClass:'bg-color-main-dark',
      bgFormClass:'bg-color-main-lighter',
      authority: '',
      userId: '',
      userEmail: '',
      userBirthDay: '', 
      showBirthDay: true,
      userGender: '', 
      userAddress:'', 
      patientMaritalStatus: 'sel',
      doctorConsultory: '',
      doctorExperience: '',
      doctorUniversity: '',
      showDoctorUniversity: true,
      petitionSent: false
      };
    const session = getAuthenticationToken( )

    let requestPath;

    if (session.authorities){
      if (session.authorities[0].authority==='DOCTOR'){
        requestPath = '/doctor';
        dataObject.bgClass = 'bg-color-main-dark';
        dataObject.bgFormClass = 'bg-color-main-lighter'
      }else{
        requestPath = '/patient';
        dataObject.bgClass = 'bg-color-secondary-dark';
        dataObject.bgFormClass = 'bg-color-secondary-light'
      }
      dataObject.authority = session.authorities[0].authority;
      dataObject.userId = session.userId;
    }

    axios.get( this.$store.state.backURL + requestPath + '/' + session.userId, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los datos de perfil' );
          }else{
            const data = response.data.data;
            if (data.userBirthDay){
                dataObject.showBirthDay = false;
                dataObject.userBirthDay = data.userBirthDay.split('T')[0];
            }
            dataObject.userGender = ( data.userGender) ?  data.userGender : 'sel';
            dataObject.userAddress = data.userAddress;
            dataObject.patientMaritalStatus = ( data.patientMaritalStatus) ?  data.patientMaritalStatus : 'sel';
            dataObject.doctorConsultory = data.doctorConsultory;
            dataObject.doctorExperience = data.doctorExperience;

            if (data.doctorUniversity){dataObject.showDoctorUniversity = false;}
            dataObject.doctorUniversity = data.doctorUniversity;
            // console.log(data);
          }
        } ).catch( error => {
            this.$store.state.testToken();
            alert( 'Error en la petición' );
        } );
    return dataObject
  },
  mounted(){
    
  },
  methods:{
    submit(event){
        const session = getAuthenticationToken( )
        if (session.authorities[0].authority==="PATIENT"){
            const path = "/register/patient/complete"
            axios.post( this.$store.state.backURL + path,
            {
                id: this.userId,
                address: this.userAddress,
                birthDay: this.userBirthDay.split('-').reverse().join('/'),
                gender: this.userGender,
                maritalStatus: this.patientMaritalStatus 
            }, // Body
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { sessionToken: session.token }
            }
                ).then( response => {
                    if( response.status !== 200 ){
                        alert( "Error en la actualización de datos" );
                    }else{
                        // console.log(response);
                        this.petitionSent = true;
                    }
                } ).catch( error => {
                    if( error.response.status === 400 ){
                      alert( "Error 400" );
                    }else{
                      alert( "¡Parece que hubo un error de comunicación con el servidor!" );
                    }
                } );

                event.preventDefault();
        }else{
            const path = "/register/doctor/complete"
            axios.post( this.$store.state.backURL + path,
            {
                id: this.userId,
                address: this.userAddress,
                birthDay: this.userBirthDay.split('-').reverse().join('/'),
                gender: this.userGender,
                consultory: this.doctorConsultory,
                experience: this.doctorExperience,
                university: this.doctorUniversity, 
            }, // Body
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { sessionToken: session.token }
            }
                ).then( response => {
                    if( response.status !== 200 ){
                        this.myAlert( "Error en la actualización de datos" );
                    }else{
                        console.log(response);
                        this.petitionSent = true;
                    }
                } ).catch( error => {
                    if( error.response.status === 400 ){
                      this.myAlert( "Error 400: Bad Request" );
                    }else{
                      this.myAlert( "¡Parece que hubo un error de comunicación con el servidor!" );
                    }
                } );

                event.preventDefault();
        }
      },
      capitalize(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
      return splitStr.join(' '); 
      },
      toProfile(){
        this.$router.push( {name: 'profile'} );
      },
      myAlert(text){
        document.getElementById('my-message').innerText = text;
      }
  }
}
</script>

<style scoped>
    .title{
    background-color:#1F4567;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin: 0 auto;
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

    .bg-color-main-lighter{
        background-color: rgb(218, 225, 230);
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

    .bg-color-main-lighter{
        background-color: rgb(218, 225, 230);
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
