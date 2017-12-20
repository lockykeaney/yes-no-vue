<template>
    <div class="single-question" :class="{ '-current': isCurrent }">
        <p class="question"> {{ item.question }} </p>
        <div class="percent-bar" ref="percentBar">
            <div class="yes-bar" :style="{ transform: `scaleX(${yesPercent})`}"></div>
            <div class="no-bar" :style="{ transform: `scaleX(${noPercent})`}"></div>
        </div>
        <div>
            <div class="vote-box">
                <p :class="{ '-active': isAnswered }"> {{ item.yesVotes }} </p>
                <button 
                    class="button"
                    :disabled="isAnswered"
                    :class="{ '-choice': thisAnswer === 'yes' }"
                    @click="clickHandler(item, 'yes')"
                >Yes</button>
            </div>
            <div class="vote-box">
                <p :class="{ '-active': isAnswered }"> {{ item.noVotes }} </p>
                <button 
                    class="button"
                    :disabled="isAnswered"
                    :class="{ '-choice': thisAnswer === 'no' }"
                    @click="clickHandler(item, 'no')"
                >No</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'single-question',
    props: [
        'item',
        'questionsAnswered',
        'currentQuestion'
    ],
    data () {
        return {
            yesPercent: 0,
            noPercent: 0,
            thisAnswer: null
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
            this.thisAnswer = value
            this.$store.dispatch('answerQuestion', item)
        },
        generatePercentBar (item) {
            let total = item.yesVotes + item.noVotes
            this.yesPercent = item.yesVotes / total
            this.noPercent = item.noVotes / total
        },
        resetPercent () {
            if (this.noPercent !== 0 && this.yesPercent !== 0) {
                this.noPercent = 0
                this.yesPercent = 0
            }
        }
    },
    computed: {
        isAnswered () {
            return this.questionsAnswered.includes(this.item)
        },
        isCurrent () {
            if (this.currentQuestion.id === this.item.id) {
                return true
            }
        }
    },
    watch: {
        isAnswered: function () {
            if (this.thisAnswer === 'yes') {
                console.log('add the yes class to button')
            }
            if (this.thisAnswer === 'no') {
                console.log('add the no class to button')
            }
        }
    },
    filters: {
        capitalize (val) {
            return val.charAt(0).toUpperCase() + val.slice(1)
        },
        questionMark (val) {
            if (val.charAt(val.length - 1) !== '?') {
                val = val + '?'
            }
            return val
        }
    },
    mounted () {
        this.resetPercent()
    }
}
</script>

<style lang="scss" scoped>
@mixin bar-settings {
    transition: transform .3s ease-in-out;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
}

* { box-sizing: border-box; }

p {
    margin: 0;
    padding: 0;
}

.single-question {
    color: black;
    height: 100%;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    opacity: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    &.-current {
        opacity: 1;
    }
    
    .question {
        width: 100%;
        height: 4rem;
    }

    .vote-box {
        display: inline-block;
        width: 49%;
        height: auto;

        p {
            transition: opacity .3s ease-in-out;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            opacity: 0;
            &.-active {
                opacity: 1;
            }
        }
        .button {
            &.-choice {
                background-color: red;
            }
        }
    }

    .percent-bar {
        height: 1rem;
        width: 100%;
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
    }
}

.-answered {
    background-color: rgba(0,0,0,0.12);
}
</style>