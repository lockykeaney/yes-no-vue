<template>
    <div :class="this.$options.name">
        <content-area scrollbar="true" valign="middle">
            <h1 class="_heading-m" v-t="'dashboard.title'"></h1>
            <div v-for="(item, index) in questionList"
                :key="index">
                <single-question :item="item"></single-question>
                <!-- <div class="single-question">
                    <p> {{ item.question }} </p>
                </div> -->
            </div>
        </content-area>
    </div>
</template>

<script>
export default {
    name: 'dashboard',
    components: {
        'single-question': require('@/components/partials/SingleQuestion').default
    },
    computed: {
        questionList () {
            return this.$store.getters.getQuestions
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
