<template>
  <div class="tutorial">
    <button class="btn btn-back p-0 m-4" @click="back">
      <img src="/static/svg/arrow-left-circle.svg">
    </button>

    <div class="container">
        <div class="row  p-2">
            <div class="col-lg-5 p-5">
                <img src="/static/img/tutorialIconBig.png" class="mt-3 img-fluid img-button" :style="[authority==='DOCTOR' ? {'border-color': '#5651e2'} : {'border-color': '#FB7837'}]">
                <div>
                    <h4 class="mt-4 name bg-color-main-light text-white" :style="[authority==='DOCTOR' ? {'background-color': '#5651e2'} : {'background-color': '#FB7837'}]">Tutorial</h4>
                </div>
            </div>
            <div class="col-lg-7 p-5">
                <div class="mt-5 p-2"></div>
                <div class="mt-5 d-block title text-white text-center"></div>
                <div class="files">
                    <div>
                        <div class="file d-flex flex-row border">
                            <div class="name flex-fill d-flex align-items-center p-2">
                                <span v-if="authority==='DOCTOR'">Medirec - Tutorial Doctor</span>
                                <span v-else>Medirec - Tutorial Paciente</span>
                            </div>
                            <div class="download p-2" @click="downloadPDF">
                                <img src="/static/img/descargarIcon.png" width="30px" height="30px">
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
import {getAuthenticationToken, deleteAuthenticationToken} from '@/dataStorage'
export default {
    data(){
        const session = getAuthenticationToken();
        return {
            authority: session.authorities[0].authority
        }
    },
    methods:{
        back(){
            this.$router.push({name:'home'})
        },
        downloadPDF(){
            const session = getAuthenticationToken();
            let linkSource;
            if (session.authorities[0].authority === 'DOCTOR'){
                linkSource = `/pdf/ManualDoctor.pdf`;
            }else{
                linkSource =  `/pdf/ManualPaciente.pdf`
            }

            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;

            if (session.authorities[0].authority === 'DOCTOR'){
                downloadLink.setAttribute('download', 'ManualDoctor.pdf');
            }else{
                downloadLink.setAttribute('download', 'ManualPaciente.pdf');
            }

            downloadLink.click();
            downloadLink.remove();
        }
    }
}
</script>

<style scoped>
.name{
    width: fit-content;
    margin: 5px auto;
    padding: 5px 20px;
    border-radius: 20px;
}

.title{
    background-color:#1F4567;
    padding: 10px;
    font-weight: 700;
    margin: 0 auto;
    height: 54px;
}

.bg-color-purple{
    background-color: rgb(86, 81, 226);
}

.border-color-purple{
    border: solid 3px;
    border-color: rgb(86, 81, 226);
    border-radius: 20px;
}

.img-button{
    border-radius: 50%;
    border: solid 3px #418ef2;
}

.bg-color-main-lighter{
    background-color: rgb(218, 225, 230);
}

.bg-color-main-light{
    background-color: #418ef2;
}

.text-color-main-dark{
    color: #1F4567;
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

.bg-color-main-lighter{
    background-color: rgb(218, 225, 230);
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

.download{
    border-left: 1px solid #dee2e6;
}

.download:hover{
    cursor: pointer;
}

.download:active{
    box-shadow:1px 1px 1px rgb(36, 36, 36);
}
</style>