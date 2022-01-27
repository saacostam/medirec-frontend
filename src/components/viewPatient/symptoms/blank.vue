<template>
  <router-view></router-view>
</template>

<script>
import {getAuthenticationToken} from '@/dataStorage';
export default {
    onCreate(){
        const session =getAuthenticationToken();
        
        if (session.authorities[0].authority !== 'DOCTOR'){
            this.$router.push( {name: 'home'} );
        }
    }
}
</script>

<style>

</style>