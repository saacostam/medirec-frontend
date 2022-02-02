<template>
  <div class="profile container">
    <button class="btn btn-back p-0 m-4" @click="back">
      <img src="/static/svg/arrow-left-circle.svg">
    </button>
    <div class="row">
        <div class="offset-sm-1 col-sm-10 offset-lg-1 col-lg-7">
            <div class="title text-white pl-5 pr-5">Perfil</div>
            <div class="flex-fill media p-0 row d-flex flex-row w-100 mb-3">
                <div class="container">
                <div class="row">
                    <div class="col-12 info">
                    <div class="col-12 profile-picture mt-3 mb-3">
                        <div class="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-md-2 col-md-8 offset-sm-1 col-sm-10">
                        <img src="\static\img\patientIcon.jpg" class="img-fluid rounded-circle abs" v-if="this.authority==='PATIENT'">
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

        <div class="col-lg-4 nav-menu">
            <div class="d-flex flex-column justify-content-end">
                <img src="/static/img/qualifiedIcon.png" alt="" class="mx-auto" width="120px" height="120px" >
                <div class="text-color-purple text-center h5 font-weight-bold pt-3 pl-3 pr-3">Calificación</div>
                <div class="rating mb-4 d-flex flex-row justify-content-center" v-if="$data.scoresAverage !== 'NaN'">
                    <img src="/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=1">
                    <img src="/static/svg/star.svg" alt="" v-else>

                    <img src="/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=2">
                    <img src="/static/svg/star.svg" alt="" v-else>

                    <img src="/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=3">
                    <img src="/static/svg/star.svg" alt="" v-else>

                    <img src="/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=4">
                    <img src="/static/svg/star.svg" alt="" v-else>

                    <img src="/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage==5">
                    <img src="/static/svg/star.svg" alt="" v-else>
                </div>
                <div v-else class="text-center mb-4">
                    No Disponible
                </div>
            </div>
            <div class="d-flex flex-column justify-content-end nav-group" @click="toReviews">
                <img src="/static/img/reviewInDoctorProfileIcon.png" alt="" class="mx-auto" width="120px" height="120px">
                <div class="text-center text-white h5 font-weight-bold nav-option">Reseñas</div>
            </div>
        </div>

      <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <!-- <div class="modal-header m-0 p-0">
                  <h5 class="modal-title text-color-main-dark" id="termModalTitle"></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div> -->
              <div class="modal-body m-0 p-0 bg-color-main-light">
                <button type="button" class="btn btn-back m-1" data-dismiss="modal">
                  <img src="/static/svg/arrow-left-circle white.svg">
                </button>

                <img class="d-block mx-auto m-4" src="/static/img/reviewBanner.png" alt="" width="200px" height="200px" style="border: 2px solid #1F4567; border-radius: 50%">
                <div class="modal-rating mb-4 d-flex flex-row justify-content-center" v-if="$data.scoresAverage !== 'NaN'">
                  <img src="/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=1">
                  <img src="/static/svg/star.svg" alt="" v-else>

                  <img src="/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=2">
                  <img src="/static/svg/star.svg" alt="" v-else>

                  <img src="/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=3">
                  <img src="/static/svg/star.svg" alt="" v-else>

                  <img src="/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=4">
                  <img src="/static/svg/star.svg" alt="" v-else>

                  <img src="/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage==5">
                  <img src="/static/svg/star.svg" alt="" v-else>
                </div>
                <div class="name text-center text-white mb-3" style="font-size: 1.3em; font-weight:">
                  {{this.userFirstName+' '+this.userLastName}}
                </div>
                <hr class="blue-division">

                <div class="reviews">
                  <div class="review bg-white m-3 p-3" v-for="opinion in this.opinions" :key="opinion.scoreId">
                    <div class="rating mx-auto m-0 d-flex flex-row justify-content-center">
                      <img src="/static/svg/star-fill.svg" alt="" v-if="opinion.score>=1">
                      <img src="/static/svg/star.svg" alt="" v-else>

                      <img src="/static/svg/star-fill.svg" alt="" v-if="opinion.score>=2">
                      <img src="/static/svg/star.svg" alt="" v-else>

                      <img src="/static/svg/star-fill.svg" alt="" v-if="opinion.score>=3">
                      <img src="/static/svg/star.svg" alt="" v-else>

                      <img src="/static/svg/star-fill.svg" alt="" v-if="opinion.score>=4">
                      <img src="/static/svg/star.svg" alt="" v-else>

                      <img src="/static/svg/star-fill.svg" alt="" v-if="opinion.score==5">
                      <img src="/static/svg/star.svg" alt="" v-else>
                    </div>
                    <div class="msg mt-2">
                      {{opinion.opinion}}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <!-- <div class="modal-footer m-0">
            </div> -->
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
      opinions: ''
      };
    const session = getAuthenticationToken( )

    let requestPath = '/doctor';

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

            dataObject.scoresAverage = data.scoresAverage;
            dataObject.opinions = data.doctorScores;
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
      this.$router.push( {name: 'navViewDoctor'} );
    },
    toReviews(){
      $('#infoModal').modal('show')
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
</style>
