<template>
    <div class="search-doctor container h-100">
        <div class="row h-100">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="../../../public/static/svg/arrow-left-circle.svg">
            </button>
            <div class="col-lg-6 h-100" id="form-div">
                <div class="p-4 d-flex h-100 w-100 align-items-center flex-column">
                    <img src="https://via.placeholder.com/200" width="200px" height="200px" class="mb-5 mt-5">
                    <form @submit="submit"  class="form w-100 p-4 border-form d-flex flex-column">
                        <div class="form-group mb-4 flex-fill">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text bg-color-secondary-dark border-0 text-white">
                                        <img src="../../../public/static/svg/search.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                                    </div>
                                    <select v-model="queryType" class="input-group-text form-control bg-color-secondary-dark text-white border-0" required>
                                        <option value="N">Nombre</option>
                                        <option value="E">Especialidad</option>
                                    </select>
                                </div>
                                <input v-model="query" type="text" class="form-control bg-color-secondary-light border-0" placeholder="Busqueda" required>
                            </div>
                        </div>
                        <input type="submit" value="Buscar" class="btn btn-primary align-self-center" id="btn-submit">
                    </form>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="search-results p-5" v-if="this.searchResults !== null">
                    <div class="result p-3 doctor-border d-flex flex-column" v-for="result in this.searchResults" :key="result.name"> 
                        <div class="data flex-fill d-flex flex-row">
                            <img src="https://via.placeholder.com/100" width="100px" height="100px">
                            <div class="text pl-3">
                                <b class="text-color-main-light doctor-name">{{result.userFirstName+' '+result.userLastName}}</b><br>
                                <span>{{result.doctorSpecialization}}</span><br>
                                <span>{{result.userEmail}}</span>
                            </div>
                        </div>
                        <div class="button d-flex justify-content-end p-0 m-0">
                            <button class="btn btn-primary bg-color-main-light profile-button" @click="toProfile(result.userId)">Perfil</button>
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
            searchResults: null
        }
    },
    methods:{
        submit(event){
            let specialization;
            let name;

            if (this.queryType === 'N'){
                name = this.query;
                specialization = null;
            }else{
                specialization = this.query;
                name = null;
            }

            event.preventDefault();
            const session =getAuthenticationToken();

            const path = '/doctor/search';
            axios.get( this.$store.state.backURL + path, { 
                params: { sessionToken: session.token, 
                        name: name, 
                        specialization: specialization
                } 
            })
            .then( response => {
            if( response.status !== 200 ){
                alert( 'Error Realizando la Busqueda' );
            }else{
                const data = response.data.data;
                this.searchResults = data;
                console.log(data);
            }
            } ).catch( error => {
                this.$store.state.testToken();
                alert( 'Error en la petición' );
                console.log( error );
            } );
        },
        toProfile(id){
            this.$router.push( '/mis-doctores/perfil/'+id );
        },
        back(){
            this.$router.push( {name:'myDoctors'} )
        }
    }
}
</script>

<style scoped>
.form-control::placeholder{
  color: white;
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

#form-div{
    border-right: solid 2px #FB7837;
}

.profile-button{
    border-radius: 20px;
    padding: 5px 25px;
}

.doctor-name{
    font-size: 20px;
}

.doctor-border{
    border: solid 2px #418ef2;
    border-radius: 25px;
}
</style>