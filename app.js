document.addEventListener('DOMContentLoaded', () => {
    let iconcart = document.getElementById('cartIcon');
    let cartContainer = document.getElementById('openContainer');
    let closeBtn = document.getElementById('closeBtn');
    let listproduct = document.querySelector('.food');
    let listcarthtml = document.querySelector('.listcart');
    let totalQuantityDisplay = document.getElementById('totalQuantityDisplay');
    let totalAmountDisplay = document.getElementById('totalAmountDisplay');
    let searchInput = document.getElementById('searchInput');
    let searchIcon = document.getElementById('searchIcon');
    let breakfastSection = document.getElementById('breakfastSection');
    let lunchSection = document.getElementById('lunchSection');
    let snacksSection = document.getElementById('snacksSection');
    let dinnerSection = document.getElementById('dinnerSection');
    let food = [];
    let cart = [];

    searchIcon.addEventListener('click', () => {
        searchInput.focus();
        let searchTerm = searchInput.value.toLowerCase();
        let filteredItems = food.filter(item => item.name.toLowerCase().includes(searchTerm));
        addtohtml(filteredItems);
    });

    iconcart.addEventListener('click', () => {
        cartContainer.classList.toggle('showcart');
    });

    closeBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('showcart');
    });

    const addtohtml = (items) => {
        breakfastSection.innerHTML = '';
        lunchSection.innerHTML = '';
        snacksSection.innerHTML = '';
        dinnerSection.innerHTML = '';

        if (items.length > 0) {
            items.forEach(product => {
                let newproduct = document.createElement('div');
                newproduct.classList.add('items');
                newproduct.dataset.id = product.id;
                newproduct.innerHTML = `
                    <img src="${product.image}" alt="">
                    <h2>${product.name}</h2>
                    <div class="price">₹${product.price}</div>
                    <button class="addcart">
                        ADD TO CART
                    </button>`;

                if (product.category === 'breakfast') {
                    breakfastSection.appendChild(newproduct);
                } else if (product.category === 'lunch') {
                    lunchSection.appendChild(newproduct);
                } else if (product.category === 'snacks') {
                    snacksSection.appendChild(newproduct);
                } else if (product.category === 'dinner') {
                    dinnerSection.appendChild(newproduct);
                }
            });
        }
    };

    const addtocart = (product_id) => {
        let positionThisproductincart = cart.findIndex((value) => value.product_id == product_id);
        if (positionThisproductincart < 0) {
            cart.push({
                product_id: product_id,
                quantity: 1
            });
        } else {
            cart[positionThisproductincart].quantity = cart[positionThisproductincart].quantity + 1;
        }
        addcarttohtml();
        addcarttomemory();
        updateTotalQuantityDisplay();
    };

    const addcarttohtml = () => {
        listcarthtml.innerHTML = '';
        let totalquantity = 0;
        if (cart.length > 0) {
            cart.forEach(item => {
                totalquantity = totalquantity + item.quantity;
                let newcart = document.createElement('div');
                newcart.classList.add('items');
                newcart.dataset.id = item.product_id;
                let positionproduct = food.findIndex((value) => value.id == item.product_id);
                let info = food[positionproduct];
                newcart.innerHTML = `
                    <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">${info.name}</div>
                    <div class="totalprice">₹${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus">+</span>
                    </div>`;
                listcarthtml.appendChild(newcart);
            });
        }

        let cartIcon = document.getElementById('cartIcon');
        let cartIconspan = cartIcon.querySelector('span');

        if (cartIconspan) {
            cartIconspan.textContent = totalquantity;
        }

        calculateTotalAmount();
    };

    const addcarttomemory = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const changeQuantity = (product_id, type) => {
        let positionThisproductincart = cart.findIndex((value) => value.product_id == product_id);

        if (type === 'plus') {
            cart[positionThisproductincart].quantity = cart[positionThisproductincart].quantity + 1;
        } else if (type === 'minus') {
            if (cart[positionThisproductincart].quantity > 1) {
                cart[positionThisproductincart].quantity = cart[positionThisproductincart].quantity - 1;
            } else {
                cart.splice(positionThisproductincart, 1);
            }
        }

        addcarttohtml();
        addcarttomemory();
        updateTotalQuantityDisplay();
    };

    breakfastSection.addEventListener('click', (event) => {
        let positionclick = event.target;
        if (positionclick.classList.contains('addcart')) {
            let product_id = positionclick.parentElement.dataset.id;
            addtocart(product_id);
        }
    });

    lunchSection.addEventListener('click', (event) => {
        let positionclick = event.target;
        if (positionclick.classList.contains('addcart')) {
            let product_id = positionclick.parentElement.dataset.id;
            addtocart(product_id);
        }
    });

    snacksSection.addEventListener('click', (event) => {
        let positionclick = event.target;
        if (positionclick.classList.contains('addcart')) {
            let product_id = positionclick.parentElement.dataset.id;
            addtocart(product_id);
        }
    });

    dinnerSection.addEventListener('click', (event) => {
        let positionclick = event.target;
        if (positionclick.classList.contains('addcart')) {
            let product_id = positionclick.parentElement.dataset.id;
            addtocart(product_id);
        }
    });

    listcarthtml.addEventListener('click', (event) => {
        let positionclick = event.target;
        if (positionclick.classList.contains('minus') || positionclick.classList.contains('plus')) {
            let product_id = positionclick.parentElement.parentElement.dataset.id;
            let type = positionclick.classList.contains('plus') ? 'plus' : 'minus';
            changeQuantity(product_id, type);
        }
    });

    const calculateTotalAmount = () => {
        let totalAmount = 0;
        if (cart.length > 0) {
            cart.forEach(item => {
                let positionproduct = food.findIndex((value) => value.id == item.product_id);
                let info = food[positionproduct];
                totalAmount += info.price * item.quantity;
            });
        }

        if (totalAmountDisplay) {
            totalAmountDisplay.textContent = `Total Amount: ₹${totalAmount}`;
        }
    };

    const updateTotalQuantityDisplay = () => {
        let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

        if (totalQuantityDisplay) {
            totalQuantityDisplay.textContent = `Total Quantity: ${totalQuantity}`;
        }
    };

    const initapp = () => {
        fetch('product.json')
            .then(response => response.json())
            .then(data => {
                food = data;
                addtohtml(food);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addcarttohtml();
            updateTotalQuantityDisplay();
        }
    };

    // Add event listener for checkout button
    let checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            calculateTotalAmount();
            alert(`Total Amount: ₹${totalAmount}. Proceed to checkout.`);
        });
    }

    initapp();
});
