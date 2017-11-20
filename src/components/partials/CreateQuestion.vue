<template>
    <div class="text-input">
        <input type="text" placeholder="Ask a Question" ref="askQuestion" />
        <button @click="submitQuestion">Submit</button>
    </div>
</template>

<script>
export default {
    name: 'create-question',
    methods: {
        submitQuestion () {
            let string = this.$refs.askQuestion.value
            if (string.charAt(string.length - 1) !== '?') {
                string = string + '?'
            }
            this.$store.dispatch('createQuestion', string)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>