<template>
    <div :class="this.$options.name">

        <on-boarding v-if="!isOnboardingComplete"></on-boarding>
        
        <content-area valign="middle">
            <!-- <div class="container">
                <div class="-inner" v-for="(item, index) in questionList"
                    :key="index">
                    <single-question
                        :item="item"
                        :questionsAnswered="questionsAnswered">
                    </single-question>
                </div>
            </div> -->
            <single-question 
                :item="currentQuestion"
                :questionsAnswered="questionsAnswered">
            </single-question>
            <button @click="getRandom">Another</button>

        <button
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
        'on-boarding': require('@/components/partials/OnBoarding').default
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
    &-header {
        margin-top: 10vh;
    }
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
