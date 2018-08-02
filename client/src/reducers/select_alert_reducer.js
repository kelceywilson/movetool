// state argument is not application state,
// only the state this reducer is responsible for
export default function(state = null, action){
  // console.log('selected alert', action);
  switch (action.type) {
  case 'SELECT_ALERT':
    return state;
  default:
    return state
  }
}
