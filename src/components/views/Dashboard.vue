<template>
    <div :class="this.$options.name">

        <!-- <on-boarding v-if="!isOnboardingComplete"></on-boarding> -->
        <all-answers :questionsAnswered="questionsAnswered"></all-answers>

        <content-area valign="middle">

            <div class="container">

                <single-question class="-inner" 
                    v-for="(item, index) in questionList"
                    :key="index"
                    :item="item"
                    :questionsAnswered="questionsAnswered"
                    :currentQuestion="currentQuestion">
                </single-question>

            </div>

            <button @click="getRandom">Another</button>

            <button
                ref="submitButton"
                class="submit-button"
                @click="openSubmit">
                Submit a Question
            </button>

        </content-area>

        <create-question :class="{ '-hidden': !isSubmitOpen }"></create-question>
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
            currentQuestion: false
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
        }
    },
    methods: {
        getRandom () {
            this.currentQuestion = false
            let value = this.questionList[Math.floor(Math.random() * this.questionList.length)]
            if (!this.questionsAnswered.includes(value.id)) {
                this.currentQuestion = value
            }
        },
        openSubmit () {
            this.$store.dispatch('toggleSubmit')
        },
        moveAnswer (item) {
            this.questionList.splice(item)
            this.questionsAnswered.push(item)
        }
    },
    watch: {
        isAnswered: function () {
            if (this.questionsAnswered.includes(this.currentQuestion.id)) {
                console.log('and yes')
            }
        }
    },
    activated () {
        this.getRandom()
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.dashboard {
    background: transparent;
    overflow-y: scroll;
    &-header {
        margin-top: 10vh;
    }
}

.container {
    position: relative;
    outline: 1px solid black;
    height: 50vh;
    overflow: hidden;
}

.submit-button {
    border: 0;
    outline: 0;
    height: 5vh;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
}
</style>
