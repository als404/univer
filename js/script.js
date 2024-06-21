window.addEventListener('DOMContentLoaded', () => {
    (() => {
        "use strict"
        const modalPayment = document.querySelector('#proceedToPaymentModal')

        const validateEmail = (email) => {
            return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        }

        const validateForm = (form) => {
            const name = form.querySelector('input[name=name]').value
            const email = form.querySelector('input[name=email]').value
            const check = form.querySelector('input[type=checkbox]').checked
            let error = false
            error = (name.length > 0 && validateEmail(email) && check) ? true : false
            return error ? true : false
        }

        function updateContentModal(btn) {
            const form = modalPayment.querySelector('form')
        
            modalPayment.querySelector('.modal-title')
                .textContent = btn.dataset.cardTitle
            form.querySelector('input[name=planTitle]')
                .setAttribute("value", btn.dataset.cardTitle)
            form.querySelector('input[name=cost]')
                .setAttribute("value", btn.dataset.cardCost)
            form.querySelector('input[name=oldCost]')
                .setAttribute("value", btn.dataset.cardOldCost)
            modalPayment.querySelector('.cost-list .cost')
                .textContent = btn.dataset.cardCost + ' руб.'
            modalPayment.querySelector('.cost-list del')
                .textContent = btn.dataset.cardOldCost ? btn.dataset.cardOldCost + ' руб.' : ''
        }
        
        const openModal = () => {
            document.querySelectorAll('[data-bs-toggle=modal]').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault()
                    
                    if (modalPayment) {
                        updateContentModal(btn)
                    }

                    const modal = document.querySelector(btn.dataset.bsTarget)
                    const form = modal.querySelector('form')

                    const hideFunc = () => {
                        const modalBox = bootstrap.Modal.getInstance(modal)
                        modalBox.hide()
                    }

                    modal.querySelectorAll('button.btn-close').forEach(close => {
                        close.addEventListener('click', (e) => {
                            hideFunc()
                        })
                    })

                    form.addEventListener('submit', (e) => {
                        e.preventDefault()
                        if (validateForm(form)) {
                            hideFunc()
                        }
                    })
                })
            })
        }

        openModal()

    })()
})
