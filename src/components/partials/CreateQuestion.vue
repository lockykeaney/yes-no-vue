<template>
    <div class="create-question">
        <close-button @click.native="closeSubmit"></close-button>
        <!-- <text-input @click="submitQuestion">Submit</text-input> -->
        <form ref="createForm" class="form-wrap">
            <input type="text" ref="askQuestion" placeholder="What is you question?" />
            <button @click="submitQuestion">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'create-question',
    components: {
        'text-input': require('@/components/partials/TextInput').default,
        'close-button': require('@/components/partials/CloseButton').default
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
    padding: 1rem;
    transition: transform .6s ease-in-out;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
    background-color: map-get($colors, purple);

    &.-hidden {
        transform: translateY(100%);
    }

    .form-wrap {
        @include abso-cent;
        width: 100%;
        height: auto;
        padding: 2rem;
    }

    input {
        height: 3rem;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        background-color: transparent;
        color: map-get($colors, white);
        border: none;
        outline: none;
        border-bottom: 2px solid map-get($colors, pink);
        &::placeholder {
            color: map-get($colors, white);
        }
    }

    button {
        @include abso-cent;
        top: 100%;
        padding: 0.5rem 1.5rem;
        background-color: grey;
    }
}


</style>