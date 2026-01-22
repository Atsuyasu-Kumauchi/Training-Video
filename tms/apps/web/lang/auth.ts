export const LangAuth = {
    login:{
        title: "おかえりなさい", // welcome home
        description: "トレーニングポータルアカウントにログイン", // Log in to your Training Portal account
        emailLabel: "メールアドレス", // email address
        emailPlaceholder: "メールアドレスを入力", // Enter your email address
        passwordLabel: "パスワード", // password
        otpLabel: "ワンタイムパスコード", // OTP
        otpPlaceholder: "OTPを入力", // Enter your OTP
        passwordPlaceholder: "パスワードを入力", // Enter your password
        stayLoginLabel: "ログイン状態を保持", // Stay logged in
        forgotPassword: "パスワードをお忘れですか？", // Forgot password?
        continue: "続ける", // Continue
        login: "ログイン", // Login
        submit: "送信", // Submit
    },
    forgotPassword:{ 
        title:"パスワードを忘れた場合", //Forgot your password?
        description:"メールアドレスを入力してリセット手順を受け取る", //Enter your email address to receive reset instructions
        emailLabel: "メールアドレス", // email address
        emailPlaceholder: "メールアドレスを入力", // Enter your email address
        login: "ログイン", // Login
        sendResetLink: "リセットリンクを送信", // Send reset link
    }
}

export type ILangAuth = typeof LangAuth