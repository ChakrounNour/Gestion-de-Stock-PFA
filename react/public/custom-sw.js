console.log("service Worker Loaded....")
self.addEventListener('push', event => {
  const data = event.data.json()
    //let user = JSON.parse(localStorage.getItem('user'));

    console.log('New notification', data)
    const options = {
      body: data.body,
      //'Authorization': 'Bearer ' + user.token

    }
    event.waitUntil(
      self.registration.showNotification(data.title, options),
    );
  })