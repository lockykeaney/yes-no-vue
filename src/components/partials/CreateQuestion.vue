<template>
    <div class="create-question">
        <div @click="closeSubmit">Close</div>
        <!-- <text-input @click="submitQuestion">Submit</text-input> -->
        <form ref="createForm">
            <input type="text" ref="askQuestion" placeholder="What is you question?" />
            <button @click="submitQuestion">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'create-question',
    components: {
        'text-input': require('@/components/partials/TextInput').default
    },
    methods: {
        submitQuestion (e) {
            e.preventDefault()
            let string = this.$refs.askQuestion.value
            console.log(string)
            if (string.charAt(string.length - 1) !== '?') {
                string = string + '?'
            }
            this.$store.dispatch('createQuestion', string)
            this.$refs.askQuestion.placeholder = 'Thanks!'
        },
        closeSubmit () {
            this.$store.dispatch('toggleSubmit')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';
.create-question {
    transition: transform .5s ease-in-out;
    background-color: white;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: plum;

    &.-hidden {
        transform: translateY(100%);
    }
    input {
        height: 2rem;
        width: 90%;
        margin: 0 auto;
        background-color: white;
    }
    button {
        margin: 0 auto;
        background-color: grey;
    }
}

</style>