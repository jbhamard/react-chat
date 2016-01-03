// let NICKNAMES = ['jb']

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
          resolve(res)
        } else {
          reject(res.error)
        }
      }

      xmlhttp.onerror = function(e) {
        reject('network error')
      }

      // window.setTimeout(() => {
      //   if (NICKNAMES.find((element, index, array) => {
      //       if (element === pseudo) {
      //         return true
      //       }
      //     })) {
      //     reject('nickname already taken. Please choose another one.')
      //   } else {
      //     NICKNAMES.push(pseudo)
      //     resolve(pseudo)
      //   }
      // }, 0)
    })
  }
}

export default connection