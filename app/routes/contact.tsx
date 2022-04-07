import {MetaFunction, Outlet, redirect} from 'remix'
import type {ActionFunction} from 'remix'

export const meta: MetaFunction = () => ({
  title: 'Thomas Ledoux | Contact',
  description: 'Find contact information for Thomas Ledoux here',
  'twitter:title': 'Thomas Ledoux | Contact',
  'twitter:description': 'Find contact information for Thomas Ledoux here',
  'og:title': 'Thomas Ledoux | Contact',
  'og:description': 'Find contact information for Thomas Ledoux here',
})

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  await fetch('https://formspree.io/f/xzbgjqdq', {
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  }).catch(e => console.error(e))
  return redirect('/contact/thanks')
}

const Contact = () => (
  <section
    id="contact"
    className="container mx-auto px-4 lg:px-16 text-text pb-8 lg:pb-0"
  >
    <div className="grid md:grid-cols-2 gap-6 content-center align-items">
      <div className="flex flex-col justify-center">
        <img
          alt="Illustration of man sitting on a block"
          src="/contact.svg"
          width={645}
          height={750}
          className="max-h-[250px] lg:max-h-[500px]"
        />
      </div>
      <div className="flex justify-center flex-col">
        <Outlet />
      </div>
    </div>
  </section>
)

export default Contact
