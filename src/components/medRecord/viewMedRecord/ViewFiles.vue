<template>
    <div class="view-medRecord container-fluid">
        <div class="row">
            <div class="col-12">
                <h3>Mis Archivos</h3>
                <div class="pdf-files">
                    <a class="d-block" href="#" v-for="file in this.files" @click="downloadPDF(file)">{{file.documentName}}</a>
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
            files:[]
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
        }
    }

}
</script>

<style scoped>

</style>