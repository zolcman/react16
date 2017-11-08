let apiUrl = ''
if(process.env.NODE_ENV === 'development') {
    //apiUrl = 'http://192.168.1.214:8100'
    //apiUrl = 'http://94.45.140.34:8100'
    //apiUrl = 'http://192.168.0.232:8100'
	apiUrl = 'http://192.168.1.226:8100'
} else {
    apiUrl = 'http://94.45.140.34:8100'
}

const Urls = {

  vms : '/api/v1/Vms',
  jobs: '/api/v1/Policies'
}


export { apiUrl, Urls}
