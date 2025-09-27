import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{ elements: { formButtonPrimary: "bg-sky-500 hover:bg-sky-400" } }}
      afterSignUpUrl="/"
      signInUrl="/sign-in"
    />
  );
}
