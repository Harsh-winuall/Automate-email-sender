'use client'
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import LandingPage from './_components/landing-page';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if(isLoggedIn) {
    redirect('/dashboard');
  }
  return (
    <div>
      <LandingPage/>
    </div>
  )
}

export default HomePage