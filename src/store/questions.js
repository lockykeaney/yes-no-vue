const state = {
    questionList: []
}

const getters = {
    getQuestions: state => state.questionList
}

const actions = {
    voteNo ({ commit, state }, id) {
        commit('VOTE_NO', id)
        console.log(id)
    },
    voteYes ({ commit, state }, id) {
        commit('VOTE_YES', id)
        console.log(id)
    },
    getQuestionData ({ commit, state }) {
        const questionData = require('../../static/data/questionList.json')
        commit('STORE_QUESTION_DATA', questionData)
    }
}

const mutations = {
    /* eslint-disable no-useless-computed-key */
    ['VOTE_YES'] (state, id) {
        const item = state.questionList.find(item => item.id === id)
        item.yesVotes++
    },
    ['VOTE_NO'] (state, id) {
        const item = state.questionList.find(item => item.id === id)
        item.noVotes++
    },
    ['STORE_QUESTION_DATA'] (state, questionData) {
        state.questionList = questionData
    }
}
// export the store module
export default {
    state,
    getters,
    actions,
    mutations
}
