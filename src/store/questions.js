const state = {
    questionList: [],
    questionsAnswered: []
}

const getters = {
    getQuestions: state => state.questionList,
    getQuestionsAnswered: state => state.questionsAnswered
}

const actions = {
    voteNo ({ commit, state }, id) {
        commit('VOTE_NO', id)
    },
    voteYes ({ commit, state }, id) {
        commit('VOTE_YES', id)
    },
    getAnswered ({ commit, state }) {
        commit('GET_ANSWERED')
    },
    answerQuestion ({ commit, state }, id) {
        commit('ANSWER_QUESTION', id)
    },
    createQuestion ({ commit, state }, question) {
        commit('CREATE_QUESTION', question)
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
    ['GET_ANSWERED'] (state, questionsAnswered) {
        state.questionsAnswered = questionsAnswered
    },
    ['ANSWER_QUESTION'] (state, item) {
        // const item = state.questionList.find(item => item.id === id)
        state.questionsAnswered.push(item)
    },
    ['CREATE_QUESTION'] (state, question) {
        let newQuestion = {
            id: 11 + 1,
            question: question,
            yesVotes: 0,
            noVotes: 0
        }
        state.questionList.push(newQuestion)
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
