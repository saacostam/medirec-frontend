<template>
    <div class="my-symptoms">
        <div class="container-fluid img mb-2 d-flex">
            <img class="img-fluid mx-auto" src="../../../public/static/img/symp-banner.png" alt="" width="1200px" heigth="250px">
        </div>
        <button class="btn btn-back p-0 m-4" @click="back">
            <img src="../../../public/static/svg/arrow-left-circle.svg">
        </button>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                    <div class="row" style="padding-top: 80px">
                        <div class="col-md-6" @click="toCreate">
                            <div class="w-100 d-flex justify-content-center">
                                <img src="../../../public/static/img/reportSymp.png" class="mx-auto img-opt" width="128px" height="128px">
                            </div>
                            <div class="nav-opt">
                                Reportar<br>Síntomas y<br>Medicamentos
                            </div>
                        </div>
                        <div class="col-md-6" @click="toView">
                            <div class="w-100 d-flex justify-content-center">
                                <img src="../../../public/static/img/checkSymp.png" class="mx-auto img-opt" width="128px" height="128px">
                            </div>
                            <div class="nav-opt">
                                Consultar<br>Síntomas y<br>Medicamentos
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        back(){
            this.$router.push( {name: 'home'} );
        },
        toCreate(){
            this.$router.push( {name: 'addSymptoms'} );
        },
        toView(){
            this.$router.push( {name: 'navViewSymptoms'} );
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

.nav-opt{
    border: solid 1px #1F4567;
    background: #418ef2;
    color: white;
    border-radius: 15px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    width: 200px;
    margin: 20px auto;
    user-select: none;
    padding: 10px;
    line-height: 22px;
}

.nav-opt:hover{
    cursor: pointer;
}

.nav-opt:active{
    border: solid 1px transparent;
}

.img-opt{
    cursor: pointer;
}
</style>