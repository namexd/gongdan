const defaultState = {
  user_data: null
}
export default (state = defaultState, action) => {
  if (action.type === 'user_data') {
    // why copy old state -> newState ? reducer 可以接收state 不能修改state！！！
    const newState = JSON.parse(JSON.stringify(state)); // 深度拷贝
    newState.user_data = action.value;
    return newState;
  }
  return state;
}
