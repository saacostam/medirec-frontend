<template>
    <div class="container-fluid">
        <button class="btn btn-back p-0 m-4" @click="back">
            <img src="../../../../public/static/svg/arrow-left-circle.svg">
        </button>

        <div class="row" style="margin-top: 20px;">
            <div class="col-lg-7 d-none d-lg-flex align-items-center justify-content-start pt-1">
                <img src="../../../../public/static/img/consultSyntomsAndMedicineIcon.png" class="mt-4 img-fluid" height="480px" width="600px" style="padding: 50px">
            </div>
            <div class="col-lg-4">
                <div class="nav-div" style="margin-top: 50px;">
                    <div class="nav-option d-flex flex-column" @click="toSymptoms">
                        <img src="../../../../public/static/img/syntomsIcon.png" class="mx-auto" width="120px" height="120px" style="border: solid 2px rgb(86, 81, 226); border-radius:50%;">
                        <div class="bg-color-main-light text-white text-center btn-option h5">
                            Síntomas
                        </div>
                    </div>

                    <div class="nav-option d-flex flex-column" @click="toMeds">
                        <img src="../../../../public/static/img/checkSympBanner.png" class="mx-auto" width="120px" height="120px" style="border: solid 2px rgb(86, 81, 226); border-radius:50%;">
                        <div class="bg-color-main-light text-white text-center btn-option h5">
                            Medicamentos
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        back(){
            this.$router.push( {name: 'navViewPatient'} );
        },
        toSymptoms(){
            this.$router.push( {name: 'viewSymptomsPatient'} );
        },
        toMeds(){
            this.$router.push( {name: 'viewMedsPatient'} );
        }
    }
}
</script>

<style scoped>
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

.title{
    width: fit-content;
    margin: 70px auto 0 auto;
    padding: 4px 32px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.nav-div{
    border: solid 3px rgb(86, 81, 226);
    width: fit-content;
    margin: 0 auto;
    border-radius: 20px;
    padding: 24px 64px 8px 64px;
}

.btn-option{
    width: fit-content;
    margin: 16px auto;
    padding: 4px 16px;
    border: solid 1px gray;
    border-radius: 15px;
}

.nav-option{
    cursor: pointer;
}
</style>