let apiUrl = ''
if(process.env.NODE_ENV === 'development') {
    //apiUrl = 'http://192.168.1.214:8100'
    apiUrl = 'http://localhost:8100'
} else {
    apiUrl = 'http://192.168.1.214:8100'
}

const Urls = {

  vms : '/api/v1/Vms',
  jobs: '/api/v1/Policies'
}


export { apiUrl, Urls}
