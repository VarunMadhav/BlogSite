/* 3 ACTIONS 
1. jab loginpage pe username and password daalke click karoge toh sab details jo type kara unke pakadlena and res send karna

2. agar login succesful hua toh jo context mei 
const INITIAL_STATE = {
    user:null,
    isFeteching: false,
    error: false,
};
hai isme change kardo user: mei sab details and isFetching true sab

3. agar login fail hua toh context wale mei error true

*/
export const LoginStart = (userCredentials)=>({
    type: "LOGIN_START",
})

export const LoginSuccessful = (user) => ({
    type:"LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () =>({
    type:"LOGIN_FAILURE"
})

export const Logout = () => ({
    type: "LOGOUT",
});

export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START",
});
  
  export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
});
  
  export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE",
});