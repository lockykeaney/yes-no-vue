<template>
    <div class="create-question">
        <div @click="closeSubmit">Close</div>
        <!-- <text-input @click="submitQuestion">Submit</text-input> -->
    </div>
</template>

<script>
export default {
    name: 'create-question',
    components: {
        'text-input': require('@/components/partials/TextInput').default
    },
    methods: {
        submitQuestion () {
            let string = this.$refs.askQuestion.value
            if (string.charAt(string.length - 1) !== '?') {
                string = string + '?'
            }
            this.$store.dispatch('createQuestion', string)
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
    outline: 1px solid red;

    &.-hidden {
        transform: translateY(100%);
    }
}
</style>