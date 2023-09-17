import React, { FC, useState } from 'react'

//
import{Github,Loader} from 'lucide-react'
import { Button } from './ui/button';
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { useAuth } from '@/Context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{}

const UserAuthForm: FC<UserAuthFormProps> = ({className,...props}) => {
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const {logIn,setCurrentUser}=useAuth()

    const navigate=useNavigate()
    const location=useLocation()
    const { from } = location.state || { from: { pathname: '/' }}

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
    
        setTimeout(() => {
          setIsLoading(false)
        }, 3000)
      }

      const handleLogInGoogle = async () => {
        setIsLoading(true)
          logIn().then((result) => {
            const user = result.user;
            console.log(user)
            setCurrentUser(user)
             navigate(from);  // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
          console.log(error)
            setIsLoading(false)
        });
    }
     

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form> */}
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-400/60 ">
             continue with
          </span>
        </div>
      </div> */}
      <Button 
        variant={"outline"}
        type="button" disabled={isLoading}
        onClick={handleLogInGoogle}
    >
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Sign in With Google
      </Button>
    </div>
   )
}

export default UserAuthForm