document.addEventListener('DOMContentLoaded', () => {
    (() => {
    "use strict"

    class EmailValidator {
        static validate(email) {
            const emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return emailRegExp.test(email)
        }
    }

    class FormValidator {
        constructor(form) {
            this.form = form
        }

        validate() {
            const name = this.form.querySelector('input[name=name]').value
            const email = this.form.querySelector('input[name=email]').value
            const check = this.form.querySelector('input[type=checkbox]').checked
            return name.length > 0 && EmailValidator.validate(email) && check
        }
    }

    class ModalContentUpdater {
        constructor(modal) {
            this.modal = modal;
        }

        updateContent(button) {
            const form = this.modal.querySelector('form')
            this.modal.querySelector('.modal-title')
                .textContent = button.dataset.cardTitle
            form.querySelector('input[name=planTitle]')
                .value = button.dataset.cardTitle
            form.querySelector('input[name=cost]')
                .value = button.dataset.cardCost
            form.querySelector('input[name=oldCost]')
                .value = button.dataset.cardOldCost
            this.modal.querySelector('.cost-list .cost')
                .textContent = `${button.dataset.cardCost} руб.`
            this.modal.querySelector('.cost-list del')
                .textContent = button.dataset.cardOldCost ? `${button.dataset.cardOldCost} руб.` : ''
        }
    }

    class ModalHandler {
        constructor(buttonSelector, modalSelector, modalUpdateActive = false) {
            this.modalOpenBtns = document.querySelectorAll(buttonSelector)
            this.modal = document.querySelector(modalSelector)
            this.modalContentUpdater = new ModalContentUpdater(this.modal)
            this.modalUpdateActive = modalUpdateActive
            this._initEventListeners()
        }

        _initEventListeners() {
            this.modalOpenBtns.forEach(btn => {
                btn.addEventListener('click', (e) => this._handleButtonClick(e, btn))
            });
        }

        _handleButtonClick(event, button) {
            event.preventDefault()

            if (this.modalUpdateActive) {
                this.modalContentUpdater.updateContent(button)
            }

            const form = this.modal.querySelector('form')
            const formValidator = new FormValidator(form)

            const hideModal = () => {
                const modalBox = bootstrap.Modal.getInstance(this.modal);
                modalBox.hide();
            }

            this.modal.querySelectorAll('button.btn-close').forEach(close => {
                close.addEventListener('click', hideModal);
                console.log('close madal')
            })

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (formValidator.validate()) {
                    hideModal();
                    console.log('validate to hide modal')
                }
            })
        }
    }

    new ModalHandler('[data-bs-toggle=modal]', '#formApplication')
    new ModalHandler('[data-bs-toggle=modal]', '#proceedToPaymentModal', true)
    })()
})
