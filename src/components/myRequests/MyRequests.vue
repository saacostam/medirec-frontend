<template>
    <div class="my-requests container">
        <div class="row">
            <div class="col-lg-6">
                <img src="/static/img/myRequestIcon.jpg" class="img-fluid">
            </div>
            <div class="col-lg-6 mt-5" v-if="this.gotData"> 
                <div class="empty text-center border-nice p-3" v-if="this.doctors===null">
                    <h3 class="text-color-main-dark" style="font-weight: 600">No tienes solicitudes pendientes</h3>
                    <p>Cuando un doctor quiera ver tu perfil, aperecerá aqui.</p>
                </div>
                <div class="list" v-else>
                    <div class="result d-flex flex-row" v-for="doctor in this.doctors" :key="doctor.id">
                        <div class="data flex-fill">
                            <div class="result p-3 doctor-border d-flex flex-row"> 
                                <div class="data flex-fill d-flex flex-row">
                                    <img src="/static/svg/doctorIconSearching.svg" width="100px" height="100px">
                                    <div class="text pl-3">
                                        <b class="text-color-main-light doctor-name">{{doctor.firstName+' '+doctor.lastName}}</b><br>
                                        <span>{{doctor.specialization}}</span><br>
                                    </div>
                                </div>
                                <div class="button d-flex align-self-end p-0 m-0">
                                    <button class="ml-1 btn btn-primary bg-color-main-light profile-button" @click="toProfile(doctor.id)">Perfil</button>
                                </div>
                            </div>
                        </div>
                        <div class="buttons-nav p-3 d-flex flex-column justify-content-center">
                            <img src="/static/img/checkIcon.png" width="50px" height="50px" class="m-1 rounded rounded-circle div-option" @click="accept(doctor.id)">
                            <img src="/static/img/deniedIcon.png" width="50px" height="50px" class="m-1 rounded rounded-circle div-option" @click="decline(doctor.id)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 mt-5 text-center" v-else>
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
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
        let responseObject = {doctors:null, gotData:false}

        const session =getAuthenticationToken();
        
        if (session.authorities[0].authority !== 'PATIENT'){
            this.$router.push( {name: 'home'} );
        }

        const path = '/patient/prof='+session.userId+'/management-requests';
        
        axios.post( this.$store.state.backURL + path)
        .then( response => {
        if( response.status !== 202 ){
            alert( 'Error Realizando la Petición' );
        }else{
            const data = response.data.data;
            responseObject.doctors = data;
            console.log(data);
            this.gotData = true;
        }
        } ).catch( error => {
            this.$store.state.testToken();
            alert( 'Error en la petición' );
            console.log( error );
        } );

        return responseObject
    },
    methods: {
        accept(docId){
            const session =getAuthenticationToken();
            const path = '/patient/acceptRequest';
            
            axios.post( this.$store.state.backURL + path, {doctorId: docId, patientId: session.userId})
            .then( response => {
            if( response.status !== 202 ){
                alert( 'Error Realizando la Petición' );
            }else{
                location.reload();
            }
            } ).catch( error => {
                this.$store.state.testToken();
                alert( 'Error en la petición' );
                console.log( error );
            } );
        },
        decline(docId){
            const session =getAuthenticationToken();
            const path = '/patient/rejectRequest';
            
            axios.post( this.$store.state.backURL + path, {doctorId: docId, patientId: session.userId})
            .then( response => {
            if( response.status !== 202 ){
                alert( 'Error Realizando la Petición' );
            }else{
                location.reload();
            }
            } ).catch( error => {
                this.$store.state.testToken();
                alert( 'Error en la petición' );
                console.log( error );
            } );
        },
        toProfile(id){
            this.$router.push( '/mis-doctores/perfil/'+id );
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
    height: fit-content;
}

.doctor-name{
    font-size: 20px;
}

.doctor-border{
    border: solid 2px #418ef2;
    border-radius: 25px;
}

.div-option:hover{
    box-shadow: 1px 1px rgb(114, 114, 114);
    cursor: pointer;
}

.div-option:active{
    box-shadow: none;
    cursor: pointer;
    resize: 95%;
}

.border-nice{
    border: solid 2px #418ef2;
    border-radius: 25px;
}
</style>