import { menuArray } from './data.js'
//console.log(menuArray)
let orderItemsArray = []
let isPaid = false
const paymentModal = document.getElementById('payment-modal')
const productImage = document.getElementById('product-image')

document.getElementById('payment-modal-inner').addEventListener('submit', function (e) {
    e.preventDefault()
    closePaymentModal()
    confirmPayment(orderItemsArray)
})

document.getElementById('close-modal-btn').addEventListener('click', closePaymentModal)

// Event listener for add button
document.addEventListener('click', function (e) {
    // console.log(e.target.dataset.menuItem)
    // console.log(e)

    // Conditional execution if button is clicked
    if (e.target.dataset.menuItem) {
        // Call function to handle add item, passing the argument id 
        handleAddClick(e.target.dataset.menuItem)
    }
    else if (e.target.dataset.removeButton) {
        handleRemoveClick(e.target.dataset.removeButton)
    }
    else if (e.target.dataset.completeOrder) {
        renderPaymentModal()
    }
})


function render() {
    const menuItemList = document.getElementById('menu-item-list')

    // Render as HTML to the page
    menuItemList.innerHTML = getMenuHtml()
}

render()

function getMenuHtml() {
    let menuHtml = ''

    // Iterate over menuArray to get each item in the menu
    menuArray.forEach(function (item) {
        menuHtml += `
            <div class='menu-item' id='menu-item'>
                <img src='${item.itemPic}' class='menu-item-pic' data-menu-item="${item.id}">
                <div class='menu-item-description'>
                    <h3>${item.name}</h3>
                    <h4 class='item-ingredients'>${item.ingredients}</h4>
                    <h4>&#36;${item.price}</h4>
                </div>
                <div class='add-button' id='add-button'>
                    <i class="fa-regular fa-plus" data-menu-item="${item.id}"></i>
                </div>
            </div>
            `
    })
    return menuHtml
}
// console.log(getMenuHtml())

function handleAddClick(itemId) {
    //console.log(itemId)

    // Filters out from menuArray the item with itemId
    const targetMenuItem = menuArray.filter(function (item) {
        return item.id === itemId
    })[0]

    orderItemsArray.push(targetMenuItem)

    //console.log(orderItemArray)
    renderOrderList(orderItemsArray)
}

function handleRemoveClick(itemId) {
    // Filter orderItemsArray to return item != itemId
    // Save it as orderItemsArray
    console.log(itemId)
    orderItemsArray = orderItemsArray.filter(function (item) {
        return item.id !== itemId
    })

    renderOrderList(orderItemsArray)
}

function renderOrderList(orderItemsArray) {
    //console.log(orderItems)
    const orderItemList = document.getElementById('order-item-list')
    orderItemList.innerHTML = `` // Clears the DOM before rendering again
    let orderHtml = ''
    let totalPrice = 0


    //console.log(orderItemsArray)
    orderItemsArray.forEach(function (orderItem) {

        orderHtml += `
            <div class='order-items' id='order-items'>
                <ul>${orderItem.name}<button class='remove-button' id='remove-button' data-remove-button="${orderItem.id}">X</button><span style="float:right">&#36;${orderItem.price}</span></ul>
            </div>
            `
        totalPrice += orderItem.price
    })

    if (orderHtml && !isPaid) {
        orderItemList.innerHTML += `
            <h4>Your Order</h4>
            ${orderHtml}
            <div class='order-price' id='order-price'>
                <ul class='total-price'>Total Price<span style="float:right">&#36;${totalPrice}</span></ul>
            </div>
            <button class='complete-order' data-complete-order="${totalPrice}" id='complete-order'>Complete Order</button>
            `
    }
    else if (orderHtml && isPaid) {
        orderHtml = ''
        totalPrice = 0
        orderItemsArray.forEach(function (orderItem) {

            orderHtml += `
            <div class='order-items' id='order-items'>
                <ul>${orderItem.name}<span style="float:right">&#36;${orderItem.price}</span></ul>
            </div>
            `
            totalPrice += orderItem.price
        })
        orderItemList.innerHTML += `
            <h4>Your Order</h4>
            ${orderHtml}
            <div class='order-price' id='order-price'>
                <ul class='total-price'>Total Price<span style="float:right">&#36;${totalPrice}</span></ul>
            </div>
            <div class='confirmed-order'>
                <div class='confirmation-message'>Thank you, your order is on its way!</div>
            </div>
            `
    }
}

function renderPaymentModal() {
    //console.log('clicked')
    paymentModal.style.display = "flex"
}

function closePaymentModal() {
    paymentModal.style.display = 'none'
}

function confirmPayment(orderItemsArray) {
    const orderItemList = document.getElementById('order-item-list')
    orderItemList.innerHTML = `` // Clears the DOM before rendering again
    let orderHtml = ''
    let totalPrice = 0

    //console.log(orderItemsArray)
    orderItemsArray.forEach(function (orderItem) {
        orderHtml += `
            <div class='order-items' id='order-items'>
                <ul>${orderItem.name}<span style="float:right">&#36;${orderItem.price}</span></ul>
            </div>
            `
        totalPrice += orderItem.price
    })

    orderItemList.innerHTML += `
        <h4>Your Order</h4>
        ${orderHtml}
        <div class='order-price' id='order-price'>
            <ul class='total-price'>Total Price<span style="float:right">&#36;${totalPrice}</span></ul>
        </div>
        <div class='confirmed-order'>
            <div class='awaiting-confirmation'>
                <p>Processing your order</p>
                <img src="images/loading.svg" class="loading">
            </div>
        </div>
        `

    isPaid = true
    setTimeout(function () {
        renderOrderList(orderItemsArray) // Argument orderItemsArray required to be passed 
    }, 3000)
}

