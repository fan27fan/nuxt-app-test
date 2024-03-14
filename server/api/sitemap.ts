export default defineSitemapEventHandler(async (e) => {
    const posts = await Promise.all([
        {
            _path: '/posts/1',
            modifiedAt: new Date(),
        },
        {
            _path: '/posts/2',
            modifiedAt: new Date(),
        },
    ]);
    return posts.map((p) => {
        return {
            loc: p._path,
            lastmod: p.modifiedAt,
        };
    });
});
