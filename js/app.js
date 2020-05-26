const userBudget = prompt('Indica tu presupuesto semanal');
const form = document.querySelector('#agregar-gasto');
let budgetQuantity;

function appStart() {
  if (userBudget === null || userBudget === '' || isNaN(userBudget)) {
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
    ui.addSpendToList(spendName, spendQuantity);
    ui.leftoverBudget(spendQuantity);
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
  addSpendToList(spendName, spendQuantity) {
    const spendsList = document.querySelector('#gastos ul');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
    ${spendName}
    <span class='badge badge-primary badge-pill'>${spendQuantity} €</apan>
    `
    spendsList.appendChild(li);
  }

  leftoverBudget(spendQuantity) {
    const leftover = document.querySelector('span#restante');
    const userBudgetLeftover = budgetQuantity.leftoverBudget(spendQuantity);
    leftover.innerHTML = `${userBudgetLeftover}`
    this.budgetControl();
  }
  budgetControl() {
    const totalBudget = budgetQuantity.budget;
    const leftoverBudget = budgetQuantity.leftover;

    // si el presupuesto total es menor del 25% de lo que te queda
    if ((totalBudget) / 4 > leftoverBudget) {
      const leftover = document.querySelector('.restante');
      leftover.classList.remove('alert-success', 'alert-warning');
      leftover.classList.add('alert-danger');
    } else if ((totalBudget) / 2 > leftoverBudget) {
      const leftover = document.querySelector('.restante');
      leftover.classList.remove('alert-success');
      leftover.classList.add('alert-warning');
    }
  }
}



document.addEventListener('DOMContentLoaded', appStart);
form.addEventListener('submit', addSpend);
