<template>
    <div class="all-answers">
        <close-button @click.native="closeMenu"></close-button>
        <div 
            v-for="(answer, index) in questionsAnswered"
            :key="index">
            <p>{{ answer.question }}</p>
            <p>Yes: {{ answer.yesVotes }} - No: {{ answer.noVotes }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'all-answers',
    components: {
        'close-button': require('@/components/partials/CloseButton').default
    },
    props: ['questionsAnswered'],
    methods: {
        closeMenu () {
            this.$store.dispatch('toggleMenu')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.all-answers {
    padding-top: 5rem;
    text-align: center;
    transition: all .6s ease-in-out;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: map-get($colors, red);
    color: map-get($colors, white);
    z-index: 5;
    transform: translateX(0%);
    // box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

    .close-menu {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

    &.-hidden {
        transform: translateX(-100%);
    }
}

</style>