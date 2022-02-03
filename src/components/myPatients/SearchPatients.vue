<template>
    <div class="search-patient container h-100">
        <div class="row h-100">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="/static/svg/arrow-left-circle.svg">
            </button>

            <div class="col-lg-6 h-100" id="form-div">
                <div class="p-4 d-flex h-100 w-100 align-items-center flex-column">
                    <img src="/static/img/searchPatientFilter.png" width="200px" height="200px" class="mb-5 mt-5">
                    <form @submit="submit"  class="form w-100 p-4 border-form d-flex flex-column">
                        <div class="form-group mb-4 flex-fill">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text bg-color-main-dark border-0 text-white">
                                        <img src="/static/svg/search.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                    <select v-model="queryType" class="input-group-text form-control bg-color-main-dark text-white border-0" required>
                                        <option value="N">Nombre</option>
                                        <option value="D">Documento</option>
                                    </select>
                                </div>
                                <input v-model="query" v-bind:type="this.TtoT[this.queryType]" class="form-control bg-color-main-light border-0 text-white" placeholder="Busqueda" required>
                            </div>
                        </div>
                        <input type="submit" value="Buscar" class="btn btn-primary align-self-center" id="btn-submit">
                    </form>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="search-results p-5" v-if="this.searchResults !== null">
                    <div class="mb-4 result p-3 doctor-border d-flex flex-column" v-for="result in this.searchResults" :key="result.name"> 
                        <div class="data flex-fill d-flex flex-row">
                            <img src="/static/img/profileCardPatientIcon.png" width="100px" height="100px">
                            <div class="text pl-3">
                                <b class="text-color-secondary-dark doctor-name">{{result.userFirstName+' '+result.userLastName}}</b><br>
                                <span>{{result.patientEps}}</span><br>
                                <span>{{result.userEmail}}</span>
                            </div>
                        </div>
                        <div class="button d-flex justify-content-end p-0 m-0">
                            <button class="btn btn-primary bg-color-main-light profile-button align-self-end" @click="request(result.userId)" :id="result.userId">Enviar Solicitud</button>
                        </div>
                    </div>
                    <div class="else" v-if="this.searchResults.length===0">
                        <div class="empty text-center border-nice p-3">
                            <h3 class="text-color-main-dark h4" style="font-weight: 600">No se han encontrado resultados.</h3>
                            <img src="/static/svg/searchDoctorIcon.svg" width="150px" height="150px" class="m-3 img-search">
                            <p>Prueba cambiando los valores de búsqueda.</p>
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
            query: '',
            queryType: 'N',
            searchResults: null,
            TtoT: {'N':'text', 'D':'number'}
        }
    },
    methods:{
        submit(event){
            let doc;
            let name;

            if (this.queryType === 'N'){
                name = this.query;
                doc = null;
            }else{
                doc = this.query;
                name = null;
            }

            event.preventDefault();
            const session =getAuthenticationToken();

            const path = '/patient/search';
            axios.get( this.$store.state.backURL + path, { 
                params: { sessionToken: session.token, 
                        name: name, 
                        doc: doc
                } 
            })
            .then( response => {
            if( response.status !== 200 ){
                alert( 'Error Realizando la Busqueda' );
            }else{
                const data = response.data.data;
                this.searchResults = data;
                console.log(data);
                this.gotData = true;
            }
            } ).catch( error => {
                this.$store.state.testToken();
                alert( 'Error en la petición' );
                console.log( error );
            } );
        },
        request(id){
            console.log(id);
            const session = getAuthenticationToken();
            console.log(session.userId)
            const path = '/doctor/prof='+session.userId+'/makeRequest';

            axios.post( this.$store.state.backURL + path,
            {
                patientId: id
            }, // Body
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then( response => {
                if( response.status !== 202 ){
                    alert( "Error en la actualización de datos" );
                }else{
                    document.getElementById(`${id}`).classList += ' btn-success bg-success';
                    document.getElementById(`${id}`).textContent = 'Enviado'
                }
            } ).catch( error => {
                if( error.response.status === 400 ){
                    alert( "Error 400" );
                }else{
                    alert( "¡Parece que hubo un error de comunicación con el servidor!" );
                }
            });
        },
        back(){
            this.$router.push( {name:'myPatients'} )
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

.text-color-secondary-dark{
    color: #FB7837;
}

.border-form{
    border: solid 1px #1F4567;
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

#form-div{
    border-right: solid 2px #1F4567;
}

.profile-button{
    border-radius: 20px;
    padding: 5px 25px;
    width: fit-content;
    height: fit-content;
}

.doctor-name{
    font-size: 20px;
}

.doctor-border{
    border: solid 2px #FB7837;
    border-radius: 25px;
}

.border-nice{
    border: solid 2px #FB7837;
    border-radius: 25px;
}

.img-search{
    opacity: 70%;
}

</style>