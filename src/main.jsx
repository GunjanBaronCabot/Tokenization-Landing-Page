import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ThankYouPage from './components/ThankYouPage.jsx'
import { BROCHURE_URL } from './constants.js'
import './index.css'

const THANK_YOU_ACCESS_KEY = 'bc_thank_you_access'

const THANK_YOU_ROUTES = {
  consultation: {
    heading: 'Thank you for your interest',
    message: (
      <>
        <p>
          One of our Sales Consultants will be in touch with you shortly.
          <br />
          Please note that the call will come from a UK number beginning with +44.
        </p>
        <p className="mt-10">
          In the meantime, if you have any questions or would like to learn more
          <br className="hidden sm:block" /> about Baron &amp; Cabot
        </p>
      </>
    ),
    buttonLabel: 'Visit our website',
    buttonHref: 'https://baroncabot.com/',
  },
  brochure: {
    heading: 'Thank you for your interest!',
    message: <p>Your free UK Property Investment Brochure is ready.</p>,
    buttonLabel: 'Download Your Brochure Now',
    buttonHref: BROCHURE_URL,
  },
}

const thankYouKey = new URLSearchParams(window.location.search).get('thank_you')
const matchedRoute = thankYouKey && THANK_YOU_ROUTES[thankYouKey] ? thankYouKey : null

let page = <App />

if (matchedRoute) {
  const cameFromForm = sessionStorage.getItem(THANK_YOU_ACCESS_KEY) === matchedRoute
  if (cameFromForm) {
    page = <ThankYouPage {...THANK_YOU_ROUTES[matchedRoute]} />
  } else {
    // Not reached via a real form submission - bounce back to the homepage instead of
    // rendering a "success" page nobody actually converted on.
    window.location.replace(import.meta.env.BASE_URL)
    page = null
  }
}

if (page) {
  ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>{page}</React.StrictMode>)
}
