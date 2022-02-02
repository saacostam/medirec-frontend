<template>
    <div class="container-fluid p-0">
        <div class="d-block title text-white text-center">Mi Historia Clínica</div>
        <button class="btn btn-back p-0 m-4" @click="back">
            <img src="/static/svg/arrow-left-circle.svg">
        </button>
        <div class="row">
            <div class="col-lg-6 p-4">
                <img src="/static/img/uploadFilesImage.jpg" class="img-fluid img-doc">
            </div>
            <div class="col-lg-6 p-4" v-if="this.petitionSent===false">
                <div class="d-flex justify-content-center">
                    <form @submit="submit" class="">
                        <div class="form-group bg-color-secondary-dark" id="form-group-files">
                            <label for="uploadFileInput" class="text-white">Seleccione el documento que desea almacenar</label>
                            <input type="file" name="uploadFileInput" id="uploadFileInput" class="d-flex text-white" v-on:change="updateFile" required>
                        </div>
                        <div class="form-group d-flex justify-content-center">
                            <input type="submit" value="Guardar" class="btn btn-primary" id="save-files-button">
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-6 p-4" v-else>
                <div class="d-flex align-items-center flex-column">
                    <div class="flex-fill d-flex flex-column align-items-center justify-content-center">
                        <img src="/static/img/comprobado-patient.png" class="col-4 img-fluid">
                        <div class="message row m-3 p-0">
                            <p class="offset-2 col-8 text-center">Archivos guardados <b class="text-color-main-light">satisfactoriamente</b></p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button @click="toMedRecord" class="btn bg-color-main-light text-white">Volver</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';
const path = '/patient/documents/'

export default {
    data(){
        return {
            files:'',
            petitionSent: false
        }
    },
    methods:{
        submit(event){
            event.preventDefault();
            const session = getAuthenticationToken();
            let formData = new FormData();
            formData.append("files", this.files);
            formData.append('sessionToken', session.token);

            axios.post( this.$store.state.backURL + path +session.userId, formData,
            {headers:{
                'Content-Type':'multipart/form-data'
            }})
            .then( response => {
                if( response.status !== 200 ){
                    alert( "Error en la actualización de datos" );
                }else{
                    this.petitionSent = true;
                }
            } ).catch( error => {
                this.$store.state.testToken();
                if( error.response.status === 400 ){
                    alert( "Error 400" );
                }else{
                    alert( "¡Parece que hubo un error de comunicación con el servidor!" );
                }
            });
        },
        toMedRecord(){
            this.$router.push({name: 'myMedRecord'})
        },
        updateFile(event){
            this.files = event.target.files[0];
            console.log(this.files);
        },
        back(){
            this.$router.push( {name:'myMedRecord'} );
        }
    }
}
</script>

<style scoped>
    .img-doc{
        border-radius: 25px;
    }

    .row{
        margin: 80px 0 0 0;
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

    .title{
        background-color:#1F4567;
        padding: 10px;
        font-weight: 700;
        width: 100%;
    }

    .img-upload{
        border-radius: 25px;
    }

    .bg-color-purple{
        background-color: rgb(86, 81, 226);
    }

    .border-color-purple{
        border: solid 3px;
        border-color: rgb(86, 81, 226);
        border-radius: 20px;
    }

    .div-button{
        border-radius: 20px;
        padding: 1px 20px;
    }

    .div-button:hover{
        cursor: pointer;
    }

    .div-button>h4{
        font-size: 22px;
        margin: 0;
    }

    .img-button{
        border-radius: 50%;
        border: solid 3px #418ef2;
    }

    .img-button:hover{
        cursor: pointer;
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

    #form-group-files, #save-files-button{
        border-radius: 25px;

        font-size: 20px;
        font-weight: 600;
    }

    #form-group-files{
        padding: 40px;
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
</style>