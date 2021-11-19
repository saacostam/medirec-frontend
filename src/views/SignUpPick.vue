<template>
  <div class="singup-pick h-100">
    <div class="container-fluid h-100 text-center">
      <h1>Registro</h1>
      <p>Escoje el tipo de perfil a registrar.</p>
      <div class="row h-75">
        <div class="col-sm-6 d-flex align-items-center justify-content-center bg-warning">
          <router-link to="registro/paciente">
            <img src="../../public/static/svg/person-circle.svg" width="256" height="256" viewBox="0 0 256 256">
          </router-link>
        </div>
        <div class="col-sm-6 d-flex align-items-center justify-content-center bg-success">
          <router-link to="registro/doctor">
            <img src="../../public/static/svg/envelope.svg" width="256" height="256" viewBox="0 0 256 256">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singUpPick",
  data(){
    return {
    }
  },
  beforeCreate(){

  }
}
</script>

<style scoped>

</style>