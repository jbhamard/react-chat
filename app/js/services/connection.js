let connection = {
  register: (nickName) => {
    return new Promise((resolve, reject) => {
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', '/api/users/register');
      xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xmlhttp.send(JSON.stringify({
        nickName: nickName
      }));

      xmlhttp.onload = function() {
        let res = JSON.parse(this.response)
        console.log(res)
        if (this.status === 200) {
          resolve(res.user)
        } else {
          reject(res.error)
        }
      }

      xmlhttp.onerror = function(e) {
        reject('network error')
      }
    })
  }
}

export default connection