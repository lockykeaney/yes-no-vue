<template>
    <div class="all-answers">
        <close-button @click.native="closeMenu"></close-button>
        <div 
            v-for="(answer, index) in questionsAnswered"
            :key="index">
            <p>{{ answer.question }}</p>
            <div class="percent-bar" ref="percentBar">
                <div class="yes-bar" :style="{ transform: `scaleX(${answer.yesVotes /(answer.yesVotes + answer.noVotes)})`}">
                    <p class="percent-votes">Yes: {{ answer.yesVotes }}</p>
                </div>
                <div class="no-bar" :style="{ transform: `scaleX(${answer.noVotes /(answer.yesVotes + answer.noVotes)})`}">
                    <p class="percent-votes">No: {{ answer.noVotes }}</p>
                </div>
            </div>
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

@mixin bar-settings {
    transition: transform .3s ease-in-out;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
}

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

    .percent-bar {
        height: 2rem;
        width: 90%;
        margin: 0 auto;
        position: relative;
        margin-bottom: 2rem;
        
        .yes-bar {
            @include bar-settings();
            background-color: plum;
            left: 0;
            transform-origin: left;
        }
        .no-bar {
            @include bar-settings();
            background-color: tomato;
            right: 0;
            transform-origin: right;
        }

        .percent-votes {
            @include abso-cent;
            width: 100%;
            transform: translate(-50%, -50%) scaleX(1);
        }
    }
}

</style>