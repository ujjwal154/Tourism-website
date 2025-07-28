let count = 1;
    const countInput = document.getElementById("personcount");

    function increaseCount() {
      count++;
      countInput.value = count;
    }

    function decreaseCount() {
      if (count > 1) {
        count--;
        countInput.value = count;
      }
    }