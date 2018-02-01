<template>

    <div class="create-question">
        <button
            ref="submitButton"
            class="submit-button"
            :class="{ '-hidden': isSubmitOpen }"
            @click="openSubmit">
            Submit a Question
        </button>

        <close-button @click.native="closeSubmit"></close-button>
        <form ref="createForm" class="form-wrap">
            <input type="text" ref="askQuestion" placeholder="What is you question?" required/>
            <button @click="submitQuestion">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'create-question',
    components: {
        'close-button': require('@/components/partials/CloseButton').default
    },
    computed: {
        isSubmitOpen () {
            return this.$store.getters.isSubmitOpen
        },
        postSuccess () {
            return this.$store.getters.getPostSuccess
        }
    },
    methods: {
        submitQuestion (e) {
            e.preventDefault()
            let string = this.$refs.askQuestion.value
            if (string.length !== 0) {
                if (string.charAt(string.length - 1) !== '?') {
                    string = string + '?'
                }
                this.$store.dispatch('createQuestion', this.capitalize(string))
                this.$refs.createForm.querySelector('button').innerHTML = 'Thanks!'
            } else {
                this.$refs.createForm.querySelector('input').placeholder = 'You forgot your question!'
            }
            this.resetForm()
        },
        resetForm () {
            setTimeout(() => {
                this.$refs.createForm.querySelector('input').value = ''
                this.$refs.createForm.querySelector('button').innerHTML = 'Submit'
            }, 4000)
        },
        openSubmit () {
            this.$store.dispatch('toggleSubmit')
        },
        closeSubmit () {
            this.$store.dispatch('toggleSubmit')
            this.resetForm()
        },
        capitalize (val) {
            return val.charAt(0).toUpperCase() + val.slice(1)
        }
    },
    watch: {
        postSuccess: () => {
            console.log('failed to post')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.create-question {
    padding: 1rem;
    transition: transform .4s ease-in-out;
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

    .submit-button {
        border: 0;
        outline: 0;
        height: 6vh;
        width: 60%;
        font-size: 1.2rem;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background: map-get($colors, purple);
        color: map-get($colors, pink);
        position: absolute;
        left: 50%;
        z-index: 5;
        top: -3vh;
    }

    input {
        transition: all .3s ease-in-out;
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
        transition: all .3s ease-in-out;
        @include abso-cent;
        z-index: 10;
        top: 100%;
        padding: 0.5rem 1.5rem;
        background-color: grey;
    }
}

</style>