import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="OnboardPlan" />
        <meta property="og:description" content="Get a structured onboarding plan by role - what the new hire should learn, do, and own by day 30, 60, and 90." />
        <meta property="og:url" content="https://onboardplan.lxsaihub.com/" />
        <meta property="og:image" content="https://onboardplan.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OnboardPlan" />
        <meta name="twitter:description" content="Get a structured onboarding plan by role - what the new hire should learn, do, and own by day 30, 60, and 90." />
        <meta name="twitter:image" content="https://onboardplan.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"OnboardPlan","url":"https://onboardplan.lxsaihub.com/","description":"Get a structured onboarding plan by role - what the new hire should learn, do, and own by day 30, 60, and 90.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
