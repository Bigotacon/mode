'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/Button'
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
} from '@/app/components/ui/Form'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { signIn, ActionResponse } from '@/app/actions/auth'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined
}

export default function SignInPage(){
  const router = useRouter()
  //use ActionState hook for the form submission action

  const[state, formAction, isPending] = useActionState<
  ActionResponse,
  FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try{
      const result = await signIn(formData)
      //Handle successful submission 
      if(result.success) {
        toast.success('Signed in successfully')
        router.push('/dashboard')
        router.refresh()
      }

      return result
    }
    catch(err){
      return{
        success: false,
        message: (err as Error).message || 'An error has occurred',
        errors: undefined
      }
    }
  }, initialState)

  return (
    <Form action={formAction} className='space-y-6'>
      {state?.message && !state.success && (
        <FormError>{state.message}</FormError>
      )}

      <FormGroup>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <FormInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isPending}
          aria-describedby="email-error"
          className={state?.errors?.email? 'border-red-500': ''}
          />
          {state?.errors?.email && (
            <p id="email-error" className='text-sm text-red-500'>
              {state.errors.email[0]}
            </p>
          )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
        <FormInput
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isPending}
          aria-describedby="confirmPassword-error"
          className={state?.errors?.confirmPassword? 'border-red-500': ''}
          />
          {state?.errors?.email && (
            <p id="confirmPassword-error" className='text-sm text-red-500'>
              {state.errors.password[0]}
            </p>
          )}
      </FormGroup>
      <div>
        <Button type="submit" className='w-full' isLoading={isPending}>
        Sign in
        </Button>
      </div>


    </Form>

  )
}