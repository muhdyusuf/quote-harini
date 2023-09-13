import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Loader} from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {useState} from 'react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { toast, useToast } from "@/components/ui/use-toast"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { collection, doc, getDocs, query, where,Timestamp, addDoc} from "firebase/firestore"

import { db } from "@/lib/firebaseConfig"
import { setTimeout } from "timers/promises"
import { ToastAction } from "@radix-ui/react-toast"
const quoteRef=collection(db,"quotes")


const FormSchema = z.object({
    date: z.date({
        required_error: "A date is required.",
    }).refine(async (date)=>{
       
        const start=date.setHours(0,0,0,0)
        const end=date.setHours(11,59,59,59)
        const startTimeStamp=Timestamp.fromDate(new Date(start))
        const endTimeStamp=Timestamp.fromDate(new Date(end))
        const q=query(quoteRef
            ,where("date",">=",startTimeStamp)
            ,where("date","<=",endTimeStamp)
            )
    
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty

  },"pick another date"),
  quote:z.string().min(30,{message:"quote must contain atleast 50 character"}).max(150),
  author:z.string().min(3).max(20),
})

export function AddQuoteForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  

  

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const quoteRef=collection(db,"quotes")
    try {
        setIsLoading(true)
        await addDoc(quoteRef,data)
    } catch (error) {
        console.log(error)
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        setIsLoading(false)
    }finally{
        
        toast({
            title:"Successfully Added",
            description: `Your quote will be post on ${data.date}`,
        })
        setIsLoading(false)
        
    }

    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
            control={form.control}
            name="quote"
            render={({field})=>(
                <FormItem
                    className="flex flex-col items-start"
                >
                    <FormLabel>Quote</FormLabel>
                    <FormControl>
                    <Textarea
                    placeholder="qoute..."
                    className="resize-none h-32"
                    {...field}
                    />

                    </FormControl>
                    <FormMessage/>
                </FormItem>

            )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem
                className="flex flex-col items-start"
            >
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Quote Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>{
                        let today=new Date().setHours(0,0,0,0)
                   
                        
                        
                
                        const next30Days=new Date().setDate(new Date().getDate() + 30)
                      
                    
                        return date<new Date(today) || date>new Date(next30Days)
                       
                       
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading?(
            <Button disabled>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
            
        ):(<Button type="submit">Submit</Button>)}
      </form>
    </Form>
  )
}
