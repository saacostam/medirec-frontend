<template>
    <div class="container-fluid">
        <button class="btn btn-back p-0 m-4" @click="back">
            <img src="/static/svg/arrow-left-circle.svg">
        </button>
        <div class="row">
            <div class="col-lg-5 d-none d-lg-flex">
                <img src="/static/img/reportSympBanner.png" class="img-fluid" alt="" style="margin-top: 100px; margin-left:80px; max-width:350px; max-height:350px">
            </div>
            <div class="col-lg-7">
                <div class="d-flex flex-column" v-if="this.step===1">
                    <div class="text-center"><h1 class="font-weight-bold text-color-green m-3">Síntomas</h1></div>
                    <div class="d-flex m-2">
                        <hr>
                        <div class="offset-3 col-3 text-center">
                            <div class="circle circle-active">1</div>
                            <p>Síntoma y Medicamento</p>
                        </div>
                        <div class="col-3 text-center">
                            <div class="circle">2</div>
                            <p>Finalización</p>
                        </div>
                    </div>
                    <form @submit="next" class="pl-5 pr-5 form-group flex-fill d-flex flex-column">
                        <!---->
                        <div class="flex-fill">
                            <div class="form-group border-color-main-light p-3">
                                <div class="input-group m-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text border-0 bg-color-main-light">
                                            <img src="/static/svg/asterisk.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                        </div>
                                    </div>
                                    <textarea v-model="description" type="text" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Descripción Sintoma">
                                    </textarea>
                                </div>
                                <div class="input-group m-2 mb-4">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text border-0 bg-color-main-light">
                                            <img src="/static/svg/health.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                        </div>
                                    </div>
                                    <input v-model="medicine" type="text" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Nombre de Medicamento">
                                </div>

                                <div class="alert alert-primary m-2" role="alert" v-if="this.message">
                                    {{this.message}}
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn bg-color-main-light text-white">Enviar</button>
                        </div>
                    </form>
                </div>

                <div class="d-flex flex-column" v-if="this.step===2">
                    <div class="text-center"><h1 class="font-weight-bold text-color-green m-3">Síntomas</h1></div>
                    <div class="d-flex m-2">
                        <hr>
                        <div class="offset-3 col-3 text-center">
                            <div class="circle circle-active">1</div>
                            <p>Síntoma y Medicamento</p>
                        </div>
                        <div class="col-3 text-center">
                            <div class="circle circle-active">2</div>
                            <p>Finalización</p>
                        </div>
                    </div>
                    <div class="bg-white p-1 form-group">
                        <div class="flex-fill d-flex flex-column align-items-center justify-content-center">
                            <img src="/static/img/comprobado-patient.png" class="col-4 img-fluid">
                            <div class="message row">
                                <p class="offset-2 col-8 text-center">Ha ingresado nuevos sintomas y medicamentos de manera <b class="text-color-green">satisfactoria</b></p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button @click="toNav" class="btn bg-color-main-light text-white">Volver</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
    data(){
        return {
            step:1,
            description:'',
            medicine:'',
            message:''
        }
    },
    methods:{
        next(){
            event.preventDefault()

            if (!(this.medicine || this.description)){
                this.myAlert('Se debe llenar al menos un campo.')
                return
            }

            const session = getAuthenticationToken();
            const path = `/patient/prof=${session.userId}/symptoms/register`;

            var today = new Date();

            axios.post( this.$store.state.backURL + path,
                {
                    description: this.description,
                    medicine: this.medicine,
                    date: today.getTime()
                }, // Body
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: { sessionToken: session.token }
                }
                ).then( response => {
                    this.myAlert( "Error en la petición" );
                    this.step +=1;
                } ).catch( error => {
                    if( error.response.status === 400 ){
                        this.myAlert( "Error 400" );
                    }else{
                        this.myAlert( "¡Parece que hubo un error de comunicación con el servidor!" );
                    }
                });
                },
        back(){
            this.$router.push( {name: 'navSymptoms'} );
        },
        toNav(){
            this.$router.push( {name: 'navSymptoms'} )
        },
        myAlert(mess){
            this.message = mess;
        }
    }
}
</script>

<style scoped>
/* .form-control::placeholder{
  color: white;
  opacity: 50%;
} */

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
	border: solid 1px #418ef2;
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
	background-color: rgb(197, 220, 251);
}

.bg-color-secondary-dark{
	background-color: #FB7837;
}

.border-form{
    border: solid 1px #FB7837;
    border-radius: 25px;
}

.z-back{
	z-index: -100;
}

.input-color input:focus{
	background-color: #1F4567;
}

.btn-back{
    width: 44px;
    height: 44px;

    border-radius: 22px;
    position: absolute;   
    z-index: 2;  
}

.btn-back:focus {
    box-shadow:unset;
}

#btn-submit{
    width: fit-content;

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
        border: solid 2px #418ef2;
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
        background-color: #418ef2;
        color: white;
    }

    .text-color-main-light{
	    color: #418ef2;
    }

    .text-color-green{
        color: #418ef2;
    }

    .bg-color-green{
        background-color: rgb(166, 203, 38);
    }

    hr {
        position: absolute;
        width: 25%;
        margin-left: 33%;
        margin-right: 25%;
        color: #418ef2;
        border: solid 5px #418ef2;
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
</style>