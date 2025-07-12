'use client'//If you need to do a browser caluclation where code is in the browser you will use client
//jReact Hooks are functions that allow you to use state and other React features in functional components. Introduced in React 16.8, Hooks provide a way to manage state, side effects, and other logic without writing class components.
//State Hooks allow components to "remember" information. The useState hook declares a state variable that you can update directly, while the useReducer hook declares a state variable with the update logic inside a reducer function.

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
import { signUp, ActionResponse } from '@/app/actions/auth'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function SignUpPage() {
  const router = useRouter() //get a handle on the router. Programtically handling the router


  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState< //we get ActionState object, is it pending. 
    ActionResponse, //this is the state type
    FormData //
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signUp(formData) //this is a fetch that just gets data from the server

      // Handle successful submission
      if (result.success) {
        toast.success('Account created successfully')
        router.push('/dashboard') //since succesfull route the user to the dashboard. This returns a void so you dont have to put anything here 

      }

      return result
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'An error occurred',
        errors: undefined,
      }
    }
  }, initialState)

  return (
    <Form action={formAction} className="space-y-6">
      {state?.message && !state.success && ( //If the satte has an error we will show the error message here 
      <FormError>{state.message}</FormError>
      )}

      <FormGroup>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <FormInput
          id="email"
          name="email" //form.get email uses this maps to form data
          type="email"
          autoComplete="email"
          required //You will notice there is no onchange here. It is no longer required. 
          disabled={isPending}
          aria-describedby="confirmPassword-error"
          className={state?.errors?.email? 'border-red-500': ''}
          />
          {state?.errors?.email && (
            <p id="email-error" className='text-sm text-red-500'>
              {state.errors.email[0]}
            </p>
          )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormInput
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          disabled={isPending}
          aria-describedby="password-error"
          className={state?.errors?.password ? 'border-red-500' : ''}
        />
        {state?.errors?.password && (
          <p id="password-error" className="text-sm text-red-500">
            {state.errors.password[0]}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          disabled={isPending}
          aria-describedby="confirmPassword-error"
          className={state?.errors?.confirmPassword ? 'border-red-500' : ''}
        />
        {state?.errors?.confirmPassword && (
          <p id="confirmPassword-error" className="text-sm text-red-500">
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </FormGroup>

      <div>
        {/* This submit button is the most important for submitting data */}
        <Button type="submit" className='w-full' isLoading={isPending}>
          Sign up
        </Button>
      </div>
    </Form>
  )
}