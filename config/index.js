const apiRoot = '/api/v1/quixy'

const config = {
    apiRoot,
    basePath: (path) =>{
        return apiRoot.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
    }
}

export default config;