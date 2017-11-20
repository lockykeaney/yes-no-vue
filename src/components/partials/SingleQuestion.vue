<template>
    <div class="single-question">
        <p class="question"> {{ item.question }} </p>
        <div class="vote-box">
            <p :class="{ '-active': isAnswered }"> {{ item.yesVotes }} </p>
            <button @click="upvoteYes(item.id)">Yes</button>
        </div>
        <div class="vote-box">
            <p :class="{ '-active': isAnswered }"> {{ item.noVotes }} </p>
            <button @click="upvoteNo(item.id)">No</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'single-question',
    props: [ 'item', 'questionsAnswered' ],
    methods: {
        upvoteYes (id) {
            return this.$store.dispatch('voteYes', id) && this.$store.dispatch('answerQuestion', id)
        },
        upvoteNo (id) {
            return this.$store.dispatch('voteNo', id) && this.$store.dispatch('answerQuestion', id)
        }
    },
    computed: {
        isAnswered () {
            return this.questionsAnswered.includes(this.item.id)
        }
    }
}
</script>

<style lang="scss" scoped>
p {
    margin: 0;
    padding: 0;
}

.single-question {
    color: black;
    outline: 1px solid plum;
    height: 5rem;
    text-align: center;
    margin-bottom: 1rem;
    
    .question {
        width: 100%;
        height: 30%;
        opacity: 1;
    }
}

.vote-box {
    width: 50%;
    float: left;
    height: 70%;

    p {
        opacity: 0;
        &.-active {
            opacity: 1;
        }
    }

    button {
        height: 2rem;
        width: 4rem;
        background-color: plum;
    }
}
</style>