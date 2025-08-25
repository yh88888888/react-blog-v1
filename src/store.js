//전역상태관리.

// 1. 초기 상태
const initialState = {
  isLogin: false,
  jwt: "",
};

// 2. 리듀서(reducer)
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLogin: true,
        jwt: action.jwt,
      };
    case "LOGOUT":
      return {
        isLogin: false,
        jwt: "",
      };
    default:
      return state;
  }
};

// const reducer = (state = initialState, good) => {
//   switch (good.type) {
//     case "LOGIN":
//       return {
//         isLogin: true,
//         jwt: goodn.jwt
//       };
//   }
// };

//3. 액션
export function login(jwt) {
  //jwt 는 통신이 아니라 상태가 바뀔 때 받겠다.
  return {
    type: "LOGIN",
    jwt: jwt,
  };
}

export function logout() {
  // localStorage.removeItem("jwt");  이렇게 넣어도 되지만 SRP 위배배
  return {
    type: "LOGOUT",
  };
}

export default reducer;
