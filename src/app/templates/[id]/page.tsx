import EmailTemplateForm from '@/app/_components/email-template-form'
import React from 'react'
import NewTemplatePage from '../new/page';

const EditPage = async ({params}:{params: Promise<{ id: string }>}) => {
    const {id} = await params; 
    console.log(id);
  return (
    <div>
        <NewTemplatePage id={id}/>
    </div>
  )
}

export default EditPage