<template>
    <div class="all-answers">

        <div class="open-answers"
            :class="{ '-hidden': isMenuOpen }"
            @click="toggleMenu">
        </div>

        <close-button @click.native="toggleMenu"></close-button>

        <div v-if="questionsAnswered !== 0">
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
        <div v-else>
            <p>You have no answered questions</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'all-answers',
    components: {
        'close-button': require('@/components/partials/CloseButton').default
    },
    computed: {
        questionsAnswered () {
            return this.$store.getters.getQuestionsAnswered
        },
        isMenuOpen () {
            return this.$store.getters.isMenuOpen
        }
    },
    methods: {
        toggleMenu () {
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
    transition: all .4s ease-in-out;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: map-get($colors, red);
    color: map-get($colors, white);
    z-index: 10;
    transform: translateX(0%);
    // box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

    .close-menu {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

    .open-answers {
        position: absolute;
        height: 3rem;
        width: 5rem;
        top: 0;
        right: -3rem;
        z-index: 3;
        background-color: map-get($colors, red);
        color: map-get($colors, white);
        border-bottom-right-radius: 1.5rem;
        display: flex;
        align-content: center;
        justify-content: center;

        &:after {
            content: '';
            height: 20px;
            width: 20px;
            position: absolute;
            top: 30%;
            right: 25%;
            transform: rotate(45deg);
            border-top: 2px solid map-get($colors, white);
            border-right: 2px solid map-get($colors, white);
        }
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
            width: 20vw;
        }
    }
}

</style>