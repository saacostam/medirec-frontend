<template>
  <div class="profile h-100 d-flex p-0">
    <div class="container-fluid flex-fill">
        <div class="row p-0 h-100">
            <div class="col-lg-6 p-3" id="img">
            </div>


            <div class="col-lg-6 h-100 d-flex" v-if="this.step===1">
                <div class="flex-fill d-flex flex-column">
                    <button class="btn btn-back p-0 m-4" @click="back">
                        <img src="../../../public/static/svg/arrow-left-circle.svg">
                    </button>
                    <div class="text-center"><h1 class="font-weight-bold text-color-main-light m-3">MediRec</h1></div>
                    <div class="d-flex m-2 pl-5 pr-5">
                        <hr>
                        <div class="col-6 text-center">
                            <div class="circle circle-active">1</div>
                            <p>Nueva Contraseña</p>
                        </div>
                        <div class="col-6 text-center">
                            <div class="circle">2</div>
                            <p>Finalización</p>
                        </div>
                    </div>
                    <form @submit="submit" class="pl-5 pr-5 form-group flex-fill d-flex flex-column">
                            <!---->
                            <div class="flex-fill d-flex flex-column justify-content-center pl-5 pr-5">
                                <div class="form-group">
                                    <div class="input-group m-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text border-0 bg-color-secondary-dark">
                                                <img src="../../../public/static/svg/envelope.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                            </div>
                                        </div>
                                        <input v-model="email" type="text" class="form-control border-0 bg-color-secondary-light" placeholder="Correo Electrónico" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group m-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text border-0 bg-color-secondary-dark">
                                                <img src="../../../public/static/svg/shield-lock.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                            </div>
                                        </div>
                                        <input v-model="password" type="password" class="form-control border-0 bg-color-secondary-light" placeholder="Contraseña" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group m-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text border-0 bg-color-secondary-dark">
                                                <img src="../../../public/static/svg/check-circle.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                            </div>
                                        </div>
                                        <input class="form-control border-0 bg-color-secondary-light" type="password"
                                        placeholder="Confirmar Contraseña" v-model="confirmPassword" id="confirmPassword" required
                                        :class="{ 'is-invalid': confirmPassword !== '' && confirmPassword !== password,
                                                    'is-valid': confirmPassword !== '' && confirmPassword === password }"/>
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

                            <div class="d-flex justify-content-center">
                                <button type="submit" class="btn bg-color-main-light text-white mb-5">Siguiente</button>
                            </div>
                    </form>
                </div>
            </div>





            <div class="col-lg-6 h-100 d-flex" v-if="this.step===2">
                <div class="flex-fill d-flex flex-column">
                    <button class="btn btn-back p-0 m-4" @click="back">
                        <img src="../../../public/static/svg/arrow-left-circle.svg">
                    </button>
                    <div class="text-center"><h1 class="font-weight-bold text-color-main-light m-3">MediRec</h1></div>
                    <div class="d-flex m-2 pl-5 pr-5">
                        <hr>
                        <div class="col-6 text-center">
                            <div class="circle circle-active">1</div>
                            <p>Nueva Contraseña</p>
                        </div>
                        <div class="col-6 text-center">
                            <div class="circle circle-active">2</div>
                            <p>Finalización</p>
                        </div>
                    </div>
                    <form @submit="toLogin" class="pl-5 pr-5 form-group flex-fill d-flex flex-column">
                            <!---->
                            <div class="flex-fill d-flex flex-column justify-content-center align-items-center pl-5 pr-5">
                                <img src="../../../public/static/img/comprobado-doctor.png" class="col-6 img-fluid">
                                <div class="message row">
                                    <p class="offset-2 col-8 text-center">Ha completado su perfil de forma satisfactoria. Bienvenido a <b class="text-color-main-light">MediRec</b></p>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center">
                                <button type="submit" class="btn bg-color-main-light text-white mb-5">Volver</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Login.vue",
    components: {},
    data(){
        return {
            token: '',
            email: '',
            password: '',
            confirmPassword: '',
            step:1
        }
    },
    beforeMount(){
        this.token = this.$route.query.token;
    },
    methods:{
        getToken(){
            console.log(this.token);
            return this.token;
        },
        submit(event){
            event.preventDefault();
            axios.post( this.$store.state.backURL + '/password/recovery/patient/savePassword',
            {
                token: this.token,
                email: this.email,
                password: this.password, 
                confirmPassword: this.confirmPassword
            }, // Body
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then( response => {
                if( response.status !== 202 ){
                    this.myAlert( "Error en la actualización de datos" );
                }else{
                    this.step += 1;
                }
            } ).catch( error => {
                if( error.response.status === 400 ){
                    this.myAlert( "Error 400" );
                }else{
                    this.myAlert( "¡Parece que hubo un error de comunicación con el servidor!" );
                }
            });
        },
        back(){
            this.$router.push({name:"login"});
        },
        toLogin(){
            this.$router.push({name:"login"});
        },
        myAlert(text){
            document.getElementById('my-message').innerText = text;
        }
    }
}
</script>

<style scoped>
    .circle{
        border: solid 2px rgb(86, 81, 226);
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
        background-color: rgb(86, 81, 226);
        color: white;
    }

    .text-color-main-light{
	    color: #418ef2;
    }

    .text-color-green{
        color: rgb(86, 81, 226);
    }

    .bg-color-green{
        background-color: rgb(86, 81, 226);
    }

    hr {
        position: absolute;
        width: 37%;
        margin-left: 20%;
        margin-right: 20%;
        color: rgb(86, 81, 226);
        border: solid 5px rgb(86, 81, 226);
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
        background-color: rgb(203, 202,246);
    }

    .bg-color-secondary-dark{
        background-color: rgb(86, 81, 226);
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

    #img{
        background-image: url("../../../public/static/img/changeKeyIcon.jpg");
        background-position: top center;
	    background-size:cover;
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