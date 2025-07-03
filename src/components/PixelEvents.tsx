'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import * as fpixel from '@/lib/fpixel'

// PASTIKAN ADA "EXPORT DEFAULT" DI SINI
export default function PixelEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Fungsi ini akan mengirim event 'PageView' setiap kali URL berubah
    fpixel.event('PageView')
  }, [pathname, searchParams])

  return null
}