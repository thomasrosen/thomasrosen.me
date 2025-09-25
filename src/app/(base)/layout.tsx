import { ThemeProvider } from '@/components/theme-provider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body>
      <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
        {children}
      </ThemeProvider>
    </body>
  )
}
