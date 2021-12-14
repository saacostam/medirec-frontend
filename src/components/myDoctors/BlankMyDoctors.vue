<template>
    <div class="myDoctos">
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
    data(){
        return {}
    },
    beforeCreate(){
        // Access Control for doctor
        const session = getAuthenticationToken();
        if (session.authorities[0].authority === "DOCTOR"){
            this.$router.push( {name: 'home'} );
        }
    }
}
</script>

<style scoped>

</style>