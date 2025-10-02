import { Sidebar } from './Sidebar'

export default function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar?: React.ReactNode
}) {
  return (
    <body>
      {children}

      <Sidebar>{sidebar}</Sidebar>
    </body>
  )
}
