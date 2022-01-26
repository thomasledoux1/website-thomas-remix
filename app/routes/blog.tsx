import {MetaFunction, useLoaderData} from 'remix'
import {v4 as uuidv4} from 'uuid'

type BlogData = {
  blogs: {
    id: string
    url: string
    title: string
    page_views_count: number
    description: string
    tag_list: string[]
  }[]
}

export const meta: MetaFunction = () => ({
  title: 'Thomas Ledoux | Blog',
  description: 'Blogs written by Thomas Ledoux on Dev.to',
  'twitter:card': 'https://thomasledoux.be/me.jpeg',
  'twitter:title': 'Thomas Ledoux | Blog',
  'twitter:description': 'Blogs written by Thomas Ledoux on Dev.to',
  'og:image': 'https://thomasledoux.be/me.jpeg',
  'og:title': 'Thomas Ledoux | Blog',
  'og:description': 'Blogs written by Thomas Ledoux on Dev.to',
})

export async function loader() {
  const res = await fetch('https://dev.to/api/articles/me/published', {
    // @ts-ignore
    headers: {
      'api-key': process.env.DEV_KEY,
    },
  })
  const blogs = await res.json()
  return {
    blogs,
  }
}

const Blog = () => {
  const {blogs} = useLoaderData<BlogData>()
  const blogsToShow = blogs
    ?.sort((a, b) => b.page_views_count - a.page_views_count)
    .slice(0, 5)
  return (
    <section id="blog" className="text-text my-8">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-bold mb-6">
          Personal blog - most read
        </h2>
        <div className="flex flex-col gap-6">
          {blogsToShow?.map(blog => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              key={blog.id}
              href={blog.url}
              aria-label={blog.title}
              className="transform border-4 border-purple rounded-xl transition-transform p-6 hover:scale-[1.02]"
            >
              <article className="relative rounded-lg text-textsm:mx-0">
                <>
                  <div className="flex justify-between">
                    <div className="flex justify-between mb-3 items-start w-full">
                      <h3 className="text-xl font-medium  dark:text-white pr-4">
                        {blog.title}
                      </h3>
                      <div className="flex flex-col md:flex-row items-center text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 md:mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span>{blog.page_views_count}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-3">{blog.description}</p>
                  <ul className="flex flex-wrap">
                    {blog.tag_list.map(tag => {
                      const key = uuidv4()
                      return (
                        <li
                          className={`text-sm my-1 py-1 px-4 mr-2 rounded-md ${tag}`}
                          key={key}
                        >
                          {tag}
                        </li>
                      )
                    })}
                  </ul>
                </>
              </article>
            </a>
          ))}
        </div>
        <a
          href="https://dev.to/thomasledoux1"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 mt-4 py-4 bg-primary text-white rounded-lg"
        >
          Read more blogs
        </a>
      </div>
    </section>
  )
}

export default Blog

export function headers() {
  return {
    'Cache-Control': 'public, max-age=0, s-max-age=86400',
  }
}
