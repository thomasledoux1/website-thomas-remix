import {v4 as uuidv4} from 'uuid'

type CaseProps = {
  url: string
  logoWidth?: number
  logoAlt?: string
  img?: string
  tags: string[]
  children: JSX.Element | JSX.Element[]
}

export default function Case({
  url,
  logoWidth,
  logoAlt,
  img,
  tags,
  children,
}: CaseProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col h-full p-6 border-4 border-purple rounded-xl lg:hover:scale-[1.04] transition-transform"
      href={url}
    >
      <div className="h-24 max-h-24 text-center mb-6 flex items-center justify-center">
        {img ? (
          <img
            width={logoWidth}
            height={100}
            alt={`Logo ${logoAlt}`}
            src={img}
            className="inline-block max-w-full lg:max-w-xs"
          />
        ) : (
          <span className="text-3xl lg:text-4xl">{logoAlt}</span>
        )}
      </div>
      {children}
      <div className="flex flex-col mt-4 flex-grow justify-end">
        <ul className="flex flex-wrap">
          {tags.map(tag => {
            const key = uuidv4()
            return (
              <li
                className="bg-primary text-white text-sm my-1 py-1 px-4 mr-2 rounded-md"
                key={key}
              >
                {tag}
              </li>
            )
          })}
        </ul>
      </div>
    </a>
  )
}
