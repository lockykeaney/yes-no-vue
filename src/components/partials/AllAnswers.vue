<template>
    <div class="all-answers">
        <div v-if="questionsAnswered !== 0">
            {{ questionsAnswered.length }}
            <!-- <div :for="answer in questionsAnswered">
            {{ answer.question }}
        </div> -->
        </div>
        <div v-else>
            nothing answered yet
        </div>
    </div>
</template>

<script>
export default {
    name: 'all-answers',
    props: ['questionsAnswered']
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.all-answers {
    position: absolute;
    height: 10%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: white;
}

</style>