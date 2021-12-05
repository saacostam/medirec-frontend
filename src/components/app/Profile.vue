<template>
  <div class="profile h-100 d-flex flex-column p-0 pt-3">
    <div class="inform d-flex flex-column align-items-center flex-fill ml-5 mr-5">
      <div class="title text-white pl-5 pr-5">Información</div>
      <div class="flex-fill media p-0 row d-flex flex-row w-100 mb-3">
        <div class="container">
          <div class="row">
            <div class="offset-lg-3 col-lg-6 offset-md-2 col-md-8 info">
              <div class="col-12 profile-picture mt-3 mb-3">
                <div class="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-md-2 col-md-8 offset-sm-1 col-sm-10">
                  <img src="..\..\..\public\static\img\patientIcon.jpg" class="img-fluid rounded-circle" v-if="this.authority==='PATIENT'">
                  <img src="..\..\..\public\static\img\doctorProfileIcon.jpg" class="img-fluid rounded-circle" v-else>
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
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
  name: 'Roles',
  data( ){
    let dataObject = {
      authority: '',
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

    let requestPath;

    if (session.authorities){
      if (session.authorities[0].authority==='DOCTOR'){
        requestPath = '/doctor';
      }else{
        requestPath = '/patient';
      }
      dataObject.authority = session.authorities[0].authority;
    }

    axios.get( this.$store.state.backURL + requestPath + '/' + session.userId, { params: { sessionToken: session.token } } )
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
</style>
