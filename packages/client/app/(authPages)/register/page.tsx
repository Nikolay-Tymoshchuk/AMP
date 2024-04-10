// import { LoginForm } from '@/components/forms/LoginForm';
import { AuthForm } from '@/components/forms/AuthForm';
import { TYPE_AUTH } from '@/interfaces/enums';

export default function Login() {
  return <AuthForm typeAuth={TYPE_AUTH.REGISTRATION} />;
}
