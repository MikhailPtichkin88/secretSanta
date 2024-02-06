export const alertMessage = ({
  type,
  message,
}: {
  type: 'success' | 'error'
  message: string
}) => {
  const notification = document.createElement('div')
  const icon = document.createElement('span')
  const text = document.createElement('span')

  notification.style.position = 'fixed'
  notification.style.bottom = '20px'
  notification.style.right = '20px'
  notification.style.borderRadius = '10px'
  notification.style.background = '#fff'
  notification.style.padding = '10px 20px'
  notification.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.1)'
  notification.style.display = 'flex'
  notification.style.gap = '20px'
  notification.style.alignItems = 'center'
  notification.style.fontFamily = 'gotham, sans-serif'

  icon.style.fontSize = '24px'
  text.textContent = message

  if (type === 'success') {
    icon.textContent = '✅'
    icon.style.color = 'green'
  } else if (type === 'error') {
    icon.textContent = '❌'
    icon.style.color = 'red'
  }

  notification.appendChild(icon)
  notification.appendChild(text)
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 5000)
}
