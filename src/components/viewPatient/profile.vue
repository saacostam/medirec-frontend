<template>
  <div class="patient-profile">
    <div class="d-block title-doc text-white text-center w-100">{{this.name}}</div>
    <div class="container">
      <button class="btn btn-back p-0 m-4" @click="back">
        <img src="/static/svg/arrow-left-circle.svg">
      </button>
      <div class="row">
          <div class="col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6">
              <div class="title text-white pl-5 pr-5">Perfil</div>
              <div class="flex-fill media p-0 row d-flex flex-row w-100 mb-3">
                  <div class="container">
                  <div class="row">
                      <div class="col-12 info">
                      <div class="col-12 profile-picture mt-3 mb-3">
                          <div class="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-md-2 col-md-8 offset-sm-1 col-sm-10">
                          <img src="\static\img\userChatIcon.png" class="img-fluid rounded-circle abs" v-if="this.authority==='PATIENT'" style="background-color: white;">
                          <img src="\static\img\profileDoctorIcon.png" class="img-fluid rounded-circle abs" v-else>
                          </div>
                      </div>
                      <div class="col-lg-12">
                          <table class="table table-sm text-white p-3">
                          <tbody>
                              <tr>
                                <th scope="row">Nombres</th>
                                <td>{{capitalize(this.userFirstName)}}</td>
                              </tr>
                              <tr>
                                <th scope="row">Apellidos</th>
                                <td>{{capitalize(this.userLastName)}}</td>
                              </tr>
                              <tr>
                                <th scope="row">Documento</th>
                                <td>{{this.userDocType}} {{this.userDoc}}</td>
                              </tr>
                              <tr>
                                <th scope="row">Email</th>
                                <td>{{this.userEmail}}</td>
                              </tr>
                              <!---->
                              <tr v-if="this.authority==='DOCTOR'">
                                <th scope="row">Tarjeta Profesional</th>
                                <td>{{this.doctorProfessionalCard}}</td>
                              </tr>
                              <tr v-if="this.authority==='DOCTOR'">
                                <th scope="row">Especialidad</th>
                                <td>{{this.doctorSpecialization}}</td>
                              </tr>

                              <tr v-if="this.authority==='PATIENT'">
                                <th scope="row">EPS</th>
                                <td>{{capitalize(this.patientEps)}}</td>
                              </tr>
                              <!---->
                              <tr v-if="this.userBirthDay!==null">
                                <th scope="row">Fecha de Nacimiento</th>
                                <td>{{this.userBirthDay.split('T')[0]}}</td>
                              </tr>
                              <tr v-if="this.userGender!==null">
                                <th scope="row">Genero</th>
                                <td>{{this.userGender}}</td>
                              </tr>
                              <tr v-if="this.userAddress!==null">
                                <th scope="row">Dirección</th>
                                <td>{{this.userAddress}}</td>
                              </tr>
                              <!---->
                              <tr v-if="this.authority==='DOCTOR' && this.doctorConsultory!==null">
                                <th scope="row">Consultorio</th>
                                <td>{{this.doctorConsultory}}</td>
                              </tr>
                              <tr v-if="this.authority==='DOCTOR' && this.doctorUniversity!==null">
                                <th scope="row">Universidad</th>
                                <td>{{capitalize(this.doctorUniversity)}}</td>
                              </tr>
                              <tr v-if="this.authority==='DOCTOR' && this.doctorUniversity!==null">
                                <th scope="row">Experiencia Laboral</th>
                                <td>{{this.doctorExperience}} años</td>
                              </tr>

                              <tr v-if="this.authority==='PATIENT' && this.patientMaritalStatus!==null">
                                <th scope="row">Estado Civil</th>
                                <td>{{this.patientMaritalStatus}}</td>
                              </tr>
                          </tbody>
                          </table>
                      </div>
                      </div>
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

export default {
  name: 'Roles',
  data( ){
    let dataObject = {
      authority: 'PATIENT',
      userFirstName:'',
      userLastName:'',
      userDocType:'',
      userDoc: '',
      userEmail: '',
      userBirthDay: '', 
      userGender: '', 
      userAddress:'', 
      patientEps: '',
      patientMaritalStatus: '',
      doctorConsultory: '',
      doctorExperience: '',
      doctorProfessionalCard:'',
      doctorSpecialization:'',
      doctorUniversity: '',
      name: 'Paciente'
      };
    const session = getAuthenticationToken( )

    let requestPath = '/patient';

    axios.get( this.$store.state.backURL + requestPath + '/' + this.$route.params.id, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los datos de perfil' );
          }else{
            const data = response.data.data;
            console.log("Full Message", data)
            dataObject.userFirstName = data.userFirstName;
            dataObject.userLastName = data.userLastName;
            dataObject.userDocType = data.userDocType;
            dataObject.userDoc = data.userDoc;
            dataObject.userEmail = data.userEmail;
            dataObject.userBirthDay = data.userBirthDay;
            dataObject.userGender = data.userGender;
            dataObject.userAddress = data.userAddress;
            dataObject.patientEps = data.patientEps;
            dataObject.patientMaritalStatus = data.patientMaritalStatus;
            dataObject.doctorConsultory = data.doctorConsultory;
            dataObject.doctorExperience = data.doctorExperience;
            dataObject.doctorProfessionalCard = data.doctorProfessionalCard;
            dataObject.doctorSpecialization = data.doctorSpecialization;
            dataObject.doctorUniversity = data.doctorUniversity;

            dataObject.name = `${data.userFirstName} ${data.userLastName}`
          }

          console.log(dataObject)
        } ).catch( error => {
          this.$store.state.testToken();
          alert( 'Error en la petición' );
        } );
    return dataObject
  },
  methods:{
    capitalize(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
      return splitStr.join(' '); 
    },
    back(){
      this.$router.push( {name: 'navViewPatient'} );
    }
  }
}
</script>

<style scoped>
.bg-color-main-dark{
  background-color: #1F4567;
}

.bg-color-main-light{
  background-color: #418ef2;
}

.title{
  background-color:#1F4567;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: fit-content;
  margin: 70px auto 0px;
}

.nav-menu{
    margin: 110px auto 0px;
}

.info{
  background-color:#418ef2;
  border-radius: 10px;
}

img.profile{
  width: 100%;
  height: auto;
}

table, th, td {
  border-collapse: collapse;
  font-size: 14px;
}

th, td{
    border-top: none;
    border-bottom: none;
}

.profile-picture img{
  width: 100%;
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

.nav-option{
    margin: 25px auto 10px;
    padding: 4px 42px;
     border: solid 1px gray;
    border-radius: 10px;
    background: #418ef2;
}

    .nav-group:hover{
        cursor: pointer;
    }

.text-color-main-dark{
    color: #1F4567;
}

.text-color-purple{
    color: rgb(86, 81, 226)
}

.rating img{
    margin: 2px;
}

.modal-rating img{
  margin: 2px;
  width: 25x;
  height: 25px;
}

.blue-division{
  background-color: #1F4567;
  height: 1px;
}

.review{
  border-radius: 25px;
}

.title-doc{
        background-color:rgb(86, 81, 226);
        padding: 10px;
        font-weight: 700;
        margin: 0 auto;
        font-size: 1.2em;
    }
</style>
