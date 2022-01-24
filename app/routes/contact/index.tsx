import {Form, redirect, useActionData} from 'remix'
import type {ActionFunction} from 'remix'
import axios from 'axios'

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  await axios({
    url: 'https://formspree.io/f/xzbgjqdq',
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
    data: {
      email: formData.get('email'),
      message: formData.get('message'),
    },
  }).catch(e => {
    throw new Error(e)
  })
  return redirect('/contact/thanks')
}

const Contact = () => {
  const status = useActionData()
  // Show the optimistic UI once submission starts.
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Drop me a message</h2>
      <Form method="post">
        <label className="flex flex-col gap-2 mb-4" htmlFor="email">
          Your e-mail
          <input
            className="py-2 px-4 bg-white border-secondary border-4 rounded-lg"
            id="email"
            type="email"
            name="email"
            placeholder="info@example.com"
            required
          />
        </label>
        <label className="flex flex-col gap-2" htmlFor="message">
          Your message
          <textarea
            className="py-2 px-4 bg-white border-secondary border-4 rounded-lg"
            rows={3}
            id="message"
            name="message"
            placeholder="Hey, I would like to get in touch with you"
            required
          />
        </label>

        <button
          className="px-8 mt-4 py-4 bg-primary text-white rounded-lg"
          type="submit"
        >
          Submit
        </button>
        {status === 'error' && (
          <p className="error">Ooops! There was an error. Try again later.</p>
        )}
      </Form>
    </>
  )
}

export default Contact
