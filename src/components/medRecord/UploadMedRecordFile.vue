<template>
    <div class="container">
        <button class="btn btn-secondary m-3" @click="toMedRecord">Back</button>
        <div class="row">
            <div class="offset-md-3 col-md-6">
                <h1>Historia Medica: Documentos</h1>
                <form @submit="submit">
                    <div class="form-group">
                        <label for="uploadFileInput">Seleccione el documento que desea almacenar</label>
                        <input type="file" name="uploadFileInput" id="uploadFileInput" class="form-control" v-on:change="updateFile">
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Enviar" class="btn btn-primary">
                    </div>
                </form>
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
            files:''
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
                    alert("Success");
                }
            } ).catch( error => {
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
        }
    }
}
</script>

<style scoped>

</style>