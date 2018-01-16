const state = {
    questionList: [],
    questionsAnswered: [],
    fetchSuccess: null,
    postSuccess: null
}

const getters = {
    getQuestions: state => state.questionList,
    getQuestionsAnswered: state => state.questionsAnswered,
    getFetchSuccess: state => state.fetchSuccess,
    getPostSuccess: state => state.postSuccess
}

const actions = {
    createQuestion ({ commit, state }, question) {
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
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
            })
            .then(commit('CREATE_QUESTION', question))
            .catch(() => {
                commit('POST_FAILED')
            })
    },
    fetchQuestionData ({ commit, state }) {
        fetch('http://localhost:5678/all')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then((response) => {
                commit('FETCH_QUESTION_DATA', response)
            })
            .catch(() => {
                commit('FETCH_FAILED')
            })
    },
    voteYes ({ commit, state }, id) {
        fetch(`http://localhost:5678/${id}/yesVote`, {
            method: 'POST'
        })
            .then(commit('VOTE_YES', id))
    },
    voteNo ({ commit, state }, id) {
        fetch(`http://localhost:5678/${id}/noVote`, {
            method: 'POST'
        })
            .then(commit('VOTE_NO', id))
    },
    answerQuestion ({ commit, state }, id) {
        commit('ANSWER_QUESTION', id)
    },
    importAnswered ({ commit, state }, questionsAnswered) {
        commit('IMPORT_ANSWERED', questionsAnswered)
    }
}

const mutations = {
    /* eslint-disable no-useless-computed-key */
    ['CREATE_QUESTION'] (state, question) {
        let newQuestion = {
            question: question,
            yesVotes: 0,
            noVotes: 0
        }
        state.questionList.push(newQuestion)
        state.postSuccess = true
    },
    ['FETCH_QUESTION_DATA'] (state, questionData) {
        state.questionList = questionData
        state.fetchSuccess = true
    },
    ['FETCH_FAILED'] (state) {
        state.fetchSuccess = false
    },
    ['POST_FAILED'] (state) {
        state.postSuccess = false
    },
    ['IMPORT_ANSWERED'] (state, questionsAnswered) {
        state.questionsAnswered = questionsAnswered
    },
    ['VOTE_YES'] (state, id) {
        const item = state.questionList.find(item => item._id === id)
        item.yesVotes++
    },
    ['VOTE_NO'] (state, id) {
        const item = state.questionList.find(item => item._id === id)
        item.noVotes++
    },
    ['ANSWER_QUESTION'] (state, item) {
        state.questionsAnswered.push(item)
    }
}
// export the store module
export default {
    state,
    getters,
    actions,
    mutations
}
