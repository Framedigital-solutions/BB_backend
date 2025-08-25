"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CartRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.push('/product/cart')
  }, [router])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">Redirecting to cart…</p>
      </div>
    </div>
  )
}
