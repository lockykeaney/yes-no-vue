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
    getQuestionData ({ commit, state }, questionData) {
        commit('STORE_QUESTION_DATA', questionData)
    }
}

const mutations = {
    /* eslint-disable no-useless-computed-key */
    ['VOTE_YES'] (state, id) {
        const item = state.questionList.find(item => item._id === id)
        item.yesVotes++
        fetch(`http://localhost:5678/${id}/yesVote`, {
            method: 'POST'
        })
    },
    ['VOTE_NO'] (state, id) {
        const item = state.questionList.find(item => item._id === id)
        item.noVotes++
        fetch(`http://localhost:5678/${id}/noVote`, {
            method: 'POST'
        })
    },
    ['GET_ANSWERED'] (state, questionsAnswered) {
        state.questionsAnswered = questionsAnswered
    },
    ['ANSWER_QUESTION'] (state, item) {
        state.questionsAnswered.push(item)
    },
    ['CREATE_QUESTION'] (state, question) {
        let newQuestion = {
            question: question,
            yesVotes: 0,
            noVotes: 0
        }
        fetch('http://localhost:5678/new', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({question: question})
        })
            .then(res => res.json())
            .then(res => console.log)
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
