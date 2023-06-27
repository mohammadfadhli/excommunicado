import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { AuthProvider } from './firebase/auth.jsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Excommunicado',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><AuthProvider><NavBar></NavBar><div className="min-h-screen">{children}</div><Footer></Footer></AuthProvider></body>
    </html>
  )
}
