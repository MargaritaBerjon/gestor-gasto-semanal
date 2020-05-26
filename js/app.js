const userBudget = prompt('Indica tu presupuesto semanal');
let budgetQuantity;

function appStart() {
  if (userBudget === null || userBudget === '') {
    window.location.reload()
  } else {
    budgetQuantity = new Budget(userBudget);
    console.log(budgetQuantity);
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



document.addEventListener('DOMContentLoaded', appStart);

