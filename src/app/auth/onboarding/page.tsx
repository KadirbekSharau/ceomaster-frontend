// src/app/onboarding/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { api } from '@/lib/axios'

export default function OnboardingPage() {
 const router = useRouter()
 const [form, setForm] = useState({
   fullName: '',
   dateOfBirth: '',
   description: ''
 })

 const handleSubmit = async () => {
   try {
     await api.post('/users/onboarding', form)
     router.push('/dashboard')
   } catch (error) {
     console.error(error)
   }
 }

 return (
   <div className="min-h-screen grid place-items-center bg-gray-50">
     <div className="w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow">
       <div>
         <h1 className="text-2xl font-bold">Complete Your Profile</h1>
         <p className="text-gray-500">Tell us more about yourself</p>
       </div>

       <div className="space-y-4">
         <Input
           placeholder="Full Name"
           value={form.fullName}
           onChange={(e) => setForm({...form, fullName: e.target.value})}
         />
         <Input
           type="date"
           value={form.dateOfBirth}
           onChange={(e) => setForm({...form, dateOfBirth: e.target.value})}
         />
         <Textarea
           placeholder="What do you do?"
           value={form.description}
           onChange={(e) => setForm({...form, description: e.target.value})}
         />
         <Button 
           className="w-full" 
           onClick={handleSubmit}
         >
           Complete Profile
         </Button>
       </div>
     </div>
   </div>
 )
}