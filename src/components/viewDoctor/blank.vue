<template>
    <router-view></router-view>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
    onCreate(){
        const session = getAuthenticationToken();

        if (session.authorities[0].authority !== 'PATIENT'){
            this.$router.push( {name: 'home'} );
        }
    }
}
</script>

<style scoped>

</style>