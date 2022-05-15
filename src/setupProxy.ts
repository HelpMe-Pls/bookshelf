//@ts-nocheck
export function proxy(app) {
    app.get(/^\/$/, (_req, res) => res.redirect('/discover'))

    // https://twitter.com/kentcdodds/status/1299182472412958722
    // if you can figure out how we can avoid this that'd be great
    // it's only necessary for the "test:e2e" script
    app.head(/^\/list$/, (_req, res) => res.status(200).end())
}




