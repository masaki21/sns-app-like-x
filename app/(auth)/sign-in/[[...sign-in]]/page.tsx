import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return <SignIn appearance={{ elements: { formButtonPrimary: "bg-sky-500 hover:bg-sky-400" } }} />;
}
