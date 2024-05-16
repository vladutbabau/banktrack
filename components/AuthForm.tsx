"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({type}: {type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const formSchema = authFormSchema(type);
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try{
        //Sign up with Appwrite & create plaid token
        if(type === 'sign-up'){
            const userData = {
                firstName: data.firstName!,
                lastName: data.lastName!,
                address1: data.address1!,
                city: data.city!,
                state: data.state!,
                postalCode: data.postalCode!,
                dateOfBirth: data.dateOfBirth!,
                ssn: data.ssn!,
                email: data.email,
                password: data.password
              }
    
              const newUser = await signUp(userData);

            setUser(newUser);
        }

        if(type === 'sign-in'){
            const response = await signIn({
                email: data.email,
                password: data.password,
            })

            if(response) router.push('/')
        }
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }

  }

  return (
    <section className='auth-form'>
        <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className='cursor-pointer flex items-center gap-1'>
                <Image 
                    src = "/icons/logo.svg"
                    width={34}
                    height={34}
                    alt='BTrack Logo'
                />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>BTrack</h1>
            </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user
                        ? 'Link Account'
                        : type === 'sign-in'
                            ? 'Intra in cont'
                            : 'Inregistreaza-te'
                    }

                    <p className="text-16 font-normal text-gray-600">
                        {user
                            ? 'Adauga datele tale pentru a te inregistra'
                            : 'Introduceti datele dumneavoastra'
                        }
                    </p>

                </h1>
            </div>
        </header>
        {user ? (
            <div className="flex flex-col gap-4">
                <PlaidLink
                    user = {user}
                    variant= "primary"
                />
            </div>

        ): (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-up' && (
                            <>
                            <div className="flex gap-4">

                                <CustomInput 
                                    control = {form.control}
                                    name = 'firstName'
                                    label = 'Nume'
                                    placeholder = 'Introduceti numele'
                                />
                                <CustomInput 
                                    control = {form.control}
                                    name = 'lastName'
                                    label = 'Prenume'
                                    placeholder = 'Introduceti prenumele'
                                />

                            </div>
                                <CustomInput 
                                    control = {form.control}
                                    name = 'address1'
                                    label = 'Adresa'
                                    placeholder = 'Introduceti adresa'
                                />
                                <CustomInput 
                                    control = {form.control}
                                    name = 'city'
                                    label = 'Oras'
                                    placeholder = 'Introduceti oras'
                                />
                            <div className="flex gap-4">

                                <CustomInput 
                                    control = {form.control}
                                    name = 'state'
                                    label = 'Tara'
                                    placeholder = 'Exemplu: RO'
                                />
                                <CustomInput 
                                    control = {form.control}
                                    name = 'postalCode'
                                    label = 'Cod postal'
                                    placeholder = 'Exemplu: 120232'
                                />

                            </div>
                                <CustomInput 
                                    control = {form.control}
                                    name = 'dateOfBirth'
                                    label = 'Data nasterii'
                                    placeholder = 'DD/MM/YYYY'
                                />
                                <CustomInput 
                                    control = {form.control}
                                    name = 'ssn'
                                    label = 'Cod de securitate'
                                    placeholder = 'Exemplu: 1234'
                                />
                            </>
                        )}
                        <CustomInput 
                            control = {form.control}
                            name = 'email'
                            label = 'Email'
                            placeholder = 'Introduceti email-ul'
                        />
                        <CustomInput 
                            control = {form.control}
                            name = 'password'
                            label = 'Parola'
                            placeholder = 'Introduceti parola'
                        />

                        <div className = "flex flex-col gap-4">

                        <Button type="submit" disabled={isLoading} className="form-btn">
                            {isLoading ? (
                                <>
                                    <Loader2 size = {20} className="animate-spin"/> &nbsp;
                                    Se incarca...
                                </>
                            ) : type === 'sign-in'
                              ? 'Intra In Cont' : 'Inregistrare'

                            }
                        </Button>
                        </div>
                    </form>
                </Form>

                <footer className="flex justify-center gap-1">
                    <p className="text-14 font-normal text-gray-600">{type === 'sign-in' 
                        ? 'Nu ai cont?'
                        : 'Ai deja un cont?'}
                    </p>
                    <Link href={type === 'sign-in' ? '/sign-up'
                                                   : '/sign-in'
                    } className="form-link">
                        {type === 'sign-in' ? 'Inregistreaza-te'
                                            : 'Logheaza-te'}
                    </Link>
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm