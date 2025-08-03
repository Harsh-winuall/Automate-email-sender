
import { redirect } from 'next/navigation';
import React from 'react'
import LandingPage from './_components/landing-page';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  // console.log(session)

  if(session?.user){
    redirect('/dashboard');
  }
  
  return (
    <div>
      <LandingPage/>
    </div>
  )
}

export default HomePage