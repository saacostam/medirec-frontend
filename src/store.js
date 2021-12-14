import Vue from 'vue'
import Vuex from 'vuex'

import router from './router'

import axios from 'axios';
import {getAuthenticationToken, deleteAuthenticationToken} from '@/dataStorage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //backURL: 'http://localhost:8080'
    backURL: 'https://appmedirec.herokuapp.com',
    medRecord : null,

    testToken: function testToken() {
      const session = getAuthenticationToken( )
      let requestPath;
  
      if (session.authorities){
        if (session.authorities[0].authority==='DOCTOR'){requestPath = '/doctor';}
        else{requestPath = '/patient';}
      }
  
      axios.get( this.backURL + requestPath + '/' + session.userId, { params: { sessionToken: session.token } } )
          .then( response => {return} ).catch( error => {
            if (error.response.status === 400 && error.response.data.message==='Invalid session token'){
              router.push( {name: "login"} );
              deleteAuthenticationToken();
              this.medRecord = null;
            }
          });
    }
  },
  mutations: {

  },
  actions: {

  }
})
