<template>
    <div class="view-medRecord d-flex flex-column">
        <div class="d-block title-patient text-white text-center w-100">Historia Clínica</div>
        <div class="flex-fill">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="/static/svg/arrow-left-circle.svg">
            </button>
            <div class="container">
                <div class="row  p-2">
                    <div class="col-lg-5 p-5">
                        <img src="/static/img/archivosIcon.png" class="img-fluid img-button">
                        <div>
                            <h4 class="name bg-color-main-light text-white">Archivos</h4>
                        </div>
                    </div>
                    <div class="col-lg-7 p-5">
                        <div class="d-block title text-white text-center">Archivos</div>

                        <div class="files" v-if="this.files !== null">
                            <div v-if="this.files.length>0">
                                <div class="file d-flex flex-row border" v-for="file in this.files" :key="file.data">
                                    <div class="name flex-fill d-flex align-items-center p-2">
                                        <span>{{file.documentName}}</span>
                                    </div>
                                    <div class="download p-2" @click="downloadPDF(file)">
                                        <img src="/static/img/descargarIcon.png" width="30px" height="30px">
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="card message">
                                    <div class="card-body offset-lg-2 col-lg-8">
                                        <h5 class="card-title text-center">El paciente tiene <b class="text-color-main-dark">0</b> archivos.</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center p-4 spinner" v-else>
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
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
const path = '/patient/documents/'

export default {
    data(){
        return {
            files:null
        }
    },
    beforeCreate(){
        const session = getAuthenticationToken();
        axios.get( this.$store.state.backURL + path +session.userId, { params: { sessionToken: session.token } })
            .then( response => {
                if( response.status !== 200 ){
                    alert( "Error en la actualización de datos" );
                }else{
                    this.files = response.data.data;
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
    methods:{
        downloadPDF(file){
            const linkSource = `data:application/pdf;base64,${file.data}`;
            const downloadLink = document.createElement("a");
            const fileName = file.documentName;
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
            downloadLink.remove();
        },
        back(){
            this.$router.push( {name: 'navViewMedRecordPatient'} );
        }
    }

}
</script>

<style scoped>
    .name{
        width: fit-content;
        margin: 5px auto;
        padding: 5px 20px;
        border-radius: 20px;
    }

    .title{
        background-color:#1F4567;
        padding: 10px;
        font-weight: 700;
        margin: 0 auto;
    }

    .title-patient{
        background-color: rgb(86, 81, 226);
        padding: 10px;
        font-weight: 700;
        margin: 0 auto;
    }

    .bg-color-purple{
        background-color: rgb(86, 81, 226);
    }

    .border-color-purple{
        border: solid 3px;
        border-color: rgb(86, 81, 226);
        border-radius: 20px;
    }

    .img-button{
        border-radius: 50%;
        border: solid 3px #418ef2;
    }

    .bg-color-main-lighter{
        background-color: rgb(218, 225, 230);
    }

    .bg-color-main-light{
        background-color: #418ef2;
    }

    .text-color-main-dark{
        color: #1F4567;
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

    .download{
        border-left: 1px solid #dee2e6;
    }

    .download:hover{
        cursor: pointer;
    }

    .download:active{
        box-shadow:1px 1px 1px rgb(36, 36, 36);
    }
</style>