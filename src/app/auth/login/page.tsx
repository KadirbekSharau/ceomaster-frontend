// src/app/login/page.tsx
'use client'
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
 return (
   <div className="min-h-screen grid place-items-center bg-gray-50">
     <Card className="w-full max-w-md p-8">
       <div className="text-center space-y-6">
         <h1 className="text-2xl font-bold">Welcome to LifeMaster</h1>
         <Button 
           className="w-full"
           onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
         >
           <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
             {/* Google icon paths */}
           </svg>
           Continue with Google
         </Button>
       </div>
     </Card>
   </div>
 )
}