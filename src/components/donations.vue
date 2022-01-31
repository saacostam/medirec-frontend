<template>
<div class="donations p-4">
    <button class="btn btn-back p-0 m-2" @click="back" v-if="loaded">
      <img src="../../public/static/svg/arrow-left-circle.svg">
    </button>

    <h3 class="text-center text-color-main-light mt-3" style="font-weight:700">Team MediRec</h3>
    
    <div class="message">
        <p class="m-0">Gracias por usar MediRec, como estudiantes de la Universidad Nacional de Colombia nos alegra ver nuestro proyecto crecer cada día y como este ayuda constantemente a bastantes personas. Esperamos seguir dándole soporte y brindando a todos nuestros usuarios la mejor experiencia al momento de usarla. Si deseas realizar una donación lo podrás realizar aquí abajo, de esta manera nos permitirías que nuestro proyecto siga creciendo y de este modo el alcance de este sea aun mucho mayor. Estaremos totalmente agradecidos con cualquier aporte !!! Gracias totales !!!!!!! </p>
    </div>

    <div class="container">
        <div class="row">
            <div class="offset-lg-1 col-lg-5 d-none d-lg-block">
                <img src="../../public/static/img/donationMessageIcon.png" class="img-fluid">
            </div>
            <div class="col-lg-5">
                <div class="thank text-center" v-if="paidFor">
                    <h3 class="thank-you" style="font-weight: 700">GRACIAS!</h3>
                    <img src="../../public/static/img/comprobado-doctor.png" class="col-4 img-fluid">
                    <div class="confirmation m-3">
                        La donación se realizo <b style="color:#418ef2">satisfactoriamente</b>
                    </div>
                </div>
                <div ref="paypal" class="mt-1 mt-lg-4">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        console.log("Hey")
        return {
            loaded: false,
            paidFor: false,

            donation:{
                price:1,
                description:"Haz una donación"
            }
        }
    },

    mounted(){
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=ASZKLz9Y7xmsK2NP1_I6PwkS7kBvMXCLWa0DnzZRplvz4pSLGm6q_LD5i682F5ZkZcZL2UZ4AYnT62FD";
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
    },

    methods:{
        back(){
            this.$router.push({name:"home"})
        },
        setLoaded(){
            this.loaded = true;
            window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description:this.donation.description,
                                    amount:{
                                        currency_code: "USD",
                                        value: this.donation.price
                                    }
                                }
                            ]
                        });
                    },
                    onApprove: async(data, actions)=>{
                        const order = await actions.order.capture();
                        this.paidFor = true;
                        console.log(order);
                        console.log(this.paidFor)
                        setTimeout(()=>{this.paidFor=false;}, 5000)
                    }
                })
                .render(this.$refs.paypal)

            console.log(this.$refs.paypal)
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

.text-color-main-light{
    color: #418ef2;
}

.message{
    background-color: #418ef2;
    color: white;
    border: solid 1px gray;
    border-radius: 25px;
    font-weight: 600;
    font-size: 1.1em;
    margin: 15px 50px;
    padding: 25px 50px;
    line-height: 20px;
}

h3.thank-you{
    font-size: 2.2em;
    color: #418ef2;
    letter-spacing: 4px;
    margin: 24px auto;
}
</style>