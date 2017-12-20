<template>
    <div class="close-button">
        <div class="-cross"></div>
        <div class="-cross"></div>
    </div>
</template>

<script>
export default {
    name: 'close-button'
}
</script>

<style scoped lang="scss">
@import '../../assets/sass/tools';

.close-button {
    position: absolute;
    top: .5rem;
    right: .5rem;
    height: 2rem;
    width: 2rem;
    z-index: 10;
    border-radius: 50%;
    background-color: white;
    .-cross {
        @include abso-cent;
        height: 75%;
        width: 3px;
        border-radius: 5px;
        background-color: black;
        &:nth-child(1){ transform: translate(-50%, -50%) rotate(45deg); }
        &:nth-child(2){ transform: translate(-50%, -50%) rotate(-45deg); }
    }
}
</style>