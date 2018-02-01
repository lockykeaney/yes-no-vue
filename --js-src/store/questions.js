const state = {
    questionList: [],
    questionsAnswered: [],
    fetchSuccess: null,
    isFetching: false,
    postSuccess: null
}

const getters = {
    getQuestions: state => state.questionList,
    getQuestionsAnswered: state => state.questionsAnswered,
    getIsFetching: state => state.isFetching,
    getFetchSuccess: state => state.fetchSuccess,
    getPostSuccess: state => state.postSuccess
}

const actions = {
    createQuestion ({ commit, state }, question) {
        commit('SET_IS_FETCHING_TRUE')
        fetch(`${env.DATA_SOURCE}/new`, {
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
            .then(() => {
                commit('CREATE_QUESTION', question)
                commit('SET_IS_FETCHING_FALSE')
            })
            .catch(() => {
                commit('POST_FAILED')
                commit('SET_IS_FETCHING_FALSE')
            })
    },
    fetchTest ({ commit, state }) {
        commit('SET_IS_FETCHING_TRUE')
        setTimeout(() => {
            commit('SET_IS_FETCHING_FALSE')
        }, 1500)
    },
    fetchQuestionData ({ commit, state }) {
        commit('SET_IS_FETCHING_TRUE')
        fetch(`${env.DATA_SOURCE}/all`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then((response) => {
                commit('FETCH_QUESTION_DATA', response)
                commit('SET_IS_FETCHING_FALSE')
            })
            .catch(() => {
                commit('FETCH_FAILED')
                commit('SET_IS_FETCHING_FALSE')
            })
    },
    voteYes ({ commit, state }, id) {
        commit('SET_IS_FETCHING_TRUE')
        fetch(`${env.DATA_SOURCE}/${id}/yesVote`, {
            method: 'POST'
        })
            .then(commit('VOTE_YES', id))
            .catch(() => {
                commit('FETCH_FAILED')
                commit('SET_IS_FETCHING_FALSE')
            })
    },
    voteNo ({ commit, state }, id) {
        commit('SET_IS_FETCHING_TRUE')
        fetch(`${env.DATA_SOURCE}/${id}/noVote`, {
            method: 'POST'
        })
            .then(commit('VOTE_NO', id))
            .catch(() => {
                commit('FETCH_FAILED')
                commit('SET_IS_FETCHING_FALSE')
            })
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
    ['SET_IS_FETCHING_TRUE'] (state) {
        state.isFetching = true
    },
    ['SET_IS_FETCHING_FALSE'] (state) {
        state.isFetching = false
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
