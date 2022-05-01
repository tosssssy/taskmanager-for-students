import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <SWRConfig>
          <Component {...pageProps} />
        </SWRConfig>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
