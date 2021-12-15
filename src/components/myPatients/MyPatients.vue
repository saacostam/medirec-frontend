<template>
    <div class="my-doctors container-fluid h-100">
        <div class="row h-100">
            <div class="col-lg-5 nav h-100">
                <div class="h-100 w-100 d-flex flex-column align-items-center justify-content-center">
                    <img src="../../../public/static/img/searchPatientIcon.png" width="200px" height="200px" class="mb-5">
                    <button class="btn btn-primary bg-color-main-light btn-search" @click="toSearch">Busqueda<br>Pacientes</button>
                </div>
            </div>
            <div class="col-lg-7 img mt-5">
                <img src="../../../public/static/img/searchPatientViewIcon.jpg" alt="" class="img-fluid mt-5">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        toSearch(){
            this.$router.push( {name:'searchPatients'} );
        }
    }
}
</script>

<style scoped> 
.bg-color-main-light{
    background-color: #418ef2;
}

.btn-search{
    padding: 10px 70px;
    font-weight: 600;
    font-size: 18px;
    border-radius: 25px;
}
</style>