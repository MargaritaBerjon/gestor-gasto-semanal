const userBudget = prompt('Indica tu presupuesto semanal');
const form = document.querySelector('#agregar-gasto');
let budgetQuantity;

function appStart() {
  if (userBudget === null || userBudget === '') {
    window.location.reload()
  } else {
    budgetQuantity = new Budget(userBudget);
    const ui = new Interface();
    ui.insertBudget(budgetQuantity.budget);
  }

}


function addSpend(ev) {
  ev.preventDefault();
  const spendName = document.querySelector('#gasto').value;
  const spendQuantity = document.querySelector('#cantidad').value;

  const ui = new Interface();
  if (spendName === '' || spendQuantity === '') {
    //ui.printMessage('Mensaje', 'Tipo')
    ui.printMessage('Rellena todos los campos', 'error')

  } else {
    ui.printMessage('Gasto añadido', 'correcto')

  }
}


class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.leftover = Number(budget);
  }
  leftoverBudget(quantity = 0) {
    return this.leftover -= Number(quantity);
  }
}

class Interface {
  insertBudget(quantity) {
    const spanBudget = document.querySelector('span#total');
    const spanLeftover = document.querySelector('span#restante');

    spanBudget.innerHTML = `${quantity}`
    spanLeftover.innerHTML = `${quantity}`
  }
  printMessage(message, type) {
    const divMessage = document.createElement('div');
    divMessage.classList.add('text-center', 'alert');
    if (type === 'error') {
      divMessage.classList.add('alert-danger');
    } else {
      divMessage.classList.add('alert-success');
    }
    divMessage.appendChild(document.createTextNode(message));
    //inserBefore(elemento que quieres insertar, indica delante de qué elemento quieres insertarlo)
    document.querySelector('.primario').insertBefore(divMessage, form);
    setTimeout(function () {
      document.querySelector('.primario .alert').remove();
      form.reset();
    }, 3000)
  }


}



document.addEventListener('DOMContentLoaded', appStart);
form.addEventListener('submit', addSpend);
