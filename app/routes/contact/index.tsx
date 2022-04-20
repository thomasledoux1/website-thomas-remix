import {useActionData} from 'remix'

const Contact = () => {
  const status = useActionData()
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Drop me a message</h2>
      <form method="post">
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
          className="px-4 mt-4 py-4 bg-primary text-white rounded-lg lg:hover:scale-[1.04] transition-transform"
          type="submit"
        >
          Submit
        </button>
        {status === 'error' && (
          <p className="error">Ooops! There was an error. Try again later.</p>
        )}
      </form>
    </>
  )
}

export default Contact
