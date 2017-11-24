<template>
    <div class="single-question">
        <p class="question"> {{ item.question }} </p>
        <div class="percent-bar" ref="percentBar">
            <div class="yes-bar" :style="{ transform: `scaleX(${yesPercent})`}"></div>
            <div class="no-bar" :style="{ transform: `scaleX(${noPercent})`}"></div>
        </div>
        <div class="vote-box">
            <p :class="{ '-active': isAnswered }"> {{ item.yesVotes }} </p>
            <whirl-button @click.native="yesHandler(item)"
                :label="'Yes'"/>
        </div>
        <div class="vote-box">
            <p :class="{ '-active': isAnswered }"> {{ item.noVotes }} </p>
            <whirl-button @click.native="noHandler(item)"
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
        'questionsAnswered'
    ],
    data () {
        return {
            yesPercent: 0,
            noPercent: 0
        }
    },
    methods: {
        yesHandler (item) {
            this.generatePercentBar(item)
            this.upvoteYes(item.id)
        },
        noHandler (item) {
            this.generatePercentBar(item)
            this.upvoteNo(item.id)
        },
        upvoteYes (id) {
            return this.$store.dispatch('voteYes', id) && this.$store.dispatch('answerQuestion', id)
        },
        upvoteNo (id) {
            return this.$store.dispatch('voteNo', id) && this.$store.dispatch('answerQuestion', id)
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
    // outline: 1px solid black;
    height: auto;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    
    .question {
        width: 100%; 
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

        // button {
        //     height: auto;
        //     width: 100%;
        //     background-color: plum;
        // }
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



</style>