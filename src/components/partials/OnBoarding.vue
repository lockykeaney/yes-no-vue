<template>
    <div class="onboarding" ref="onBoarding">
        <content-area valign="middle">
            <h1 class="_heading-m _text-center main-heading -loading" v-t="'dashboard.title'"></h1>
            <p class="_text-center sub-heading -loading" v-t="'dashboard.subtitle-one'"></p>
            <p class="_text-center sub-heading -loading" v-t="'dashboard.subtitle-two'"></p>
            <button class="button -button-load" @click="updateOnboarding">Continue</button>
        </content-area>
    </div>
</template>

<script>
export default {
    name: 'on-boarding',
    methods: {
        updateOnboarding () {
            this.$store.dispatch('updateOnboarding')
        },
        getHidden () {
            let elems = this.$refs.onBoarding.querySelectorAll('.-loading')
            this.removeHidden(elems)
            setTimeout(() => {
                this.showButton()
            }, 2500)
        },
        removeHidden (elems) {
            elems.forEach(function (val, index) {
                setTimeout(function () {
                    val.classList.remove('-loading')
                }, index * 750)
            })
        },
        showButton () {
            let button = this.$refs.onBoarding.querySelector('.button')
            button.classList.remove('-button-load')
        }
    },
    mounted () {
        this.getHidden()
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';
.onboarding {
    // color: map-get($colors, white);
    height: 100vh;
    width: 100vw;
    position: relative;
    background-color: map-get($colors, yellow);
    z-index: 12;
    .main-heading {
        color: map-get($colors, red);
        font-size: 5rem;
        transition: opacity .5s ease-in-out;
        transform: translateY(-5rem);
        opacity: 1;
        &.-loading {
            opacity: 0;
        }
    }

    .sub-heading {
        transition: all .5s ease-in-out;
        transform: translateY(0px);
        opacity: 1;
        &.-loading {
            opacity: 0;
            transform: translateY(20px);
        }
    }

    .button {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        color: map-get($colors, white);
        background: map-get($colors, red);
        transition: opacity .75s ease-in-out;
        opacity: 1;
        position: absolute;
        top: 85%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        margin: 0 auto;

        &.-button-load {
            opacity: 0;
        }
    }
}
</style>