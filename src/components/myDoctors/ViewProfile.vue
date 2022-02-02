<template>
  <div class="profile h-100 d-flex flex-column p-0 pt-3">
    <button class="btn btn-back p-0 m-4" @click="back">
      <img src="/static/svg/arrow-left-circle.svg">
    </button>
    <div class="inform d-flex flex-column align-items-center flex-fill ml-5 mr-5">
      <div class="title text-white pl-5 pr-5">Perfil</div>
      <div class="flex-fill media p-0 row d-flex flex-row w-100 mb-3">
        <div class="container">
          <div class="row">
            <div class="offset-lg-3 col-lg-6 offset-md-2 col-md-8 info">
              <div class="col-12 profile-picture mt-3 mb-3">
                <div class="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-md-2 col-md-8 offset-sm-1 col-sm-10">
                  <img src="\static\img\patientIcon.jpg" class="img-fluid rounded-circle" v-if="this.authority==='PATIENT'">
                  <img src="\static\img\profileDoctorIcon.png" class="img-fluid rounded-circle" v-else>
                </div>
              </div>
              <div class="col-12">
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
                      <th scope="row">Email</th>
                      <td>{{this.userEmail}}</td>
                    </tr>
                    <!---->
                    <tr v-if="this.authority==='DOCTOR'">
                      <th scope="row">Especialidad</th>
                      <td>{{this.doctorSpecialization}}</td>
                    </tr>
                    <!---->
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
                  </tbody>
                </table>
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
      authority: 'DOCTOR',
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
      };
    const session = getAuthenticationToken( )

    let requestPath = '/doctor';

    axios.get( this.$store.state.backURL + requestPath + '/' + this.$route.params.id, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los datos de perfil' );
          }else{
            const data = response.data.data;
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
          }
        } ).catch( error => {
          this.$store.state.testToken();
          alert( 'Error en la petición' );
        } );
    return dataObject
  },
  beforeCreate(){
    
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
      this.$router.push( {name: 'searchDoctors'} );
    }
  }
}
</script>

<style scoped>
.title{
  background-color:#1F4567;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
</style>
