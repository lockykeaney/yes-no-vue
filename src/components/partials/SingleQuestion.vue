<template>
    <div class="single-question" :class="{ '-answered': isAnswered }">
        <p class="question"> {{ item.question }} </p>
        <div class="percent-bar" ref="percentBar">
            <div class="yes-bar" :style="{ transform: `scaleX(${yesPercent})`}"></div>
            <div class="no-bar" :style="{ transform: `scaleX(${noPercent})`}"></div>
        </div>
        <div class="vote-box">
            <p :class="{ '-active': isAnswered }"> {{ item.yesVotes }} </p>
            <whirl-button 
                class="button"
                :disabled="isAnswered"
                @click.native="clickHandler(item, 'yes')"
                :label="'Yes'"/>
        </div>
        <div class="vote-box">
            <p :class="{ '-active': isAnswered }"> {{ item.noVotes }} </p>
            <whirl-button 
                class="button"
                :disabled="isAnswered"
                @click.native="clickHandler(item, 'no')"
                :label="'No'"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'single-question',
    components: {
        'whirl-button': require('@/components/partials/WhirlButton').default
    },
    props: [
        'item',
        'questionsAnswered',
        'currentQuestion'
    ],
    data () {
        return {
            yesPercent: 0,
            noPercent: 0
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
            return this.questionsAnswered.includes(this.item.id)
        },
        isCurrent () {
            if (this.currentQuestion.id === this.item.id) {
                return this.isCurrentQuestion
            }
        }
    },
    watch: {
        isAnswered: function () {
            console.log(this)
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
        console.log(this.currentQuestion.id)
        console.log(this.item.id)
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
    height: auto;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;

    .-current {
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
            opacity: 0;
            &.-active {
                opacity: 1;
            }
        }

    }

    .percent-bar {
        height: 1rem;
        width: 100%;
        position: relative;

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