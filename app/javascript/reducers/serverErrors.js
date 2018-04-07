export default function serverErrors(state = { error: '' }, action) {
  switch (action.type) {
    case 'SERVER_ERROR':
      return { ...state, error: action.error };
    case 'CLEAR_ERROR':
      return { ...state, error: '' };
    default:
      return state;
  }
}
