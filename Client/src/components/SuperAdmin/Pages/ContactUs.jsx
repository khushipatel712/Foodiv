import React from 'react'
import Customer from '../Customer'
import Address from '../Address'
import Contact from '../Contact'
import ContactTitle from '../ContactTitle'

export default function ContactUs() {
  return (
    <div>
    <ContactTitle/>
    <Contact/>
        <Customer/>
        <Address/>

    </div>
  )
}
