import React, { useState } from "react";
import styles from "@/components/domains/auth/InputForm.module.css";
import { useForm } from "react-hook-form";
import AuthInput from "@/components/domains/auth/commons/AuthInput";
import { CtaLong } from "@/components/commons/Cta";
import { signIn } from "@/pages/api/auth";
import { SignForm } from "@/lib/utils/type";
import { regEmail } from "@/lib/utils/regPatterns";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignForm>({ mode: "onBlur" });
  const [passwordInputType, setPasswordInputType] = useState<string>("password");

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  const onSubmit = async () => {
    await signIn(watch("email"), watch("password"), setError);
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!errors.email && !errors.password) {
        onSubmit();
      }
    }
  };

  return (
    <form className={styles.signContainer} onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        label="이메일"
        type="email"
        error={errors.email?.message}
        placeholder="이메일을 입력해 주세요."
        registerConfig={register("email", {
          required: "이메일을 입력해 주세요.",
          pattern: {
            value: regEmail,
            message: "올바른 이메일 주소가 아닙니다.",
          },
        })}
      />
      <AuthInput
        label="비밀번호"
        type={passwordInputType}
        error={errors.password?.message}
        placeholder="비밀번호를 입력해 주세요."
        onKeyPress={handleOnKeyPress}
        onChangeType={togglePasswordVisibility}
        registerConfig={register("password", {
          required: "비밀번호를 입력해 주세요.",
        })}
      />
      <CtaLong onClick={handleSubmit(onSubmit)} type="submit">
        로그인
      </CtaLong>
    </form>
  );
}