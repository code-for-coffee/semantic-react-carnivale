export function fetchCharactersRequest(){
  return {
    type: "FETCH_REQUEST"
  }
}

export function fetchCharactersSuccess(payload) {
  return {
    type: "FETCH_SUCCESS",
    payload
  }
}

export function fetchCharactersError() {
  return {
    type: "FETCH_ERROR"
  }
}