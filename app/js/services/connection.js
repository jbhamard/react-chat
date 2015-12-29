let NICKNAMES = ['jb']

let connection = {
  register: (pseudo) => {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (NICKNAMES.find((element, index, array) => {
            if (element === pseudo) {
              return true
            }
          })) {
          reject('nickname already taken. Please choose another one.')
        } else {
          NICKNAMES.push(pseudo)
          resolve(pseudo)
        }
      }, 0)
    })
  }
}

export default connection