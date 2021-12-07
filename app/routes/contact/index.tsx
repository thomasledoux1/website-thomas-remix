import { Form, Outlet, redirect, useActionData, useTransition } from 'remix';
import type { ActionFunction } from 'remix';
import axios from 'axios';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
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
    throw new Error(e);
  });
  return redirect('/contact/thanks');
};

const Contact = () => {
  let status = useActionData();
  // Show the optimistic UI once submission starts.
  let transition = useTransition();
  return (
    <Form method="post">
      <div className="flex flex-col mb-4">
        <label className="mb-3" htmlFor="email">
          Your e-mail
        </label>
        <input
          className="py-2 px-4 bg-white border-secondary border-4 rounded-lg"
          id="email"
          type="email"
          name="email"
          placeholder="info@example.com"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="my-2" htmlFor="message">
          Your message
        </label>
        <textarea
          className="py-2 px-4 bg-white border-secondary border-4 rounded-lg"
          rows={3}
          id="message"
          name="message"
          placeholder="Hey, I would like to get in touch with you"
          required
        />
      </div>

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
  );
};

export default Contact;
