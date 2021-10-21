import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

const router = new Router()

// const contentType = 'application/json; charset=UTF-8'
router
    .get('/index', context => {
        context.response.body = `This is a Blog!  ${moment().format('YYYY-MM-DD')}`
    })
    .get('/api/:id', context => {
        const { pathname } = new URL(request.url)
        if (pathname.startsWith('/api')) {
            const data = JSON.parse(Deno.readTextFileSync('./static/data.json'))
            const id = context.params.id
            console.log(`url params id => ${id}`)

            if (context.params && context.params.id && data[id]) {
                if (data[id].expiryDate) {
                    return new Response(data[id], {
                        headers: {
                            'content-type': contentType
                        }
                    })
                } else {
                    return new Response(
                        { code: 0, data: {}, msg: '暂无数据' },
                        {
                            headers: {
                                'content-type': contentType
                            }
                        }
                    )
                }
            }
        } else {
            context.response.body = '404'
        }
    })

const app = new Application()
// error handler
app.use(async (context, next) => {
    try {
        await next()
    } catch (err) {
        console.log(err)
    }
})

app.use(router.routes())
app.use(router.allowedMethods())
// static content
app.use(async (context, next) => {
    try {
        await send(context, context.request.url.pathname, {
            root: `${Deno.cwd()}/static`,
            index: 'index.html'
        })
    } catch {
        next()
    }
})

const port = 9000
console.log(`> Listening on http://localhost:${port}`)
await app.listen({ port: port })
console.log('REEEEEE')
