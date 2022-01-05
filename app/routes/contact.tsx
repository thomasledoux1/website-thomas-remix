import { MetaFunction, Outlet, redirect } from 'remix';
import type { ActionFunction } from 'remix';
import axios from 'axios';
import { OptimizedImage } from '~/components/OptimizedImage';

export let meta: MetaFunction = () => {
  return {
    title: 'Thomas Ledoux | Blog',
    description: 'Find contact information for Thomas Ledoux here',
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  await axios({
    url: 'https://formspree.io/f/xzbgjqdq',
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
    data: formData,
  }).catch(e => {
    return 'error';
  });
  return redirect('/contact/thanks');
};

const Contact = () => {
  return (
    <section id="contact" className="text-text">
      <div className="container grid md:grid-cols-2 gap-6 min-h-screen-without-nav content-center align-items">
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
          <h2 className="mb-6 text-2xl font-bold">Drop me a message</h2>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Contact;
