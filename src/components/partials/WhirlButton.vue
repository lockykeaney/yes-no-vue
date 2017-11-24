<template>
    <button 
        class="whirl-button"
        ref="whirlButton"
        @click="onClick">
            <div class="inner">{{ label }}</div>
            <div class="-border -bottom"></div>
            <div class="-border -right"></div>
            <div class="-border -top"></div>
            <div class="-border -left"></div>
    </button>
</template>

<script>
export default {
    name: 'whirl-button',
    props: ['label'],
    methods: {
        onClick () {
            this.$refs.whirlButton.classList.toggle('-pressed')
        }
    }
}
</script>

<style lang="scss" scoped>

$whirlTiming: .15s;

@mixin buttonClear {
    border: none;
    border-radius: 0;
    outline: none;
    background: none;
    margin: 0 auto;
}
@mixin centering {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.whirl-button {
    transition: all .25s ease-in-out;
    @include buttonClear;
    height: 3rem;
    width: 9rem;
    background-color: tomato;
    text-transform: uppercase;
    color: white;
    position: relative;
    cursor: pointer;
    letter-spacing: 1.5px;
    font-size: 0.8rem;
    font-weight: 100;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

    .inner {
        transition: opacity .6s ease-in-out;
        position: absolute;
        @include centering;
        height: auto;
        width: auto;
    }
    .-border {
        background-color: white;
        position: absolute;
        transition: transform $whirlTiming linear;
        transform: scale(0);
        &.-bottom {
            left: 0;
            bottom: 0;
            transform-origin: left;
            width: 100%;
            height: 0.2rem;
        }
        &.-right {
            right: 0;
            bottom: 0;
            transform-origin: bottom;
            height: 100%;
            width: 0.2rem;
        }
        &.-top {
            right: 0;
            top: 0;
            transform-origin: right;
            width: 100%;
            height: 0.2rem;
        }
        &.-left {
            left: 0;
            top: 0;
            transform-origin: top;
            height: 100%;
            width: 0.2rem;
        }
    }
    // &:hover {
    //     box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    //     .-bottom { transform: scaleX(1); }
    // }

    &.-pressed {
        box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
        .-bottom { transform: scale(1); }
        .-right { transform: scale(1); transition-delay: $whirlTiming; }
        .-top { transform: scale(1); transition-delay: calc(#{$whirlTiming} * 2); }
        .-left { transform: scale(1); transition-delay: calc(#{$whirlTiming} * 3); }
        // .inner { opacity: 0; }
    }
}

</style>