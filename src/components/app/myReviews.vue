<template>
    <div class="myReviews">
        <div class="container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-10 col-sm-12 col-12 offset-lg-0 offset-md-1 offset-0 p-4">
                        <div class="reviews">
                            <div class="doc-name">{{`Doctor/a: ${this.name}`}}</div>
                            <div class="for-reviews">
                                <div class="review m-4 p-3" v-for="review in this.opinions" :key="review.scoreId">
                                    <div class="rating mb-2 d-flex flex-row justify-content-center">
                                        <img src="../../../public/static/svg/star-fill.svg" alt="" v-if="review.score>=1">
                                        <img src="../../../public/static/svg/star.svg" alt="" v-else>

                                        <img src="../../../public/static/svg/star-fill.svg" alt="" v-if="review.score>=2">
                                        <img src="../../../public/static/svg/star.svg" alt="" v-else>

                                        <img src="../../../public/static/svg/star-fill.svg" alt="" v-if="review.score>=3">
                                        <img src="../../../public/static/svg/star.svg" alt="" v-else>

                                        <img src="../../../public/static/svg/star-fill.svg" alt="" v-if="review.score>=4">
                                        <img src="../../../public/static/svg/star.svg" alt="" v-else>

                                        <img src="../../../public/static/svg/star-fill.svg" alt="" v-if="review.score==5">
                                        <img src="../../../public/static/svg/star.svg" alt="" v-else>
                                    </div>
                                    <div class="message">
                                        {{review.opinion}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 d-none d-lg-block mt-4">
                        <div class="rating-avarage mb-4 d-flex flex-row justify-content-center" v-if="$data.scoresAverage !== 'NaN'">
                            <img src="../../../public/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=1">
                            <img src="../../../public/static/svg/star.svg" alt="" v-else>

                            <img src="../../../public/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=2">
                            <img src="../../../public/static/svg/star.svg" alt="" v-else>

                            <img src="../../../public/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=3">
                            <img src="../../../public/static/svg/star.svg" alt="" v-else>

                            <img src="../../../public/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage>=4">
                            <img src="../../../public/static/svg/star.svg" alt="" v-else>

                            <img src="../../../public/static/svg/star-fill.svg" alt="" v-if="$data.scoresAverage==5">
                            <img src="../../../public/static/svg/star.svg" alt="" v-else>
                        </div>
                        <div v-else class="text-center mb-4" style="font-size: 1.3em; color:#1F4567; margin-top:15px; font-weight:600;">
                            Puntuación no Disponible
                        </div>
                        <img src="../../../public/static/img/myReviewsIcon2.png" alt="" class="d-block mx-auto">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getAuthenticationToken} from '@/dataStorage';
import axios from 'axios';

export default {
  name: 'Roles',
  data( ){
    let dataObject = {
      authority: 'DOCTOR',
      scoresAverage:NaN,
      opinions: [],
      name:""
    };

    const session = getAuthenticationToken( )
    let requestPath = '/doctor';

    axios.get( this.$store.state.backURL + requestPath + '/' + session.userId, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los datos de perfil' );
          }else{
            const data = response.data.data;
            console.log("Full Message", data)

            dataObject.name = data.userFirstName+' '+data.userLastName;
            dataObject.scoresAverage = data.scoresAverage;
            dataObject.opinions = data.doctorScores;
          }

          console.log(dataObject)
        } ).catch( error => {
          this.$store.state.testToken();
          alert( 'Error en la petición' );
        } );
    return dataObject
  }
}
</script>

<style scoped>
.reviews{
    border: solid 2px rgb(86, 81, 226);
    border-radius: 15px;
    border-start-start-radius: 30px;
    border-start-end-radius: 30px;
    height: 500px;

    overflow-y:scroll;
}

/*Width*/
.reviews::-webkit-scrollbar {
  width: 0px;
}
/* Track */
.reviews::-webkit-scrollbar-track {
  background: transparent;
}
/* Handle */
.reviews::-webkit-scrollbar-thumb {
  background: #1f4567a1;
  border-radius: 3px;
}
/* Handle on hover */
.reviews::-webkit-scrollbar-thumb:hover {
  background: #1F4567;
}

.doc-name{
    background-color: rgb(86, 81, 226);
    text-align: center;
    font-size: 1.5em;
    font-weight: 600;
    color: white;
    padding: 8px;
    border-radius: 30px;
}

.review{
    border: 2px solid #418ef2;
    border-radius: 15px;
}

.rating img{
    margin: 1px;
}

.rating-avarage img{
    width: 50px;
    height: 50px;
    margin: 5px;
}
</style>