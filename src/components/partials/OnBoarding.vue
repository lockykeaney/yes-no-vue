<template>
    <div class="onboarding">
        <content-area valign="middle">
            <h1 class="_heading-m _text-center" v-t="'dashboard.title'"></h1>
            <p class="_text-center" v-t="'dashboard.subtitle'"></p>
            <button @click="updateOnboarding">Continue</button>
        </content-area>
    </div>
</template>

<script>
export default {
    name: 'on-boarding',
    methods: {
        updateOnboarding () {
            console.log('update onboarding')
            this.$store.dispatch('updateOnboarding')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';
.onboarding {
    height: 100vh;
    width: 100vw;
    position: relative;
    
    button {
        position: absolute;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        margin: 0 auto;
    }
}
</style>