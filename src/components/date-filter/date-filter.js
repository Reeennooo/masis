document.addEventListener('DOMContentLoaded', () => {
  let dateFilter = document.querySelector(".date-filter")
  if(dateFilter) {
    let currentValue = dateFilter.querySelector('span')
    let items = document.querySelectorAll('.date-filter__item')

    dateFilter.addEventListener('click', (event) => {
      dateFilter.classList.toggle('is-active')
    })
    document.addEventListener('click', (event) => {
      if(!event.target.closest('.date-filter')) {
        dateFilter.classList.remove('is-active')
      }
    })

    items.forEach((item) => {
      item.addEventListener('click', () => {
        dateFilter.dataset.value = item.dataset.itemValue
        if(item.dataset.itemValue === 'old') {
          dateFilter.classList.remove('date-filter--new')
          currentValue.innerHTML = item.innerHTML
        } else {
          dateFilter.classList.add('date-filter--new')
          currentValue.innerHTML = item.innerHTML
        }
      })
    })
  }
  
})