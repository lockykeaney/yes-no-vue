<template>
    <div :class="this.$options.name">

        <!-- <transition name="slider-slide-out">
            <on-boarding v-if="!isOnboardingComplete"></on-boarding>
        </transition> -->

        <all-answers
            :class="{ '-hidden': !isMenuOpen }">
        </all-answers>

        <content-area valign="middle" class="main-wrapper">

            <!-- <div class="container" v-if="!fetchSuccess">
                <p>Connection error</p>
            </div> -->

            <div class="container" ref="containerOuter">
                

                <div class="no-questions" v-if="!fetchSuccess">
                    <p>Connection Error</p>
                    <button
                        @click="refreshConnection">
                        Refresh
                    </button>
                </div>
                <div class="no-questions" v-else-if="finalList.length === 0">
                    <p>No more questions</p>
                    <p>Why not submit one below?</p>
                </div>
                <div v-else class="-inner" ref="containerInner">
                    <single-question
                        v-for="(item, index) in finalList"
                        :key="index"
                        :item="item"
                        :containerWidth="containerWidth"
                        :questionsAnswered="questionsAnswered">
                    </single-question>
                </div>
            </div>

            <button 
                class="next-button"
                :class="{'-hide': !isNextButtonVisible}"
                ref="showNextQuestion"
                @click="showNextQuestion">
                Another
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
            finalList: [],
            answeredAll: false
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
        isMenuOpen () {
            return this.$store.getters.isMenuOpen
        },
        isSubmitOpen () {
            return this.$store.getters.isSubmitOpen
        },
        isNextButtonVisible () {
            return this.$store.getters.isNextButtonVisible
        },
        fetchSuccess () {
            return this.$store.getters.getFetchSuccess
        }
    },
    methods: {
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
            const differenceWith = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a, b)) === -1)
            const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)
            let list = differenceWith(this.questionList, this.questionsAnswered, (a, b) => a._id === b._id)
            this.finalList = shuffleArray(list)
        },
        refreshConnection () {
            this.$store.dispatch('fetchQuestionData')
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
    z-index: 1;

    .-inner {
        transition: transform .5s ease-in-out;
        width: auto;
        display: flex;
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
