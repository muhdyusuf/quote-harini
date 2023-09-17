import { FC } from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Link,useLocation} from "react-router-dom";
import { useAuth } from '@/Context/authContext';
import { Popover, PopoverContent } from './ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';



interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({}) => {
    const location = useLocation()
    console.log(location.pathname)
    const {logOut,currentUser}=useAuth()
  return (
   <nav
    className={`bg-transparent fixed top-0 left-0 w-full p-4 flex ${currentUser?"justify-between":"justify-end"} items-center`}
   >
    {currentUser&&(
    <Popover
    >
        <PopoverTrigger
            asChild
            className='rounded-full overflow-hidden'
        >
            <Button
                className='p-0 bg-blue-200 aspect-square'
            >
                <img 
                    src={currentUser?.photoURL||""} 
                    alt="user profile picture"
                    className='object-contain w-full h-full' 

                />
            </Button>
        </PopoverTrigger>
        <PopoverContent
            className='w-full'
        >
            <ul>
                <li
                    onClick={logOut}
                >
                    logout
                </li>
            </ul>

        </PopoverContent>
        
    </Popover>)}

    {location.pathname!=="/addQuote"?(
    <Button
        asChild
        className='h-full px-0'
        variant="ghost"
    >   
       
        <Link to={"/addQuote"}
            className='flex gap-2 justify-between'
        >
            <p
                className='pl-2'
            >
                Add Quote
            </p>
            <Plus
                className='aspect-square w-8 p-0  m-0'
            />
        </Link>
    </Button>
    ):(
    <Button
        asChild
        className='h-full'
        variant="ghost"
    >   
       
        <Link to={"/"}
            className='flex gap-2 justify-between'
        >
          Quote Harini
        </Link>
    </Button>
    )}
   
   </nav>)
}

export default Navbar