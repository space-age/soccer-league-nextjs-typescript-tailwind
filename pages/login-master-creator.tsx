import Head from 'next/head'
import Image from 'next/image'
import image from '../images/fields-bg.jpg'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

import useAuth from '../hooks/useAuth'

interface Inputs {
  email: string
  password: string
}

/**
 * .login-master-creator page. Page displays Sign In functionality to access Portal.
 * Does not have the capability to sign up as dont want everyone to have access to the Portal
 * For demo purposes, will give email and password to be able to access Portal temporarily
 * !!!Important: Sign In container will hide when screen is smaller than 1280px. Because Portal is was
 * created for larger screens and will be hidden when smaller screens
 * @returns after sign in, will re-direct user to portal page
 */
function LoginMasterCreator() {
  const [login, setLogin] = useState(false)

  const { signIn } = useAuth() //sign In function to log in to portal

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  /**
   * After submission, if sign in button was clicked,
   * then await to sign in with the email and password entered by user
   * @param email
   * @param password
   */
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    }
  }

  return (
    <div className="relative flex h-screen flex-col  md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Adult Soccer League</title>
        <link rel="icon" href="/ball.png" />
      </Head>
      <Image
        src={image}
        layout="fill"
        className="-z-10  opacity-60 sm:!inline"
        objectFit="cover"
        priority
      />

      {/* Container will display when screen is smaller than width:1280px */}
      <div className="relative mt-24 space-y-8 bg-black/75 py-10 px-6 text-lg md:mt-0 md:max-w-md md:px-14 md:text-2xl  xl:!hidden">
        <p>
          For better user experience, Portal was created for screens with width
          of 1280 pixels and larger
        </p>
        <p>Authentication for Portal will appear once screen is large enough</p>
      </div>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 !hidden space-y-8 bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14  xl:!block"
      >
        <h1 className="text-4xl">Sign In</h1>

        {/* Container for email and password inputs */}
        <div className="space-y-4">
          {/* For dummy purposes, give a demo email and password to temporarily have access to Portal */}
          <div className="font-light">
            <p>For demo purposes use the following:</p>
            <p className="ml-5">
              Email: <span className="font-bold">demo@gmail.com</span>
            </p>
            <p className="ml-5">
              Password: <span className="font-bold">GoldenTea@1031</span>
            </p>
          </div>

          {/* Email label */}
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="masterCreator--input"
              {...register('email', { required: true })}
            />
            {/* errors will return when field validation fails */}
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>

          {/* Password label */}
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="masterCreator--input"
              {...register('password', { required: true })}
            />
            {/* errors will return when field validation fails */}
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters
              </p>
            )}
          </label>
        </div>

        {/* Button to submitt form and log in */}
        <button
          onClick={() => setLogin(true)}
          className="w-full rounded bg-[#1b5e20] py-3 font-semibold"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginMasterCreator
