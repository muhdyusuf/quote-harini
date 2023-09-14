import { AddQuoteForm } from '@/components/AddQuoteForm'

import { Card, CardContent} from '@/components/ui/card'
import { FC } from 'react'

interface AddQuoteProps {
  
}

const AddQuote: FC<AddQuoteProps> = ({}) => {
  return (
   <div
    className='bg-red-100 w-screen h-screen flex justify-center items-center'
   >
    <Card>
       <CardContent 
       className='p-8'>
        <AddQuoteForm/>
       </CardContent>
    </Card>
   </div>
   )
}

export default AddQuote