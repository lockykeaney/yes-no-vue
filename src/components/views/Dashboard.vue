<template>
    <div :class="this.$options.name">

        <!-- <transition name="slider-slide-out">
            <on-boarding v-if="!isOnboardingComplete"></on-boarding>
        </transition> -->

        <div class="open-answers"
            :class="{ '-hidden': isMenuOpen }"
            @click="openMenu">
        </div>

        <all-answers
            :class="{ '-hidden': !isMenuOpen }">
        </all-answers>

        <content-area valign="middle" class="main-wrapper">

            <div class="container" ref="containerOuter">
                <div v-if="finalList.length !== 0" class="-inner" ref="containerInner">
                    <single-question
                        v-for="(item, index) in finalList"
                        :key="index"
                        :item="item"
                        :containerWidth="containerWidth"
                        :questionsAnswered="questionsAnswered">
                    </single-question>
                </div>
                <div class="no-questions" v-else>
                    <p>No more questions</p>
                    <p>Why not submit on below?</p>
                </div>
            </div>

            <button 
                class="next-button"
                :class="{'-hide': !isNextButtonVisible}"
                ref="showNextQuestion"
                @click="showNextQuestion">
                Another
            </button>

            <button
                ref="submitButton"
                class="submit-button"
                :class="{ '-hidden': isSubmitOpen }"
                @click="openSubmit">
                Submit a Question
            </button>

        </content-area>
        
        <create-question 
            :class="{ '-hidden': !isSubmitOpen }">
        </create-question>

    </div>
</template>

<script>

export default {
    name: 'dashboard',
    components: {
        'single-question': require('@/components/partials/SingleQuestion').default,
        'create-question': require('@/components/partials/CreateQuestion').default,
        'on-boarding': require('@/components/partials/OnBoarding').default,
        'all-answers': require('@/components/partials/AllAnswers').default
    },
    data () {
        return {
            questionNumber: 1,
            containerWidth: null,
            finalList: []
        }
    },
    computed: {
        questionList () {
            return this.$store.getters.getQuestions
        },
        questionsAnswered () {
            return this.$store.getters.getQuestionsAnswered
        },
        isOnboardingComplete () {
            return this.$store.getters.isOnboardingComplete
        },
        isSubmitOpen () {
            return this.$store.getters.isSubmitOpen
        },
        isMenuOpen () {
            return this.$store.getters.isMenuOpen
        },
        isNextButtonVisible () {
            return this.$store.getters.isNextButtonVisible
        }
    },
    methods: {
        openSubmit () {
            this.$store.dispatch('toggleSubmit')
        },
        openMenu () {
            this.$store.dispatch('toggleMenu')
        },
        showNextQuestion () {
            let num = parseInt(this.containerWidth.slice(0, -2))
            let translateVal = num * this.questionNumber
            this.$refs.containerInner.style.transform = `translateX(-${translateVal}px)`
            this.questionNumber++
            this.$store.dispatch('hideNextButton')
        },
        getContainerWidth () {
            this.containerWidth = `${window.getComputedStyle(this.$refs.containerOuter, null).width}`
        },
        getFinalList () {
            let list = this._.differenceBy(this.questionList, this.questionsAnswered, '_id')
            this.finalList = this._.shuffle(list)
        }
    },
    activated () {
        this.getContainerWidth()
    },
    mounted () {
        this.getFinalList()
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.dashboard {
    background: map-get($colors, green);
    overflow-y: scroll;
    position: relative;
    &-header {
        margin-top: 10vh;
    }
}

.main-wrapper {
    position: absolute;
    top: 0;
    left: 0;
}

.container {
    transition: all .6s ease-in;
    background: map-get($colors, white);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    position: relative;
    border-radius: 5px;
    height: 50vh;
    width: 85vw;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    z-index: 5;

    .-inner {
        transition: transform .5s ease-in-out;
        width: auto;
        display: flex;
    }
}

.open-answers {
    transition: all .6s ease-in-out;
    position: absolute;
    height: 3rem;
    width: 5rem;
    top: 0;
    left: -2rem;
    z-index: 3;
    background-color: map-get($colors, red);
    color: map-get($colors, white);
    border-bottom-right-radius: 1.5rem;
    display: flex;
    align-content: center;
    justify-content: center;
    // box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    &.-hidden {
        transform: translateX(100vw);
    }
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

.submit-button {
    border: 0;
    outline: 0;
    height:6vh;
    width: 60%;
    font-size: 1.2rem;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: map-get($colors, purple);
    color: map-get($colors, pink);
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
    bottom: 0;
    transition: transform .6s ease-in-out;
    &.-hidden {
        transform: translate(-50%, -100vh);
    }
}

.next-button {
    transition: all .3s ease-in-out;
    background-color: map-get($colors, white);
    padding: 0.5rem 1rem;
    float: right;
    margin-right: 1rem;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    
    &.-hide {
        transform: translateY(-50px);
    }
}

.no-questions {
    height: auto;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
