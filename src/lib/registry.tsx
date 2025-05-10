'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import {
  ServerStyleSheet,
  StyleSheetManager,
} from 'styled-components'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // criar o sheet só uma vez
  const [sheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const elements = sheet.getStyleElement()
    sheet.instance.clearTag()
    return <>{elements}</>
  })

  // durante a hidratação no client, não é necessário registrar novamente
  if (typeof window !== 'undefined') {
    return <>{children}</>
  }

  return (
    <StyleSheetManager sheet={sheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
