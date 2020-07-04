const getItem = (key) => {
  let item = window.localStorage.getItem(key)
  try {
    const parsed = JSON.parse(item)
    return parsed
  }catch (e) {
    return item
  }


}

const saveItem = (key, value) => {
  if (typeof value !== 'string') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

const clearAll = () => {
  window.localStorage.clear()
}

export default {
  getItem,
  saveItem,
  removeItem,
  clearAll
}