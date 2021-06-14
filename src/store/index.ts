import { createStore } from 'vuex'

interface state {
    board: string[][];
    chessMan: string;
    Winner: string;
    isWon: boolean;
    isEmpty: boolean;
}

export default createStore({
    state: {
        board: [[], [], [], [], [], [], [], [], [], []],
        chessMan: '⚫',
        Winner: '',
        isWon: false,
        isEmpty: true,
    } as state,
    mutations: {
        changeState(state, { x, y }) {
            state.board[x - 1][y - 1] = state.chessMan;
        },
        changeSide(state) {
            if (state.chessMan === '⚫') {
                state.chessMan = '⚪';
            } else {
                state.chessMan = '⚫';
            }
        },
        isWin(state, { x, y }) {
            //横
            {
                let counter = 1;
                //往右
                for (let i = 1; i < 5; i++) {
                    if (state.board[x - 1][y - 1] === state.board[x - 1][y + i - 1]) {
                        counter++;
                    } else {
                        break;
                    }
                }
                //往左
                for (let i = 1; i < 5; i++) {
                    if (state.board[x - 1][y - 1] === state.board[x - 1][y - i - 1]) {
                        counter++;
                    } else {
                        break;
                    }
                }
                if (counter >= 5) {
                    state.isWon = true;
                    state.Winner = state.board[x - 1][y - 1];
                    console.log(state.Winner);
                }
            }
            //竖
            {
                let counter = 1;
                //往下
                for (let i = 1; i < 5; i++) {
                    if ((x + i - 1 >= 0) && (x + i - 1 <= 9) && (state.board[x - 1][y - 1] === state.board[x + i - 1][y - 1])) {
                        counter++;
                    } else {
                        break;
                    }
                }
                //往上
                for (let i = 1; i < 5; i++) {
                    if ((x - i - 1 >= 0) && (x - i - 1 <= 9) && (state.board[x - 1][y - 1] === state.board[x - i - 1][y - 1])) {
                        counter++;
                    } else {
                        break;
                    }
                }
                if (counter >= 5) {
                    state.isWon = true;
                    state.Winner = state.board[x - 1][y - 1];
                    console.log(state.Winner);
                }
            }
            //撇
            {
                let counter = 1;
                //往下
                for (let i = 1; i < 5; i++) {
                    if ((x + i - 1 >= 0) && (x + i - 1 <= 9) && (y - i - 1 >= 0) && (y - i - 1 <= 9) && (state.board[x - 1][y - 1] === state.board[x + i - 1][y - i - 1])) {
                        counter++;
                    } else {
                        break;
                    }
                }
                //往上
                for (let i = 1; i < 5; i++) {
                    if ((x - i - 1 >= 0) && (x - i - 1 <= 9) && (y + i - 1 >= 0) && (y + i - 1 <= 9) && (state.board[x - 1][y - 1] === state.board[x - i - 1][y + i - 1])) {
                        counter++;
                    } else {
                        break;
                    }
                }
                if (counter >= 5) {
                    state.isWon = true;
                    state.Winner = state.board[x - 1][y - 1];
                    console.log(state.Winner);
                }
            }
            //捺
            {
                let counter = 1;
                //往上
                for (let i = 1; i < 5; i++) {
                    if ((x + i - 1 >= 0) && (x + i - 1 <= 9) && (y + i - 1 >= 0) && (y + i - 1 <= 9) && (state.board[x - 1][y - 1] === state.board[x + i - 1][y + i - 1])) {
                        counter++;
                    } else {
                        break;
                    }
                }
                //往下
                for (let i = 1; i < 5; i++) {
                    if ((x - i - 1 >= 0) && (x - i - 1 <= 9) && (y - i - 1 >= 0) && (y - i - 1 <= 9) && (state.board[x - 1][y - 1] === state.board[x - i - 1][y - i - 1])) {
                        counter++;
                    } else {
                        break;
                    }
                }
                if (counter >= 5) {
                    state.isWon = true;
                    state.Winner = state.board[x - 1][y - 1];
                    console.log(state.Winner);
                }
            }
        },
        isEmpty(state, { x, y }) {
            if ((state.board[x - 1][y - 1] === '⚫') || (state.board[x - 1][y - 1] === '⚪')) {
                state.isEmpty = false;
            } else {
                state.isEmpty = true;
            }
        },
    },
    actions: {
        handleClick({ commit }, { x, y }) {
            commit('isEmpty', { x, y })
            if ((!this.state.isWon) && (this.state.isEmpty)) {
                commit('changeState', { x, y });
                commit('changeSide');
                commit('isWin', { x, y })
            }
        }
    },
    modules: {
    }
})