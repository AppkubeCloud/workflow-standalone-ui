import './globals.css';
import { Spin } from 'antd';
import { roboto } from '@/font/font'
import { Providers } from '@/Context/provider'
import { store } from '@/Context/store';

export const metadata = {
  title: 'Workflow',
  description: 'Manage your project with Ease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
