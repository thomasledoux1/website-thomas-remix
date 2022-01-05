import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MetaFunction, useLoaderData } from 'remix';
import { v4 as uuidv4 } from 'uuid';

type BlogData = {
  blogs: {
    id: string;
    url: string;
    title: string;
    page_views_count: number;
    description: string;
    tag_list: string[];
  }[];
};

export let meta: MetaFunction = () => {
  return {
    title: 'Thomas Ledoux | Blog',
    description: 'Blogs written by Thomas Ledoux on Dev.to',
  };
};

export async function loader() {
  const res = await fetch('https://dev.to/api/articles/me/published', {
    // @ts-ignore
    headers: {
      'api-key': process.env.DEV_KEY,
    },
  });
  const blogs = await res.json();
  return {
    blogs,
  };
}

const Blog = () => {
  let { blogs } = useLoaderData<BlogData>();
  const blogsToShow = blogs
    .sort((a, b) => b.page_views_count - a.page_views_count)
    .slice(0, 5);
  return (
    <section id="blog" className="text-text">
      <div className="container mx-auto min-h-screen-without-nav flex flex-col items-center justify-center pt-12">
        <h2 className="text-center text-2xl font-bold mb-6">
          Personal blog - most read
        </h2>
        <div className="flex flex-col gap-6">
          {blogsToShow &&
            blogsToShow.map((blog, i) => {
              return (
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
                          <h3 className="text-xl font-medium dark:text-white pr-4">
                            {blog.title}
                          </h3>
                          <div className="flex flex-col md:flex-row items-center">
                            <FontAwesomeIcon className="md:mr-2" icon={faEye} />
                            <span>{blog.page_views_count}</span>
                          </div>
                        </div>
                      </div>
                      <p className="mb-3">{blog.description}</p>
                      <ul className="flex flex-wrap">
                        {blog.tag_list.map((tag, i) => {
                          const key = uuidv4();
                          return (
                            <li
                              className={`text-sm my-1 py-1 px-4 mr-2 rounded-md ${tag}`}
                              key={key}
                            >
                              {tag}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  </article>
                </a>
              );
            })}
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
  );
};

export default Blog;

export function headers() {
  return {
    'Cache-Control': 'max-age=0, s-max-age=86400, stale-while-revalidate=86400',
  };
}
