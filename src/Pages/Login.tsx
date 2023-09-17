import UserAuthForm from '@/components/UserAuthForm'
import { FC } from 'react'
import { Link } from 'react-router-dom'



interface LoginProps {
  
}

const Login: FC<LoginProps> = ({}) => {


  return (
    <div className="container relative h-screen pt-16 flex flex-col items-center justify-center">
      
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Log Into you Account
            </h1>
            {/* <p className="text-sm text-slate-300/60">
              Enter your email below to create your account
            </p> */}
          </div>
          <UserAuthForm/>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
             to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
             to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>

  )
}

export default Login