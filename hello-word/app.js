import { listenAndServe } from 'https://deno.land/std@0.111.0/http/server.ts'

function handleRequest(request) {
    const { pathname } = new URL(request.url)

    // Respond with HTML
    if (pathname.startsWith('/html')) {
        const html = `<html>
      <p>First deno demo</p>
      </html>`

        return new Response(html, {
            headers: {
                'content-type': 'text/html; charset=UTF-8'
            }
        })
    }

    // Respond with JSON
    if (pathname.startsWith('/json')) {
        // Use stringify function to convert javascript object to JSON string.
        const json = JSON.stringify({
            message: 'First deno demo'
        })

        return new Response(json, {
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        })
    }

    return new Response(
        `<body
      align="center"
      style="font-family: Avenir, Helvetica, Arial, sans-serif; font-size: 1.5rem;"
    >
      <h1>Return JSON and/or HTML Example</h1>
      <p>
        <a href="/html">/html</a> - responds with HTML to the request.
      </p>
      <p>
        <a href="/json">/json</a> - responds with JSON to the request.
      </p>
    </body>`,
        {
            headers: {
                'content-type': 'text/html; charset=UTF-8'
            }
        }
    )
}

console.log('Listening on http://localhost:8080')
await listenAndServe(':8080', handleRequest)
