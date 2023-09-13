import { useAuth } from '@/Context/authContext'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/firebaseConfig'
import { QuerySnapshot, Timestamp, collection, getDocs, query, where } from 'firebase/firestore'
import { Quote } from 'lucide-react'
import { FC, useEffect, useState,Suspense} from 'react'

interface QuoteHariniProps {
  
}

interface IQuote{
    id:String,
    quote:String,
    author?:String
}

const QuoteHarini: FC<QuoteHariniProps> = ({}) => {
    useEffect(()=>{
        const date=new Date()
        const start=date.setHours(0,0,0,0)
        const end=date.setHours(11,59,59,59)
        const startTimeStamp=Timestamp.fromDate(new Date(start))
        const endTimeStamp=Timestamp.fromDate(new Date(end))

        const quoteRef=collection(db,"quotes")
        const q=query(quoteRef
            ,where("date",">=",startTimeStamp)
            ,where("date","<=",endTimeStamp)
            )
    
        getDocs(q).then(querySnapshot=>{
          
            console.log(querySnapshot)
            querySnapshot.forEach(doc=>{
                const {quote,author}=doc.data()
                setQuote({
                    id:doc.id,
                    quote,
                    author
                })
            })


        })
    },[])

    const {currentUser}=useAuth()
    const [quote,setQuote]=useState<IQuote|null>(null)
    const [isLoading,setIsLoading]=useState<boolean>(false)
    
    
  return (

        <div
            className='container min-w-full min-h-screen grid place-content-center overflow-hidden'
        >
        <Card
            className='max-w-[500px] p-8'
        >
            <CardContent
                className='p-0'
            >
            


                <div
                    className='flex gap-2'
                >
                    <Quote className='rotate-180 text-8xl text-slate-400/80 '/>
                    <blockquote
                        className='text-4xl text-blue-500 font-black text-left p-0 m-0 '
                        >
                        {quote?.quote.split('\n').map((line,index)=>(
                            <span 
                                className='m-0 p-0'
                                key={crypto.randomUUID()}>
                                {line}
                                {quote.quote.length>=index&&<br/>}
                               
                            </span>
                        ))}

                    </blockquote>
                </div>

      
            </CardContent>

            <CardFooter
                 className='flex justify-end p-0 pt-2'
            >
                <h2
                    className='text-muted-foreground'
                >
                       - {quote?.author}. 
                </h2>
            </CardFooter>
        </Card>
        </div>

   )
}

export default QuoteHarini