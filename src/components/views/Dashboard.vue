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
            :questionsAnswered="questionsAnswered"
            :class="{ '-hidden': !isMenuOpen }"></all-answers>
        

        <content-area valign="middle" class="main-wrapper">
            <transition-group name="slider-slide" tag="div" class="container">
                <single-question
                    v-for="(item, index) in questionList"
                    :key="index"
                    :item="item"
                    :questionsAnswered="questionsAnswered"
                    :currentQuestion="currentQuestion">
                </single-question>
            </transition-group> 

            <button 
                class="next-button"
                @click="getRandom"
            >Another</button>

            <button
                ref="submitButton"
                class="submit-button"
                :class="{ '-hidden': isSubmitOpen }"
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
        },
        isMenuOpen () {
            return this.$store.getters.isMenuOpen
        }
    },
    methods: {
        clickHandler (item, value) {
            let id = item.id
            this.generatePercentBar(item)
            switch (value) {
                case 'yes':
                    this.$store.dispatch('voteYes', id)
                    console.log(value)
                    break
                case 'no':
                    this.$store.dispatch('voteNo', id)
                    console.log(value)
                    break
            }
            this.$store.dispatch('answerQuestion', id)
        },
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
        openMenu () {
            this.$store.dispatch('toggleMenu')
            console.log('menu toggle')
        },
        moveAnswer (item) {
            this.questionList.splice(item)
            this.questionsAnswered.push(item)
        }
    },
    watch: {
        isAnswered: function () {
            if (this.questionsAnswered.includes(this.currentQuestion)) {
                console.log(this.questionsAnswered)
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
    overflow: hidden;
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
    background-color: map-get($colors, white);
    padding: 0.5rem 1rem;
    float: right;
    margin-right: 1rem;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}
</style>
