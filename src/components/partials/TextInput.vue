<template>
    <div class="single-text-input">
        <input 
            class="-input" 
            type="text" 
            ref="textInput" 
            value="" 
            placeholder="Text Input" />
        <button 
            class="-submit" 
            ref="textSubmit" 
            type="submit" 
            @click="onSubmit" 
            value="">
            GO
        </button>
    </div>
</template>

<script>
export default {
    name: 'text-input',
    methods: {
        onSubmit () {
            console.log('submit')
            this.$refs.textSubmit.classList.toggle('-active')
        }
    }
}
</script>

<style lang="scss" scoped>
* { box-sizing: border-box; }
@mixin centering {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
$inputWidth: 20rem;
.single-text-input {
    height: calc(#{$inputWidth} / 7);
    width: $inputWidth;
    border: 2px solid tomato;
    border-radius: 1.5rem;
    position: relative;
    background-color: transparent;
    &::after {
        content: 'LOADING...';
        color: black;
        position: absolute;
        @include centering;
        height: 100%;
        width: 100%;
        opacity: 0;
        letter-spacing: 1.5px;
        z-index: 5;
        pointer-events: none;
    }
    .-input {
        background-color: transparent;
        height: 100%;
        width: 90%;
        outline: none;
        border: none;
        padding: 1rem;
        text-transform: uppercase;
        color: tomato;
        letter-spacing: 1.5px;
        &::placeholder {
            color: tomato;
            letter-spacing: 1.5px;
            opacity: 0.4;
        }
    }
    .-submit {
        transition: width .2s ease-in-out;
        height: 2.25rem;
        width: 2.25rem;
        outline: none;
        border: none;
        background-color: tomato;
        color: white;
        border-radius: 1.5rem;
        float: right;
        position: absolute;
        top: 50%;
        right: 0.30rem;
        font-size: 0.7rem;
        letter-spacing: 2px;
        font-weight: 100;
        cursor: pointer;
        transform: translateY(-50%);
        
        &:hover {
            transition: width .2s ease-in-out;
            width: 3.5rem;
        }

        &.-active {
            transition: width .5s ease-in-out;
            color: tomato;
            width: calc(#{$inputWidth} - 0.80rem);
            &::after {
                opacity: 1;
            }
        }
        &.-error {

        }
    }
}

</style>