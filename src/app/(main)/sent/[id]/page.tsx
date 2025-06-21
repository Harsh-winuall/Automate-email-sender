import MailDetail from '@/app/_components/single-mail';
import React from 'react'

const SingleMail = async ({params}:{params: Promise<{ id: string }>}) => {
    const {id} = await params;
  return (
    <MailDetail id={id} />
  )
}

export default SingleMail