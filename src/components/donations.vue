<template>
<div class="donations p-4">
    <h3 class="text-center">Donaciones</h3>
    
    <div v-if="!paidFor">
        <div class="alert">
            <h3 class="h5">{{donation.description}}</h3>
        </div>

    </div>
    <div v-else>
        <div class="alert">
            <h3 class="h5">¿Gracias por tu donación?</h3>
        </div>
    </div>

    <div ref="paypal">

    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            loaded: false,
            paidFor: false,

            donation:{
                price:10,
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
                    }
                })
                .render(this.$refs.paypal)
        }
    }
}
</script>

<style scoped>

</style>