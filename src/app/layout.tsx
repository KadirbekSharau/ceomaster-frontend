// src/app/layout.tsx
import { headers } from 'next/headers'
import { Providers } from './providers'
import { Sidebar } from '@/components/shared/Sidebar'
import './globals.css'

export default async function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 // Check if current path is auth page
 const headersList = await headers()
 const pathname = headersList.get('x-invoke-path') || ''
 const isAuthPage = pathname.includes('/auth') || pathname.includes('/login')

 return (
   <html lang="en">
     <body suppressHydrationWarning>
       <Providers>
         <div className="flex h-screen">
           {!isAuthPage && <Sidebar />}
           <main className={`flex-1 ${!isAuthPage ? 'bg-gray-50' : ''}`}>
             {children}
           </main>
         </div>
       </Providers>
     </body>
   </html>
 )
}