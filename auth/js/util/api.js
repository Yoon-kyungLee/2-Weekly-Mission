import { ERROR_MESSAGES } from "./errorMessage.js";
import { 
  emailInput, 
  passwordInput,
} from "./seletors.js";
import { 
  showEmailError, 
  showPasswordError, 
  showPasswordCheckError 
} from "./signFunctions.js";

const API_URL = "https://bootcamp-api.codeit.kr/api"

export async function signInAndRedirect() {
  const auth = {
    email: emailInput.value,
    password: passwordInput.value
  };
  try {
    const signInResponse = await fetch(`${API_URL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(auth),
    });
    const signInJSON = await signInResponse.json();
    if (signInJSON.data.accessToken) {
      localStorage.setItem('signIn', JSON.stringify(auth))
    }
    const storedSignIn = JSON.parse(localStorage.getItem('signIn'));
    if (auth.email === storedSignIn.email && auth.password === storedSignIn.password) {
      window.location.href = "/folder.html"; 
    } else {
      console.log('로그인 정보 불일치');
    }
  } catch (error) {
    showEmailError(ERROR_MESSAGES.checkEmail);
    showPasswordError(ERROR_MESSAGES.checkPassword);
  }
}

export async function signUpAndRegister() {
  const auth = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  try {
    const signUpResponse = await fetch(`${API_URL}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(auth),
    });
    const signUpJSON = await signUpResponse.json();
    if (signUpJSON.data.accessToken) {
      localStorage.setItem('signUp', JSON.stringify(auth))
      }
    const storedSignUp = JSON.parse(localStorage.getItem('signUp'));
    if (auth.email === storedSignUp.email && auth.password === storedSignUp.password) {
      window.location.href = "/folder.html"
    } else {
      console.log('회원가입 정보 불일치')
    }
  } catch (error) {
    showEmailError(ERROR_MESSAGES.checkEmail);
    showPasswordError(ERROR_MESSAGES.checkPassword);
    showPasswordCheckError(ERROR_MESSAGES.checkPassword);
  }
}

export async function checkDuplicateEmail() {
  try {
    const checkEmailResponse = await fetch(`${API_URL}/check-email`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ email: emailInput.value }),
    });
    if (checkEmailResponse.status === 409) {
        showEmailError(ERROR_MESSAGES.duplicateEmail);
      }
  } catch (error) {
    console.log(error.message);
  }
}
