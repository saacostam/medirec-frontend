<template>
  <div class="h-100 d-flex flex-column">
    <div class="message text-center mt-4 text-color-main-dark">
      <h1>¡Estamos construyendo una mejor aplicación para ti, espéranos!!!</h1>
    </div>
    <div class="img flex-fill d-flex justify-content-center align-items-end m-0 p-0">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.img{
  opacity: 0.9;
}
.img{
  background-image: url("../../../public/static/img/patientDashboard.jpeg");
  background-size: cover;
}

.menu{
  width: 250px;
  background-color: #FB7837;
  padding: 25px;
}

.menu-options{
  margin: 0; padding: 0;
}

.menu-options a, .menu-title{
  color: white;
  font-size: 18px;
  text-decoration: none;
  font-weight: bold;
}

#logout-button{
  background-color: #1F4567;
  color: white;
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

.h-line {
  width: 100%;
  color: #1F4567;
  border: solid 1px #1F4567;
}

.v-line{
  height: 100%;
  color: #1F4567;
  border: solid 1px #1F4567;
  margin-bottom: 0;
}

hr{
  height: 1px;
  border: none;
}
</style>