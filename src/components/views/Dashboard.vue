<template>
    <div :class="this.$options.name">
        <content-area scrollbar="true" valign="middle">
            <h1 class="_heading-m" v-t="'dashboard.title'"></h1>
            <div v-for="(item, index) in questionList"
                :key="index">
                <single-question 
                    :item="item"
                    :questionsAnswered="questionsAnswered">
                </single-question>
            </div>

            <create-question></create-question>
        </content-area>
    </div>
</template>

<script>
export default {
    name: 'dashboard',
    components: {
        'single-question': require('@/components/partials/SingleQuestion').default,
        'create-question': require('@/components/partials/CreateQuestion').default
    },
    computed: {
        questionList () {
            return this.$store.getters.getQuestions
        },
        questionsAnswered () {
            return this.$store.getters.getQuestionsAnswered
        },
        getRandom () {
            return this.questionList[Math.floor(Math.random() * this.questionList.length)]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.dashboard {
    background: transparent;
}
</style>
