<template>
  <div class="profile h-100 d-flex p-0">
    <div class="container flex-fill">
        <div class="row p-0 h-100">
            <button class="btn btn-back p-0 m-4" @click="toMedRecord">
                <img src="/static/svg/arrow-left-circle.svg">
            </button>
            <div class="col-lg-7 d-flex flex-column" v-if="this.step===1">
                <div class="text-center"><h1 class="font-weight-bold text-color-green m-3">Historia Clinica</h1></div>
                <div class="d-flex m-2">
                    <hr>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">1</div>
                        <p>Alergias</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle">2</div>
                        <p>Enfermedades</p></div>
                    <div class="col-3 text-center">
                        <div class="circle">3</div>
                        <p>Antecedentes Personales</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle">4</div>
                        <p>Antecedentes Familiares</p>
                    </div>
                </div>
                <form @submit="next" class="pl-5 pr-5 form-group flex-fill d-flex flex-column">
                    <!---->
                    <div class="flex-fill">
                        <div class="card message" v-if="this.allergies.length===0">
                            <div class="card-body offset-lg-2 col-lg-8">
                                <h5 class="card-title text-center">Ha seleccionado <b class="text-color-green">0</b> alergias</h5>
                                <p class="card-text mb-2 text-center">Si quiere añadir una entrada presione <span id="add-button">+</span><br> o <span id="next-button">Siguiente</span> en caso contrario.</p>
                            </div>
                        </div>
                        <div class="form-group border border-success p-3" v-for="allergy in this.allergies">
                            <div class="input-group m-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text border-0 bg-color-secondary-dark">
                                        <img src="/static/svg/health.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                </div>
                                <input v-model="allergy.allergen" type="text" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Alergia" required>
                            </div>
                            <div class="input-group m-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text border-0 bg-color-secondary-dark">
                                        <img src="/static/svg/123.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                </div>
                                <input v-model="allergy.type" type="number" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Tipo de Alergia" required min="1" max="4">
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="button" class="btn btn-danger m-1" @click="removeAllergy"><img src="/static/svg/dash.svg"></button>
                        <button type="button" class="btn bg-color-green text-white m-1" @click="addAllergy"><img src="/static/svg/plus.svg"></button>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn bg-color-main-light text-white">Siguiente</button>
                    </div>
                </form>
            </div>





            <div class="col-lg-7 d-flex flex-column" v-else-if="this.step===2">
                <div class="text-center"><h1 class="font-weight-bold text-color-green m-3">Historia Clinica</h1></div>
                <div class="d-flex m-2">
                    <hr>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">1</div>
                        <p>Alergias</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">2</div>
                        <p>Enfermedades</p></div>
                    <div class="col-3 text-center">
                        <div class="circle">3</div>
                        <p>Antecedentes Personales</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle">4</div>
                        <p>Antecedentes Familiares</p>
                    </div>
                </div>
                <form @submit="next" class="pl-5 pr-5 form-group flex-fill d-flex flex-column">
                    <!---->
                    <div class="flex-fill">
                        <div class="card message" v-if="this.illnesses.length===0">
                            <div class="card-body offset-lg-2 col-lg-8">
                                <h5 class="card-title text-center">Ha seleccionado <b class="text-color-green">0</b> enfermedades</h5>
                                <p class="card-text mb-2 text-center">Si quiere añadir una entrada presione <span id="add-button">+</span><br> o <span id="next-button">Siguiente</span> en caso contrario.</p>
                            </div>
                        </div>
                        <div class="form-group border border-success p-3" v-for="illness in this.illnesses">
                            <div class="input-group m-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text border-0 bg-color-secondary-dark">
                                        <img src="/static/svg/health.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                </div>
                                <input v-model="illness.illnessName" type="text" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Enfermedad" required>
                            </div>
                            <div class="input-group m-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text border-0 bg-color-secondary-dark">
                                        <img src="/static/svg/calendar-check.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                </div>
                                <input v-model="illness.detectionDate" type="date" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Fecha de Descubrimiento" required v-bind:max="new Date().toISOString().split('T')[0]">
                            </div>
                            <div class="input-group m-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text border-0 bg-color-secondary-dark">
                                        <img src="/static/svg/body-text.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                </div>
                                <textarea v-model="illness.illnessDescription" type="long" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Descripción" required></textarea>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="button" class="btn btn-danger m-1" @click="removeIlness"><img src="/public/static/svg/dash.svg"></button>
                        <button type="button" class="btn bg-color-green text-white m-1" @click="addIlness"><img src="/public/static/svg/plus.svg"></button>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn bg-color-main-light text-white mr-3" @click="back">Atras</button>
                        <button type="submit" class="btn bg-color-main-light text-white">Siguiente</button>
                    </div>
                </form>
            </div>


            
            <div class="col-lg-7 d-flex flex-column" v-else-if="this.step===3">
                <div class="text-center"><h1 class="font-weight-bold text-color-green m-3">Historia Clinica</h1></div>
                <div class="d-flex m-2">
                    <hr>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">1</div>
                        <p>Alergias</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">2</div>
                        <p>Enfermedades</p></div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">3</div>
                        <p>Antecedentes Personales</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle">4</div>
                        <p>Antecedentes Familiares</p>
                    </div>
                </div>
                <form @submit="next" class="pl-5 pr-5 form-group flex-fill d-flex flex-column">
                    <!---->
                    <div class="flex-fill">
                        <div class="card message" v-if="this.personalRecords.length===0">
                            <div class="card-body">
                                <h5 class="card-title text-center">Ha seleccionado <b class="text-color-green">0</b> antecedentes personales</h5>
                                <p class="card-text mb-2 text-center">Si quiere añadir una entrada presione <span id="add-button">+</span><br> o <span id="next-button">Siguiente</span> en caso contrario.</p>
                            </div>
                        </div>
                        <div class="form-group border border-success p-3" v-for="personalRecord in this.personalRecords">
                            <div class="input-group m-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text border-0 bg-color-secondary-dark">
                                        <img src="/static/svg/calendar-check.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                </div>
                                <input v-model="personalRecord.date" type="date" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Fecha de Descubrimiento" required v-bind:max="new Date().toISOString().split('T')[0]">
                            </div>
                            <div class="input-group m-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text border-0 bg-color-secondary-dark">
                                        <img src="/static/svg/body-text.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                </div>
                                <textarea v-model="personalRecord.description" type="long" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Descripción" required></textarea>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="button" class="btn btn-danger m-1" @click="removePersonalRecord"><img src="/static/svg/dash.svg"></button>
                        <button type="button" class="btn bg-color-green text-white m-1" @click="addPersonalRecord"><img src="/static/svg/plus.svg"></button>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn bg-color-main-light text-white mr-3" @click="back">Atras</button>
                        <button type="submit" class="btn bg-color-main-light text-white">Siguiente</button>
                    </div>
                </form>
            </div>



            <div class="col-lg-7 d-flex flex-column" v-else-if="this.step===4">
                <div class="text-center"><h1 class="font-weight-bold text-color-green m-3">Historia Clinica</h1></div>
                <div class="d-flex m-2">
                    <hr>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">1</div>
                        <p>Alergias</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">2</div>
                        <p>Enfermedades</p></div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">3</div>
                        <p>Antecedentes Personales</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">4</div>
                        <p>Antecedentes Familiares</p>
                    </div>
                </div>
                <form @submit="next" class="pl-5 pr-5 form-group flex-fill d-flex flex-column">
                    <!---->
                    <div class="flex-fill">
                        <div class="card message" v-if="this.familyBackgrounds.length===0">
                            <div class="card-body offset-lg-2 col-lg-8">
                                <h5 class="card-title text-center">Ha seleccionado <b class="text-color-green">0</b> antecedentes familiares</h5>
                                <p class="card-text mb-2 text-center">Si quiere añadir una entrada presione <span id="add-button">+</span><br> o <span id="next-button">Siguiente</span> en caso contrario.</p>
                            </div>
                        </div>
                        <div class="form-group border border-success p-3" v-for="familyBackground in this.familyBackgrounds" >
                            <div class="input-group m-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text border-0 bg-color-secondary-dark">
                                        <img src="/static/svg/person-circle.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                </div>
                                <input v-model="familyBackground.familyMember" type="text" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Familiar" required>
                            </div>
                            <div class="input-group m-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text border-0 bg-color-secondary-dark">
                                        <img src="/static/svg/body-text.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                </div>
                                <textarea v-model="familyBackground.description" type="long" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Descripción" required></textarea>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="button" class="btn btn-danger m-1" @click="removeFamilyBackground"><img src="/static/svg/dash.svg"></button>
                        <button type="button" class="btn bg-color-green text-white m-1" @click="addFamilyBackground"><img src="/static/svg/plus.svg"></button>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn bg-color-main-light text-white mr-3" @click="back">Atras</button>
                        <button type="submit" class="btn bg-color-main-light text-white">Siguiente</button>
                    </div>
                </form>
            </div>



            <div class="col-lg-7 d-flex flex-column" v-else-if="this.step===5">
                <div class="text-center"><h1 class="font-weight-bold text-color-green m-3">Historia Clinica</h1></div>
                <div class="d-flex m-2">
                    <hr>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">1</div>
                        <p>Alergias</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">2</div>
                        <p>Enfermedades</p></div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">3</div>
                        <p>Antecedentes Personales</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">4</div>
                        <p>Antecedentes Familiares</p>
                    </div>
                </div>
                <form @submit="submit" class="pl-5 pr-5 form-group flex-fill d-flex flex-column">
                    <!---->
                    <div class="flex-fill d-flex justify-content-center align-content-center">
                        <div class="col-6">
                            <img src="/static/img/warningIcon.jpg" class="img-fluid">
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
                            Autorizo tratamiento de datos y <button type="button" class="text-color-main-light" id="term-and-conditions" data-toggle="modal" data-target="#termModal">Términos y condiciones</button>
                        </label>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn bg-color-main-light text-white mr-3" @click="back">Atras</button>
                        <button type="submit" class="btn bg-color-main-light text-white">Enviar</button>
                    </div>
                </form>
            </div>



            <div v-else class="col-lg-7 d-flex flex-column">
                <div class="text-center"><h1 class="font-weight-bold text-color-green m-3">Historia Clinica</h1></div>
                <div class="d-flex m-2">
                    <hr>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">1</div>
                        <p>Alergias</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">2</div>
                        <p>Enfermedades</p></div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">3</div>
                        <p>Antecedentes Personales</p>
                    </div>
                    <div class="col-3 text-center">
                        <div class="circle circle-active">4</div>
                        <p>Antecedentes Familiares</p>
                    </div>
                </div>
                <div class="bg-white p-5 form-group">
                    <div class="flex-fill d-flex flex-column align-items-center justify-content-center">
                        <img src="/static/img/comprobado-patient.png" class="col-4 img-fluid">
                        <div class="message row">
                            <p class="offset-2 col-8 text-center">Ha ingresado su historia medica de manera <b class="text-color-green">satisfactoria</b></p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button @click="toMedRecord" class="btn bg-color-main-light text-white">Volver</button>
                    </div>
                </div>
            </div>

            <div class="col-lg-5 pt-5 pr-5">
                <img src="/static/img/addMedicalHistoryIcon.jpeg" id="doctor-image" class="img-fluid rounded-circle border border-success">
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
      authority: '',
      userId: '',
      step: 1,
      allergies: [{allergen:'', type:''}],
      illnesses: [{illnessName:'', detectionDate:'', illnessDescription:''}],
      personalRecords: [{description:'', date:''}],
      familyBackgrounds: [{familyMember:'', description:''}]
    };
    const session = getAuthenticationToken( )

    dataObject.authority = session.authorities[0].authority;
    dataObject.userId = session.userId;

    if (dataObject.authority === "DOCTOR"){
        this.$router.push( {name: 'home'} );
    }
    return dataObject;
  },
  beforeCreate(){
  },
  methods:{
    next(event){
        this.step += 1;
        event.preventDefault();
    },
    back(){
        this.step -= 1;
    },
    submit(event){
        event.preventDefault();
        const session = getAuthenticationToken();
        const path = "/patient/medicalHistory/";

        const allergies = this.allergies;
        const illnesses = this.illnesses;
        const personalRecords = this.personalRecords;
        const familyBackgrounds = this.familyBackgrounds;

        // DATE FORMAT
        for(let i=0; i<illnesses.length; i++){
            illnesses[i].detectionDate = illnesses[i].detectionDate.split('-').reverse().join('/');
        }
        for(let i=0; i<personalRecords.length; i++){
            personalRecords[i].date = personalRecords[i].date.split('-').reverse().join('/');
        }

        axios.post( this.$store.state.backURL + path +this.userId,
        {
            allergies,
            illnesses,
            personalRecords,
            familyBackgrounds
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
                this.updateMedRecord();
                this.step +=1;
            }
        } ).catch( error => {
            if( error.response.status === 400 ){
                this.myAlert( "Error 400" );
            }else{
                this.myAlert( "¡Parece que hubo un error de comunicación con el servidor!" );
            }
        });


      },
      myAlert(text){
        document.getElementById('my-message').innerText = text;
      },
      addAllergy(){this.allergies.push( {allergen:'', type:''} );},
      removeAllergy(){this.allergies.pop()},
      addIlness(){this.illnesses.push( {illnessName:'', detectionDate:'', illnessDescription:''} );},
      removeIlness(){this.illnesses.pop()},
      addPersonalRecord(){this.personalRecords.push( {date:'', description:''} );},
      removePersonalRecord(){this.personalRecords.pop()},
      addFamilyBackground(){this.familyBackgrounds.push( {familyMember:'', description:''} );},
      removeFamilyBackground(){this.familyBackgrounds.pop()},
      toMedRecord(){
        this.$router.push( {name: 'myMedRecord'} );
      },
      updateMedRecord(){
        let dataObject = {
            authority: '',
            userId: '',
            allergies: [],
            illnesses: [],
            personalRecords: [],
            familyBackgrounds: []
        };

        const requestPath = "/patient/medicalHistory/";
        const session = getAuthenticationToken();

        axios.get( this.$store.state.backURL + requestPath + session.userId, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo la Historia Medica' );
          }else{
            const data = response.data.data;

            // Get Registered Entries
            if (data.allergies !== []){dataObject.allergies = data.allergies;}
            if (data.illnesses !== []){dataObject.illnesses = data.illnesses;}
            if (data.personalRecords !== []){dataObject.personalRecords = data.personalRecords;}
            if (data.familyBackgrounds !== []){dataObject.familyBackgrounds = data.familyBackgrounds;}

            // Format Time
            for(let i=0; i<dataObject.illnesses.length; i++){
                dataObject.illnesses[i].detectionDate = dataObject.illnesses[i].detectionDate.split('T')[0];
            }

            // Format Time and Manage BackEnd Name Changes
            for(let i=0; i<dataObject.personalRecords.length; i++){
                dataObject.personalRecords[i].date = dataObject.personalRecords[i].date.split('T')[0];
                dataObject.personalRecords[i].description = dataObject.personalRecords[i].prDescription;
            }

            this.$store.state.medRecord = dataObject;
          }
        } ).catch( error => {
            this.$store.state.testToken();
            alert( 'Error en la petición' );
            console.log( error );
        } );

        this.$store.state.medRecord = dataObject;
      }
  }
}
</script>

<style scoped>
    .message{
        border-radius: 20px;
    }

    .btn-back{
      width: 44px;
      height: 44px;

      border-radius: 22px;
      position: absolute;

      z-index: 100;
    }

    .btn-back:focus {
      box-shadow:unset;
    }

    #add-button{
        background-color: rgb(166, 203, 38);
        font-size: 14px;
        border: none;
        border-radius: 5px;
        padding: 0px 6px;
        color: white;
    }

    #next-button{
        background-color: #418ef2;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        padding: 0px 6px;
        color:white;
    }

        .circle{
        border: solid 2px rgb(166, 203, 38);
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
        background-color: rgb(166, 203, 38);
        color: white;
    }

    .text-color-main-light{
	    color: #418ef2;
    }

    .text-color-green{
        color: rgb(166, 203, 38);
    }

    .bg-color-green{
        background-color: rgb(166, 203, 38);
    }

    hr {
        position: absolute;
        width: 65%;
        margin-left: 13%;
        margin-right: 13%;
        color: rgb(166, 203, 38);
        border: solid 5px rgb(166, 203, 38);
    }

    .form-control::placeholder{
        color: black;
        opacity: 50%;
    }

    .form-group{
        border-radius: 20px;
    }

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
