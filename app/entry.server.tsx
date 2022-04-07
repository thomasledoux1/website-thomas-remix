import {renderToString} from 'react-dom/server'
import {HandleDataRequestFunction, RemixServer} from 'remix'
import type {EntryContext} from 'remix'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  responseHeaders.set('Content-Type', 'text/html')
  responseHeaders.set('Cache-Control', 'public, max-age=0, s-max-age=86400')

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}

export const handleDataRequest: HandleDataRequestFunction = (
  response: Response,
) => {
  response.headers.set('Cache-Control', 'public, max-age=0, s-max-age=3600')
  return response
}
